import { InteractionResponseFlags, InteractionResponseType } from 'discord-interactions';

export function queueMessage(role, everyone, gameObject, count) {
  return {
    content: role ? (everyone ? `@everyone` : `<@&${role}>`) : undefined,
    files: [{ attachment: `${import.meta.dirname}/assets/icons/${gameObject.icon}.png`, name: `${gameObject.icon}.png` }],
    embeds: [
      {
        title: `${gameObject.name} is ` + (count < gameObject.count ? `not ` : ``) + `queueing`,
        fields: [
          { name: `Count`, value: `${count} player` + (count !== 1 ? `s` : ``), inline: true }
        ],
        thumbnail: { url: `attachment://${gameObject.icon}.png` },
        color: (count < gameObject.count ? 0x99aab5 : 0x57f287)
      }
    ]
  };
}

function errorMessage(title, description) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      files: [{ attachment: `${import.meta.dirname}/assets/icons/barrier.png`, name: `barrier.png` }],
      embeds: [
        {
          title: title,
          description: description,
          thumbnail: { url: `attachment://barrier.png` },
          color: 0xed4245
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
      files: [{ attachment: `${import.meta.dirname}/assets/icons/clock.png`, name: `clock.png` }],
      embeds: [
        {
          title: title,
          description: description,
          thumbnail: { url: `attachment://clock.png` },
          color: 0xfee75c
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
      files: [{ attachment: `${import.meta.dirname}/assets/icons/book_writable.png`, name: `book_writable.png` }],
      embeds: [
        {
          title: title,
          description: description,
          thumbnail: { url: `attachment://book_writable.png` },
          color: 0xeb459e
        }
      ]
    }
  };
}

export const DEFAULT_SET = (mode, game) => defaultMessage(`Default set for ${mode}`, `The default game for **${mode}** has been set to **${game}**.`);
export const DEFAULT_RESET = (mode) => defaultMessage(`Default reset for ${mode}`, `The default game for **${mode}** has been reset.`);