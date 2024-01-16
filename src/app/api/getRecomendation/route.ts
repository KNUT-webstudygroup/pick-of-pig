'use server';

import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
export async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Server-side logic.
  return NextResponse.json({
    aa: 'bb',
  });
}
export async function POST(request: Request, res: NextApiResponse) {
  const rep = await request.json();
  return NextResponse.json({ rep });
}
