import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';
import { modes } from './data.js';

function createModeSubcommands(globalOptions, default_member_permissions, integration_types, contexts, descriptionPrefix, descriptionSuffix, gameDescription) {
  return modes.map(({ mode, name }) => {
    const options = [];

    options.push({
      type: 3,
      name: 'game',
      description: gameDescription,
      required: false,
      autocomplete: true,
    });

    options.push(...globalOptions);

    return {
      type: 1,
      name: mode,
      description: descriptionPrefix + name + descriptionSuffix,
      options: options,
      default_member_permissions: default_member_permissions,
      integration_types: integration_types,
      contexts: contexts,
    };
  });
}

const DEFAULT_COMMAND = {
  name: 'default',
  description: 'Set a default game',
  options: createModeSubcommands([], (1n << 5n).toString(), [0], [0, 1], `Set a default game for `, ``, `Game to set as default`),
};

const CHECK_COMMAND = {
  name: 'check',
  description: 'Check the current player count',
  options: createModeSubcommands([], null, [0, 1], [0, 1, 2], `Check the current player counts for `, ``, `Game to check`),
};

const WATCH_COMMAND = {
  name: 'watch',
  description: 'Track the player count and receive notifications when a game queues',
  options: createModeSubcommands([
    {
      type: 4,
      name: 'count',
      description: 'Player count threshold to trigger a notification',
      required: false
    },
    {
      type: 8,
      name: 'role',
      description: 'Role to ping',
      required: false
    },
    {
      type: 4,
      name: 'delay',
      description: 'Delay before attempting to send another notification (in minutes)',
      required: false
    },
  ], (1n << 5n).toString(), [0], [0, 1], `Track the player counts for `, ` and receive notifications when a game queues`, `Game to track`),
};

const UNWATCH_COMMAND = {
  name: 'unwatch',
  description: 'Stop tracking the player counts',
  type: 1,
  default_member_permissions: (1n << 5n).toString(),
  integration_types: [0],
  contexts: [0, 1],
};

const ALL_COMMANDS = [DEFAULT_COMMAND, CHECK_COMMAND, WATCH_COMMAND, UNWATCH_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
