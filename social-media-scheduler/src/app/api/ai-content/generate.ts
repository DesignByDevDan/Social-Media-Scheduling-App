import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Your existing OpenAI API call logic here
}
