// api/index.ts (or src/index.ts)
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).send('Hello World from Vercel + TypeScript!');
}
