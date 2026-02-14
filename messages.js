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
        color: 0x5a9d12
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
          color: 0x55535d
        }
      ],
      flags: InteractionResponseFlags.EPHEMERAL
    }
  };
}

export const CHANNEL_IN_USE = errorMessage(`Channel in use`, `This channel is already being used to watch a game.`);
export const CHANNEL_NOT_IN_USE = errorMessage(`Channel not in use`, `This channel is not being used to watch a game.`);
export const INVALID_GAME = errorMessage(`Invalid game`, `The selected game is not valid.`);

export function NO_GAME_SELECTED(mode) {
  return errorMessage(`No game selected`, `You did not select a game and there is no default set for ${mode}.`);
}

function statusMessage(title, description) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: title,
          description: description,
          color: 0xb97374
        }
      ]
    }
  };
}

export function STARTED_WATCHING(game, role, everyone, countThreshold) {
  return statusMessage(`Started watching the queues for ${game}`, `Notifications will be sent ` + (role ? (everyone ? `to @everyone ` : `to <@&${role}> `) : ``) + `when the player count reaches ${countThreshold}.`);
}

export function STOPPED_WATCHING(game) {
  return statusMessage(`Stopped watching the queues for ${game}`, `Notifications will no longer be sent.`);
}

export function DEFAULT_SET(mode, game) {
  return statusMessage(`Default set`, `The default game for ${mode} has been set to ${game}.`);
}

export function DEFAULT_RESET(mode) {
  return statusMessage(`Default reset`, `The default game for ${mode} has been reset.`);
}