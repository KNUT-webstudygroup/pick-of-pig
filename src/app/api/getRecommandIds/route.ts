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
  /**
   * ! 주의 : cloudflare workers는 tree tier에서는 10ms의 제한이 있다!
   */

  const searchPlace = req.nextUrl.searchParams.get('place');
  if (!searchPlace) {
    return NextResponse.error();
  }
  const place = JSON.parse(searchPlace);
  const lng = Number(req.nextUrl.searchParams.get('lng'));
  const lat = Number(req.nextUrl.searchParams.get('lat'));
  const range = Number(req.nextUrl.searchParams.get('range'));
  const count = Number(req.nextUrl.searchParams.get('count'));
  if (!lng || !lat || !range || !count) {
    return NextResponse.error();
  }
  const ret = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GOOGLE_AUTH_KEY}`,
      'X-Goog-FieldMask': 'places.id',
      'X-Goog-Api-Key': process.env.GOOGLE_API_KEY ?? '',
    },
    method: 'POST',
    body: JSON.stringify({
      includedTypes: place,
      maxResultCount: count,
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius: range,
        },
      },

    }),
  });
  console.log(ret.ok, ret.status, ret.statusText, ret.headers, ret.body);
  // const v = await fetch('http://localhost:3000');
  // -> next단에서 외부교신은 문제없는듯.
  return NextResponse.json(ret.json());
}
