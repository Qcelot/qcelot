import { recordPeakCounts } from './state.js';

const API_KEY = process.env.HYPIXEL_API_KEY;

let games = null;
let peaks = null;

setTimeout(async () => {  
  setInterval(async () => {
    const timestamp = Math.floor(Date.now() / 1500) * 1500;

    try {
      games = await getGameCounts();

      if (timestamp % 60000 === 0) {
        if (peaks) recordPeakCounts(timestamp - 60000, peaks);
        peaks = JSON.parse(JSON.stringify(games));
      }
      else if (peaks) {
        for (const [mode, modeData] of Object.entries(games))
          for (const [game, count] of Object.entries(modeData.modes ?? {}))
            if (count > peaks[mode].modes[game])
              peaks[mode].modes[game] = count;
      }
      else peaks = JSON.parse(JSON.stringify(games));
    } catch (err) {
      console.error("Error fetching queue details:", err);
    }
  }, 1500);
}, 1500 - (Date.now() % 1500));

async function getGameCounts() {
  const res = await fetch(
    `https://api.hypixel.net/v2/counts?key=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error(`Hypixel API error: ${res.status}`);
  }

  const data = await res.json();
  if (!data.success) {
    throw new Error("Hypixel API returned success=false");
  }

  return data.games;
}

export function getCachedGameCount(mode, game) {
    return games?.[mode]?.modes?.[game] ?? 0;
}

export function getCachedPeakCount(mode, game) {
    return peaks?.[mode]?.modes?.[game] ?? 0;
}
