import MapNode from '../src/service/MapObject/MapNode'

test("2 더하기 3은 5야.", () => {
    expect(2+3).toBe(5);
  });

test("장거리 구하기.", () => {
    expect(new MapNode({
      longitude:41.40338,
      latitude:2.17403
    },{

    }).GetScore({
      longitude:126.91867335641052,
      latitude:37.607739222595406
    },10))
    .toBe(0);
});

test("근거리 구하기.", () => {
  expect(new MapNode({
    longitude: 126.89570909913768,
    latitude:37.580997761192805
  },{

  }).GetScore({
    longitude:126.89903220992827,
    latitude:37.584937990065555
  },1000))
  .toBeLessThan(10);
});


test("서울에서 부산까지", () => {
  expect(new MapNode({
    longitude:126.997128,
    latitude: 37.547889
  },{

  }).GetScore({
    longitude:129.043846,
    latitude:35.158874
  },10))
  .toBe(0);
});