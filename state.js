import Database from 'better-sqlite3';

import { watchQueue } from './watch.js';

const watchers = new Map();

const database = new Database('state.db');

database.exec(`
  CREATE TABLE IF NOT EXISTS users (
    userId TEXT PRIMARY KEY,
    premium INTEGER NOT NULL DEFAULT 0,
    blacklisted INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS defaults (
    scopeId TEXT NOT NULL,
    mode TEXT NOT NULL,
    game TEXT NOT NULL,
    PRIMARY KEY (scopeId, mode)
  );

  CREATE TABLE IF NOT EXISTS watchers (
    channelId TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    guildId TEXT,
    mode TEXT NOT NULL,
    game TEXT NOT NULL,
    role TEXT,
    everyone INTEGER NOT NULL DEFAULT 0,
    countThreshold INTEGER NOT NULL,
    delay INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS index_watchers_guildId ON watchers(guildId);
`);

export function isUserPremium(userId) {
  return database.prepare('SELECT premium FROM users WHERE userId = ?').get(userId)?.premium === 1;
}

export function isUserBlacklisted(userId) {
  return database.prepare('SELECT blacklisted FROM users WHERE userId = ?').get(userId)?.blacklisted === 1;
}

export function addDefault(scopeId, mode, game) {
  database.prepare(`INSERT OR REPLACE INTO defaults (scopeId, mode, game) VALUES (?, ?, ?)`).run(scopeId, mode, game);
}

export function removeDefault(scopeId, mode) {
  database.prepare('DELETE FROM defaults WHERE scopeId = ? AND mode = ?').run(scopeId, mode);
}

export function getDefault(scopeId, mode) {
  return database.prepare('SELECT game FROM defaults WHERE scopeId = ? AND mode = ?').get(scopeId, mode)?.game;
}

export function addWatcher(channelId, userId, guildId, mode, game, role, everyone, countThreshold, delay) {
  watchers.set(channelId, watchQueue(channelId, mode, game, role, everyone, countThreshold, delay));

  database.prepare(`INSERT OR REPLACE INTO watchers (channelId, userId, guildId, mode, game, role, everyone, countThreshold, delay) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(channelId, userId, guildId, mode, game, role, everyone ? 1 : 0, countThreshold, delay);
}

export function removeWatcher(channelId) {
  const watcher = watchers.get(channelId);

  if (watcher) {
    clearInterval(watcher);

    watchers.delete(channelId);
  }

  database.prepare('DELETE FROM watchers WHERE channelId = ?').run(channelId);
}

export function getWatcher(channelId) {
  return watchers.get(channelId);
}

export function getWatcherGame(channelId) {
  return database.prepare('SELECT mode, game FROM watchers WHERE channelId = ?').get(channelId);
}

export function getWatcherCount(guildId) {
  return database.prepare('SELECT COUNT(*) AS count FROM watchers WHERE guildId = ?').get(guildId)?.count ?? 0;
}

export async function loadWatchers() {
  for (const row of database.prepare('SELECT * FROM watchers').all()) {
    try {
      watchers.set(row.channelId, watchQueue(row.channelId, row.mode, row.game, row.role, row.everyone === 1, row.countThreshold, row.delay));
    } catch (err) {
      console.error(`Failed to restore watcher for ${row.channelId}`, err);
    }
  }
}