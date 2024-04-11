import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(req: NextRequest) {
  /**
   *
   * A : 이 API에서 하고자 하는 일은 이하와 같다.
   * 1.지명을 건네받는다.
   * 2.주변 지물중 가장 적합한 지물을 찾는다. 요컨데 (-역으로 끝난다면) 지명과 가장 유사한 역 이름이 있는지 찾는다.
   * 3.그 좌표만 전달한다. google 좌표계를 사용하므로 도움될 것으로 판단한다.
   */
  console.log(req.nextUrl.searchParams.get('aa'));
  // const v = await fetch('http://localhost:3000');
  // -> next단에서 외부교신은 문제없는듯.
  return NextResponse.json({ aa: 'kk' });
}
