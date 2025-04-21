import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

type Body = { url: string; content?: string; embeds?: any[] };
type ErrorData = { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void | ErrorData>
) {
  if (req.method !== 'POST') return res.status(405).end();
  const { url, content, embeds } = req.body as Body;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, embeds }),
    });
    res.status(200).end();
  } catch {
    res.status(500).json({ error: 'Webhook send failed.' });
  }
}
