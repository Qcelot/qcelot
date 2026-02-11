import 'dotenv/config';
import { capitalize, InstallGlobalCommands } from './utils.js';

const CHECK_COMMAND = {
  name: 'check',
  description: 'Check the current player count for Farm Hunt',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const WATCH_COMMAND = {
  name: 'watch',
  description: 'Track the player count for Farm Hunt and receive notifications when a game queues',
  options: [
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
  ],
  type: 1,
  default_member_permissions: (1n << 5n).toString(),
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const UNWATCH_COMMAND = {
  name: 'unwatch',
  description: 'Stop tracking the player count for Farm Hunt',
  type: 1,
  default_member_permissions: (1n << 5n).toString(),
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [CHECK_COMMAND, WATCH_COMMAND, UNWATCH_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
