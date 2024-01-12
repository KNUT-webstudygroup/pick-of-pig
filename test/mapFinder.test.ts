import MapNode from '../src/service/MapObject/MapNode'

test("2 더하기 3은 5야.", () => {
    expect(2+3).toBe(5);
  });

test("최적경로를 탐사한다.", () => {


    expect(new MapNode({
      longitude:41.40338,
      latitude:2.17403
    },{

    }).GetScore({
      longitude:37.607739222595406,
      latitude:126.91867335641052
    },10))
    .toBe(0);
});