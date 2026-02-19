const API_KEY = process.env.HYPIXEL_API_KEY;

let games = null;

try {
  games = await getGameCounts();
} catch (err) {
  console.error("Error fetching queue details:", err);
}

const interval = setInterval(async () => {
  try {
    games = await getGameCounts();
  } catch (err) {
    console.error("Error fetching queue details:", err);
  }
}, 1500);

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
