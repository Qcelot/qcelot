import 'dotenv/config';
import express from 'express';
import { InteractionResponseType, InteractionType, verifyKeyMiddleware } from 'discord-interactions';
import { Client, GatewayIntentBits } from 'discord.js';

import { modesMap, games, gamesMap } from './data.js';
import { getCachedGameCount } from "./hypixel.js";
import { addDefault, removeDefault, getDefault, loadDefaults, addWatcher, removeWatcher, getWatcher, loadWatchers } from './state.js';
import { queueMessage, PERMISSION_DENIED, CHANNEL_IN_USE, CHANNEL_NOT_IN_USE, INVALID_GAME, NO_GAME_SELECTED, STARTED_WATCHING, STOPPED_WATCHING, DEFAULT_SET, DEFAULT_RESET } from './messages.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

const client = new Client({ intents: [ GatewayIntentBits.Guilds ] });

client.login(process.env.DISCORD_TOKEN);

client.once('clientReady', async () => {
  client.user.setPresence({ status: 'invisible' });
});

await loadWatchers();
await loadDefaults();

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Interaction id, type and data
  const { type, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

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

    const modeGames = games[subcommand.name] || [];

    const filtered = modeGames.filter(game => game.name.toLowerCase().includes(userInput)).slice(0, 25).map(game => ({ name: game.name, value: game.name }));

    return res.send({
      type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
      data: {
        choices: filtered
      }
    });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name, options } = data;

    // "default" command
    if (name === 'default') {
      if (req.body.member && !(BigInt(req.body.member.permissions) & 1n << 5n)) return res.send(PERMISSION_DENIED);

      const subcommand = options[0];

      const mode = subcommand.name;
      const game = subcommand.options?.find(o => o.name === 'game')?.value;

      const modeObject = modesMap.get(mode);
      const gameObject = gamesMap.get(mode).get(game);
      
      const scopeId = req.body.guild_id || req.body.channel_id;

      if (!game) {
        removeDefault(scopeId, mode);

        return res.send(DEFAULT_RESET(modeObject.name));
      }

      if (!gameObject) return res.send(INVALID_GAME);

      addDefault(scopeId, mode, game);

      return res.send(DEFAULT_SET(modeObject.name, gameObject.name));
    }

    // "check" command
    if (name === 'check') {
      const subcommand = options[0];

      const mode = subcommand.name;
      const game = subcommand.options?.find(o => o.name === 'game')?.value || getDefault(req.body.guild_id || req.body.channel_id, mode);

      const modeObject = modesMap.get(mode);

      if (!game) return res.send(NO_GAME_SELECTED(modeObject.name));

      const gameObject = gamesMap.get(mode).get(game);

      if (!gameObject) return res.send(INVALID_GAME);

      const count = getCachedGameCount(modeObject.api, gameObject.api);

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: queueMessage(null, false, gameObject, count)
      });
    }

    // "watch" command
    if (name === 'watch') {
      if (req.body.member && !(BigInt(req.body.member.permissions) & 1n << 5n)) return res.send(PERMISSION_DENIED);

      if (getWatcher(req.body.channel_id)) return res.send(CHANNEL_IN_USE);

      const subcommand = options[0];

      const mode = subcommand.name;
      const game = subcommand.options?.find(o => o.name === 'game')?.value || getDefault(req.body.guild_id || req.body.channel_id, mode);

      if (!game) return res.send(NO_GAME_SELECTED(modesMap.get(mode).name));

      const gameObject = gamesMap.get(mode).get(game);

      if (!gameObject) return res.send(INVALID_GAME);
      
      const role = subcommand.options?.find(o => o.name === 'role')?.value;
      const countThreshold = subcommand.options?.find(o => o.name === 'count')?.value || gameObject.count;
      const delay = subcommand.options?.find(o => o.name === 'delay')?.value || 5;

      const everyone = role === req.body.guild?.id;

      addWatcher(req.body.channel_id, mode, game, role, everyone, countThreshold, delay);

      return res.send(STARTED_WATCHING(gameObject.name, role, everyone, countThreshold));
    }

    // "unwatch" command
    if (name === 'unwatch') {
      if (req.body.member && !(BigInt(req.body.member.permissions) & 1n << 5n)) return res.send(PERMISSION_DENIED);

      const watcher = getWatcher(req.body.channel_id);

      if (!watcher) return res.send(CHANNEL_NOT_IN_USE);

      removeWatcher(req.body.channel_id);

      return res.send(STOPPED_WATCHING(watcher.game));
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
