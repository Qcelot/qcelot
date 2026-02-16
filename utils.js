import 'dotenv/config';
import { readFileSync } from 'fs';

export function buildFormData(payload, filePath, fileName) {
  const form = new FormData();

  form.append('payload_json', JSON.stringify(payload));
  form.append('files[0]', new Blob([readFileSync(filePath)], { type: 'image/png' }), fileName);
    
  return form;
}

export async function sendFormData(res, form) {
  const response = new Response(form);

  res.set('Content-Type', response.headers.get('Content-Type'));
  res.send(Buffer.from(await response.arrayBuffer()));
}

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body && !(options.body instanceof FormData)) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json; charset=UTF-8' }),
      'User-Agent': 'Qcelot',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}
