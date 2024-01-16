import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(req: NextRequest) {
  console.log(req.nextUrl.searchParams.get('aa'));
  return NextResponse.json({ aa: 'kk' });
}
