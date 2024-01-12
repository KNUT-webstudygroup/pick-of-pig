import { Location } from '../../types/location';

export default class MapNode {
  // 거점은 이하의 정의를 따른다.
  // I. 위치를 가진다.
  // II. 평점을 가진다.
  // III. 거점의 경우,
  location : Location; // 가게의 위치를 나타낸다.

  scoreInfo : {
    comment? : Array<string>,
    scores? : Array<number>
  }; // 가게의 평판을 나타낸다.

  score : number;

  /**
   *
   * @param location
   * @param score
   */
  constructor(
    location:Location,
    score :{
      comment? : Array<string>,
      scores? : Array<number>
    },
  ) {
    this.location = location;
    this.scoreInfo = score;
  }

  /**
   * 유저의 좌표와 자기자신의 정보를 조합하여 점수를 구해주는 함수이다.
   * @author LuticaCANARD
   * @param userLocation 유저의 좌표이다.
   * @param max_distance 최대 반경 (단위 m) 이다.
   */
  GetScore(userLocation:Location, max_distance:number = 500, setting : {
    distanceRate : number
  } = {
    distanceRate: 0.5,
  }) {
    // 거리에 의한 점수는 조정된 cos로 진행한다.
    const degreePerMeter = 1e+5; // from... https://m.cafe.daum.net/gpsyn/Pllz/530
    const xDelta = (this.location.latitude - userLocation.latitude);
    const yDelta = (this.location.longitude - userLocation.longitude);
    const distance = Math.sqrt(xDelta * xDelta + yDelta * yDelta) * degreePerMeter;
    const distanceScore = distance > max_distance ? 0
      : Math.cos((Math.PI * distance) / (max_distance * 2));

    // 이하, 리뷰에 의한 점수를 구한다.
    const reviewScore = this.scoreInfo.scores?.reduce((acc, v) => acc + v, 0) ?? 0;
    const lastScore = distanceScore * setting.distanceRate
    + reviewScore * (1 - setting.distanceRate);

    this.score = lastScore; // caching...
    return lastScore;
  }
}
