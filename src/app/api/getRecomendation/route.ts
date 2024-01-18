import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const dynamic = 'edge'; // defaults to auto
export async function GET(req: NextRequest) {
  console.log(req.nextUrl.searchParams.get('aa'));
  //const v = await fetch('http://localhost:3000');
  //-> next단에서 외부교신은 문제없는듯.
  return NextResponse.json({ aa: 'kk' });
}
