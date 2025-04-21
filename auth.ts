import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type User = { username: string; password: string };
type Data = { ok: boolean } | { error: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, password } = req.body as User;
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as {
    users: User[];
  };
  json.users.push({ username, password });
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
  res.status(200).json({ ok: true });
}
