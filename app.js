import 'dotenv/config';
import express from 'express';
import { InteractionResponseType, InteractionType, verifyKeyMiddleware } from 'discord-interactions';

import { modesMap, gamesChoices, gamesMap } from './data.js';
import { getCachedGameCount } from "./hypixel.js";
import { isUserPremium, isUserBlacklisted, addDefault, removeDefault, getDefault, addWatcher, removeWatcher, getWatcherGame, getWatcherCount, loadWatchers } from './state.js';
import { queueInteractionMessage, HELP, USER_BLACKLISTED, GUILD_WATCHER_LIMIT, CHANNEL_IN_USE, CHANNEL_NOT_IN_USE, INVALID_GAME, NO_GAME_SELECTED, STARTED_WATCHING, STOPPED_WATCHING, DEFAULT_SET, DEFAULT_RESET } from './messages.js';
import { sendFormData } from "./utils.js";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

await loadWatchers();

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Interaction id, type and data
  const { type, data, channel_id, guild_id } = req.body;

  const userId = req.body.member?.user.id ?? req.body.user?.id;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (isUserBlacklisted(userId)) return await sendFormData(res, USER_BLACKLISTED);

  if (type === InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE) {
    const subcommand = data.options[0];

    const focusedOption = subcommand.options?.find(option => option.focused);

    if (!subcommand || !focusedOption) {
      return res.send({
        type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
        data: { choices: [] }
      });
    }

    const userInput = focusedOption.value.toLowerCase();

    return res.send({
      type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
      data: {
        choices: gamesChoices.get(subcommand.name)?.filter(choice => choice.name.toLowerCase().includes(userInput))?.slice(0, 25) ?? []
      }
    });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name, options } = data;

    // "help" command
    if (name === 'help') return await sendFormData(res, HELP);

    // "default" command
    if (name === 'default') {
      const subcommand = options[0];

      const mode = subcommand.name;
      const game = subcommand.options?.find(o => o.name === 'game')?.value;

      const modeObject = modesMap.get(mode);
      
      const scopeId = guild_id ?? channel_id;

      if (!game) {
        removeDefault(scopeId, mode);

        return await sendFormData(res, DEFAULT_RESET(modeObject));
      }

      const gameObject = gamesMap.get(mode).get(game);
      
      if (!gameObject) return await sendFormData(res, INVALID_GAME(game));

      addDefault(scopeId, mode, game);

      return await sendFormData(res, DEFAULT_SET(modeObject, gameObject.name));
    }

    // "check" command
    if (name === 'check') {
      const subcommand = options[0];

      const mode = subcommand.name;
      const game = subcommand.options?.find(o => o.name === 'game')?.value ?? getDefault(guild_id ?? channel_id, mode);

      const modeObject = modesMap.get(mode);

      if (!game) return await sendFormData(res, NO_GAME_SELECTED(modeObject.name));

      const gameObject = gamesMap.get(mode).get(game);

      if (!gameObject) return await sendFormData(res, INVALID_GAME(game));

      const count = getCachedGameCount(modeObject.api, gameObject.api);

      return await sendFormData(res, queueInteractionMessage(gameObject, count));
    }

    // "watch" command
    if (name === 'watch') {
      const subcommand = options[0];

      const watcherGame = getWatcherGame(channel_id);

      if (subcommand.name === 'stop') {
        if (!watcherGame) return await sendFormData(res, CHANNEL_NOT_IN_USE);

        removeWatcher(channel_id);

        return await sendFormData(res, STOPPED_WATCHING(gamesMap.get(watcherGame.mode).get(watcherGame.game).name));
      }

      if (guild_id && !isUserPremium(userId) && getWatcherCount(guild_id) >= 3) return await sendFormData(res, GUILD_WATCHER_LIMIT);

      if (watcherGame) return await sendFormData(res, CHANNEL_IN_USE(gamesMap.get(watcherGame.mode).get(watcherGame.game).name));

      const mode = subcommand.name;
      const game = subcommand.options?.find(o => o.name === 'game')?.value ?? getDefault(guild_id ?? channel_id, mode);

      if (!game) return await sendFormData(res, NO_GAME_SELECTED(modesMap.get(mode).name));

      const gameObject = gamesMap.get(mode).get(game);

      if (!gameObject) return await sendFormData(res, INVALID_GAME(game));

      const countThreshold = subcommand.options?.find(o => o.name === 'count')?.value ?? gameObject.count;
      const delay = subcommand.options?.find(o => o.name === 'delay')?.value ?? 5;
      const role = subcommand.options?.find(o => o.name === 'role')?.value;

      addWatcher(channel_id, userId, guild_id, mode, game, role, countThreshold, delay);

      return await sendFormData(res, STARTED_WATCHING(gameObject.name, countThreshold, delay));
    }

    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
