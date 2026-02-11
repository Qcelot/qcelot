import { getCachedGameCounts } from "./hypixel.js";

export function watchQueue({ channel, role, countThreshold, delay, everyone }) {
  let ticks = 0;
  let queued = true;
  let running = false;

  const interval = setInterval(async () => {
    if (running) return;
    running = true;

    try {
      const games = await getCachedGameCounts();
      const count = games.ARCADE.modes.FARM_HUNT;

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
          await channel.send({
            content: role ? (role === everyone ? `@everyone` : `<@&${role}>`) : ` `,
            embeds: [
              {
                title: `Farm Hunt is ` + (count < 11 ? `not ` : ``) + `queueing!`,
                fields: [
                  { name: `Count`, value: `${count} players`, inline: true }
                ],
                color: 0x5a9d12
              }
            ]
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
