import { modesMap, gamesMap } from './data.js';
import { getCachedGameCount } from "./hypixel.js";
import { queueMessage } from './messages.js';
import { DiscordRequest } from "./utils.js";

export function watchQueue(channelId, mode, game, role, everyone, countThreshold, delay) {
  const modeObject = modesMap.get(mode);
  const gameObject = gamesMap.get(mode).get(game);

  let ticks = 0;
  let queued = true;
  let running = false;

  const interval = setInterval(async () => {
    if (running) return;
    running = true;

    try {
      const count = getCachedGameCount(modeObject.api, gameObject.api);

      if (queued) {
        if (count < countThreshold) ticks++;
        else ticks = 0;

        if (ticks >= 40 * delay) {
          ticks = 20;
          queued = false;
        }
      }
      else {
        if (count >= countThreshold) ticks--;
        else ticks = 20;

        if (ticks <= 0) {
          await DiscordRequest(`channels/${channelId}/messages`, {
            method: 'POST',
            body: queueMessage(role, everyone, gameObject, count)
          });

          ticks = 0;
          queued = true;
        }
      }
    } catch (err) {
      console.error("Error fetching queue details:", err);
    } finally {
      running = false;
    }
  }, 1500);

  return interval;
}
