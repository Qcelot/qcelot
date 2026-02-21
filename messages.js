import { InteractionResponseFlags, InteractionResponseType } from 'discord-interactions';
import { buildFormData } from './utils.js';

function queueMessageContent(role, everyone, gameObject, count) {
  return {
    content: role ? (everyone ? `@everyone` : `<@&${role}>`) : undefined,
    embeds: [
      {
        title: `${gameObject.name} is ` + (count < gameObject.count ? `not ` : ``) + `queueing`,
        fields: [
          { name: `Count`, value: `${count} player` + (count !== 1 ? `s` : ``), inline: true },
          ...(count < gameObject.count ? [{ name: `Threshold`, value: `${gameObject.count} player` + (gameObject.count !== 1 ? `s` : ``), inline: true }] : [])
        ],
        thumbnail: { url: `attachment://${gameObject.icon}.png` },
        color: (count < gameObject.count ? 0xb0b0b0 : 0x5d9d15)
      }
    ]
  };
}

export function queueMessage(role, everyone, gameObject, count) {
  return buildFormData(queueMessageContent(role, everyone, gameObject, count), `./assets/icons/${gameObject.icon}.png`, `${gameObject.icon}.png`);
}

export function queueInteractionMessage(role, everyone, gameObject, count) {
  return buildFormData({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: queueMessageContent(role, everyone, gameObject, count)
  }, `./assets/icons/${gameObject.icon}.png`, `${gameObject.icon}.png`);
}

export const HELP = buildFormData({
  type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    embeds: [
      {
        title: `Qcelot`,
        description: `Qcelot monitors player counts for most games on the Hypixel network. Use \`/check\` to view the current count for a game, \`/watch\` to configure notifications for when a count reaches a certain threshold, and \`/default\` to save a per-server default game for each mode. For additional help and updates, join the [official support server](https://qcelot.app/discord).`,
        thumbnail: { url: `attachment://qcelot.png` },
        color: 0xeaeae8
      }
    ]
  }
}, `./assets/qcelot.png`, `qcelot.png`);

function errorMessage(title, description) {
  return buildFormData({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: title,
          description: description,
          thumbnail: { url: `attachment://barrier.png` },
          color: 0x565461
        }
      ],
      flags: InteractionResponseFlags.EPHEMERAL
    }
  }, `./assets/icons/barrier.png`, `barrier.png`);
}

export const USER_BLACKLISTED = errorMessage(`Access denied`, `You are not permitted to use this bot.`);
export const GUILD_WATCHER_LIMIT = errorMessage(`Server limit reached`, `This server has reached its watch limit of **3 games**.`);
export const CHANNEL_IN_USE = (game) => errorMessage(`Channel already in use`, `This channel is already receiving notifications for **${game}**.`);
export const CHANNEL_NOT_IN_USE = errorMessage(`Channel not in use`, `This channel is not receiving notifications.`);
export const INVALID_GAME = (game) => errorMessage(`Invalid game`, `**${game}** is not a valid game.`);
export const NO_GAME_SELECTED = (mode) => errorMessage(`No default set for ${mode}`, `No game was specified and no default is set for **${mode}**.`);

function statusMessage(title, description, icon) {
  return buildFormData({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: title,
          description: description,
          thumbnail: { url: `attachment://${icon}.png` },
          color: 0xbf7373
        }
      ]
    }
  }, `./assets/icons/${icon}.png`, `${icon}.png`);
}

export const STARTED_WATCHING = (game, countThreshold, delay) => statusMessage(`Watching ${game}`, `This channel will receive notifications for **${game}** at a **${delay} minute** interval when the player count reaches **${countThreshold}**.`, `clock`);
export const STOPPED_WATCHING = (game) => statusMessage(`No longer watching ${game}`, `This channel will no longer receive notifications for **${game}**.`, `clock`);
export const DEFAULT_SET = (modeObject, game) => statusMessage(`Default set for ${modeObject.name}`, `The default game for **${modeObject.name}** has been set to **${game}**.`, modeObject.icon);
export const DEFAULT_RESET = (modeObject) => statusMessage(`Default reset for ${modeObject.name}`, `The default game for **${modeObject.name}** has been reset.`, modeObject.icon);