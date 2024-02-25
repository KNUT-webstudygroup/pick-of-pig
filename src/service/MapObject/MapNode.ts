import { LocationType } from '../../types/location';

export default class MapNode {
  // 거점은 이하의 정의를 따른다.
  // I. 위치를 가진다.
  // II. 평점을 가진다.
  // III. 거점의 경우,
  id: string; // 구글맵으로부터 가져온 장소의 고유 ID

  name: string; // 가게의 이름

  location: LocationType; // 가게의 위치를 나타낸다.

  scoreInfo: {
    comment?: Array<string>;
    scores?: Array<number>;
  }; // 가게의 평판을 나타낸다.

  reviewScore: number;

  costScore?:Array<number>; // 가게 자체의 가격 수준.(0~10)

  /**
   * @param id
   * @param name
   * @param location
   * @param score
   */
  constructor(
    id: string,
    name: string,
    location: LocationType,
    score: {
      comment?: Array<string>;
      scores?: Array<number>;
    },
    setting: {
      max_score: number;
    } = {
      max_score: 5,
    },
  ) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.scoreInfo = score;
    const scoreLength = score?.scores?.length;
    if (scoreLength) {
      let scoreSum = score.scores?.reduce((acc, v) => acc + v, 0) ?? 0;
      scoreSum /= !Number.isNaN(scoreLength) ? scoreLength : 1;
      scoreSum /= setting.max_score; // 정규화
      this.reviewScore = scoreSum;
    } else {
      this.reviewScore = 0;
    }
  }

  /**
   * 유저의 좌표와 자기자신의 정보를 조합하여 점수를 구해주는 함수이다.
   * @author LuticaCANARD
   * @param userLocation 유저의 좌표이다.
   * @param max_distance 최대 반경 (단위 m) 이다.
   */
  GetScore(
    userLocation: LocationType,
    max_distance: number = 500,
    setting: {
      distanceRate: number;
    } = {
      distanceRate: 0.5,
    },
  ) {
    // 거리에 의한 점수는 조정된 cos로 진행한다.
    const r = 6371.439 * 1e3;
    // from... https://en.wikipedia.org/wiki/Haversine_formula
    /*
    Either formula is only an approximation when applied to the Earth, which is not a perfect sphere
    the "Earth radius" R varies from 6356.752 km at the poles to 6378.137 km at the equator. ...
    한국 위도 따지면 얼마나 나올려나..
    */
    // 거리 API를 쓴다면 이건 대체 될 수 있음.
    const xDelta = Math.abs(this.location.latitude - userLocation.latitude)
      * (Math.PI / 180);
    const yDelta = Math.abs(this.location.longitude - userLocation.longitude)
      * (Math.PI / 180);
    const xDeltaSignal = Math.sin(xDelta / 2) * Math.sin(xDelta / 2);
    const yDeltaSignal = Math.sin(yDelta / 2) * Math.sin(yDelta / 2);
    const xDeltaNoise = Math.cos(this.location.latitude * (Math.PI / 180))
      * Math.cos(userLocation.latitude * (Math.PI / 180));
    const squreRoot = Math.sqrt(xDeltaSignal + xDeltaNoise * yDeltaSignal);
    const distance = Math.asin(squreRoot) * 2 * r;
    // Math.sqrt(xDelta * xDelta + yDelta * yDelta) * degreePerMeter;
    const distanceScore = distance > max_distance
      ? 0
      : Math.cos((Math.PI * distance) / (max_distance * 2));

    // 이하, 리뷰에 의한 점수를 구한다.
    // SUM(리뷰 점수 / 리뷰의 만점) / 표본 갯수를 점수로 삼는다.
    const lastScore = distanceScore * setting.distanceRate
      + this.reviewScore * (1 - setting.distanceRate);

    return lastScore;
  }
}
