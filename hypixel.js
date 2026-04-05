import { games, modesMap } from './data.js';
import { recordPeakCounts } from './state.js';

let gameCounts = null;
let peakCounts = null;

setTimeout(async () => {  
  setInterval(async () => {
    const timestamp = Math.floor(Date.now() / 1500) * 1500;

    try {
      gameCounts = await getGameCounts();

      if (timestamp % 60000 === 0) {
        if (peakCounts) recordPeakCounts(timestamp - 60000, peakCounts);
        newPeakCounts();
      }
      else if (peakCounts) {
        for (const [mode, modeData] of Object.entries(peakCounts))
          for (const [game, count] of Object.entries(modeData.modes ?? {}))
            if (getCachedGameCount(mode, game) > count) peakCounts[mode].modes[game] = getCachedGameCount(mode, game);
      }
      else newPeakCounts();
    } catch (err) {
      console.error("Error fetching queue details:", err);
    }
  }, 1500);
}, 1500 - (Date.now() % 1500));

async function getGameCounts() {
  const res = await fetch(`https://api.hypixel.net/v2/counts?key=${process.env.HYPIXEL_API_KEY}`);

  if (!res.ok) throw new Error(`Hypixel API error: ${res.status}`);

  const data = await res.json();

  if (!data.success) throw new Error("Hypixel API returned success=false");

  return data.games;
}

export function getCachedGameCount(mode, game) {
  return gameCounts?.[mode]?.modes?.[game] ?? 0;
}

export function getCachedPeakCount(mode, game) {
  return peakCounts?.[mode]?.modes?.[game] ?? 0;
}

function newPeakCounts() {
  peakCounts = {};

  for (const [mode, gamesList] of Object.entries(games)) {
    const modeApi = modesMap.get(mode).api;

    peakCounts[modeApi] = { modes: {} };

    for (const game of gamesList) {
      const gameApi = game.api;

      if (gameCounts?.[modeApi]?.modes?.[gameApi] === undefined) peakCounts[modeApi].modes[gameApi] = getCachedGameCount(modeApi, gameApi);
    }
  }
}