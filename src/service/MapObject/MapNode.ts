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

  // 유저의 좌표와 자기자신의 정보를 조합하여 점수를 구해주는 함수이다.
  GetScore : (userLocation:Location)=>{

  };
}
