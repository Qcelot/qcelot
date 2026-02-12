import fs from 'fs';
import path from 'path';

import { watchQueue } from './watch.js';

export const watchers = new Map();
const WATCHERS_FILE = path.resolve('./watchers.json');

export const defaults = new Map();
const DEFAULTS_FILE = path.resolve('./defaults.json');

export function readWatcherFile() {
  if (!fs.existsSync(WATCHERS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(WATCHERS_FILE, 'utf8'));
  } catch (err) {
    console.error('Failed to parse watchers file:', err);
    return [];
  }
}

export function writeWatcherFile(data) {
  fs.writeFileSync(WATCHERS_FILE, JSON.stringify(data, null, 2));
}

export async function loadWatchers(client) {
  const saved = readWatcherFile();

  for (const watcher of saved) {
    try {
      const channel = await client.channels.fetch(watcher.channelId);
      watchers.set(watcher.channelId, {
        mode: watcher.mode,
        game: watcher.game,
        interval: watchQueue(channel, watcher.mode, watcher.game, watcher.role, watcher.everyone, watcher.countThreshold, watcher.delay)
      });
    } catch (err) {
      console.error(`Failed to restore watcher for ${watcher.channelId}`, err);
    }
  }
}

export function readDefaultsFile() {
  if (!fs.existsSync(DEFAULTS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DEFAULTS_FILE, 'utf8'));
  } catch (err) {
    console.error('Failed to parse defaults file:', err);
    return [];
  }
}

export function writeDefaultsFile(data) {
  fs.writeFileSync(DEFAULTS_FILE, JSON.stringify(data, null, 2));
}

export async function loadDefaults() {
  const saved = readDefaultsFile();

  for (const entry of saved) {
    try {
      defaults.set(entry.scopeId, new Map(Object.entries(entry.modes)));
    } catch (err) {
      console.error(`Failed to restore default for ${entry.scopeId}`, err);
    }
  }
}