import Database from 'better-sqlite3';

import { watchQueue } from './watch.js';

const defaults = new Map();
const watchers = new Map();

const database = new Database('state.db');

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

export function addDefault(scopeId, mode, game) {
  if (!defaults.has(scopeId)) defaults.set(scopeId, new Map());
  defaults.get(scopeId).set(mode, game);

  database.prepare(`
    INSERT OR REPLACE INTO defaults (scopeId, mode, game)
    VALUES (?, ?, ?)
  `).run(scopeId, mode, game);
}

export function removeDefault(scopeId, mode) {
  defaults.get(scopeId)?.delete(mode);

  database.prepare('DELETE FROM defaults WHERE scopeId = ? AND mode = ?').run(scopeId, mode);
}

export function getDefault(scopeId, mode) {
  return defaults.get(scopeId)?.get(mode);
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
  watchers.set(channelId, { game, interval: watchQueue(channelId, mode, game, role, everyone, countThreshold, delay) });

  database.prepare(`
    INSERT OR REPLACE INTO watchers (channelId, mode, game, role, everyone, countThreshold, delay)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(channelId, mode, game, role, everyone ? 1 : 0, countThreshold, delay);
}

export function removeWatcher(channelId) {
  const watcher = watchers.get(channelId);

  if (watcher) {
    clearInterval(watcher.interval);

    watchers.delete(channelId);
  }

  database.prepare('DELETE FROM watchers WHERE channelId = ?').run(channelId);
}

export function getWatcher(channelId) {
  return watchers.get(channelId);
}

export async function loadWatchers() {
  for (const row of database.prepare('SELECT * FROM watchers').all()) {
    try {
      watchers.set(row.channelId, { game: row.game, interval: watchQueue(row.channelId, row.mode, row.game, row.role, row.everyone, row.countThreshold, row.delay) });
    } catch (err) {
      console.error(`Failed to restore watcher for ${row.channelId}`, err);
    }
  }
}