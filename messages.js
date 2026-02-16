import { InteractionResponseFlags, InteractionResponseType } from 'discord-interactions';

export function queueMessage(role, everyone, gameObject, count) {
  return {
    content: role ? (everyone ? `@everyone` : `<@&${role}>`) : undefined,
    embeds: [
      {
        title: `${gameObject.name} is ` + (count < gameObject.count ? `not ` : ``) + `queueing`,
        fields: [
          { name: `Count`, value: `${count} player` + (count !== 1 ? `s` : ``), inline: true }
        ],
        color: (count < gameObject.count ? 0x6b7280 : 0x22c55e)
      }
    ]
  };
}

function errorMessage(title, description) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: title,
          description: description,
          color: 0xdc2626
        }
      ],
      flags: InteractionResponseFlags.EPHEMERAL
    }
  };
}

export const CHANNEL_IN_USE = (game) => errorMessage(`Channel already in use`, `This channel is already receiving notifications for **${game}**.`);
export const CHANNEL_NOT_IN_USE = errorMessage(`Channel not in use`, `This channel is not receiving notifications.`);
export const INVALID_GAME = (game) => errorMessage(`Invalid game`, `**${game}** is not a valid game.`);
export const NO_GAME_SELECTED = (mode) => errorMessage(`No default set for ${mode}`, `No game was selected and no default is set for **${mode}**.`);

function watchMessage(title, description) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: title,
          description: description,
          color: 0xeab308
        }
      ]
    }
  };
}

export const STARTED_WATCHING = (game, countThreshold) => watchMessage(`Watching ${game}`, `This channel will receive notifications for **${game}** when the player count reaches **${countThreshold}**.`);
export const STOPPED_WATCHING = (game) => watchMessage(`No longer watching ${game}`, `This channel will no longer receive notifications for **${game}**.`);

function defaultMessage(title, description) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: title,
          description: description,
          color: 0xdb2777
        }
      ]
    }
  };
}

export const DEFAULT_SET = (mode, game) => defaultMessage(`Default set for ${mode}`, `The default game for **${mode}** has been set to **${game}**.`);
export const DEFAULT_RESET = (mode) => defaultMessage(`Default reset for ${mode}`, `The default game for **${mode}** has been reset.`);