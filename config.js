import Database from 'better-sqlite3';

import { watchQueue } from './watch.js';

const database = new Database('config.db');

database.exec(`
  CREATE TABLE IF NOT EXISTS defaults (
    scopeId TEXT,
    mode TEXT,
    game TEXT,
    PRIMARY KEY (scopeId, mode)
  );
  CREATE TABLE IF NOT EXISTS watchers (
    channelId TEXT PRIMARY KEY,
    mode TEXT,
    game TEXT,
    role TEXT,
    everyone INTEGER,
    countThreshold INTEGER,
    delay INTEGER
  );
`);

export const defaults = new Map();
export const watchers = new Map();

export function addDefault(scopeId, mode, game) {
  database.prepare(`
    INSERT OR REPLACE INTO defaults (scopeId, mode, game)
    VALUES (?, ?, ?)
  `).run(scopeId, mode, game);
}

export function removeDefault(scopeId, mode) {
  database.prepare('DELETE FROM defaults WHERE scopeId = ? AND mode = ?').run(scopeId, mode);
}

export async function loadDefaults() {
  for (const row of database.prepare('SELECT * FROM defaults').all()) {
    try {
      if (!defaults.has(row.scopeId)) defaults.set(row.scopeId, new Map());
      defaults.get(row.scopeId).set(row.mode, row.game);
    } catch (err) {
      console.error(`Failed to restore default for ${row.scopeId}`, err);
    }
  }
}

export function addWatcher(channelId, mode, game, role, everyone, countThreshold, delay) {
  database.prepare(`
    INSERT OR REPLACE INTO watchers (channelId, mode, game, role, everyone, countThreshold, delay)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(channelId, mode, game, role, everyone ? 1 : 0, countThreshold, delay);
}

export function removeWatcher(channelId) {
  database.prepare('DELETE FROM watchers WHERE channelId = ?').run(channelId);
}

export async function loadWatchers(client) {
  for (const row of database.prepare('SELECT * FROM watchers').all()) {
    try {
      const channel = await client.channels.fetch(row.channelId);

      watchers.set(row.channelId, { game: row.game, interval: watchQueue(channel, row.mode, row.game, row.role, row.everyone, row.countThreshold, row.delay) });
    } catch (err) {
      console.error(`Failed to restore watcher for ${row.channelId}`, err);
    }
  }
}