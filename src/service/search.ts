import { LocationType } from '../types/location';
import MapNode from './MapObject/MapNode';
import placeIdToPhotos from './searchPhoto';

function addMarker(coord: google.maps.LatLng, map: google.maps.Map) {
  const marker = new google.maps.Marker({
    map,
    position: coord,
  });
  return marker;
}

function addMarkers(coords : Array<google.maps.LatLng>, map: google.maps.Map) {
  const bounds = new google.maps.LatLngBounds();

  coords.forEach((coord) => {
    addMarker(coord, map);
    map.setCenter(coord);
    bounds.extend(coord);
  });

  // 다중 마커일 때 모두 보이도록 지도의 경계 변경
  if (coords.length > 1) {
    map.fitBounds(bounds);
  }
}

type AddressToPlaceIdsReturnType = {
  ret : boolean // 만약 추가로 검색할 필요가 없으면 true, 추가로 검색해야 한다면 false
  ids : Array<string> | null, // 추가로 검색할 필요가 없다면 장소 ID 배열
  location : google.maps.LatLng | null// 추가로 검색해야 한다면 좌표
};

/**
 * 주소를 통하여 맛집으로 추정가능한 장소의 고유 ID를 얻음
 * @param address 대상 주소임
 * @returns 주소가 유효하여 탐색가능하였다면 장소 ID 배열을 반환, 그렇지 않다면 유효한 것으로 보이는 장소의 좌표 혹은 아예 없음을 리턴
 */
function addressToPlaceIds(address: string) : Promise<AddressToPlaceIdsReturnType> {
  const returns:AddressToPlaceIdsReturnType = {
    ret: false,
    ids: null,
    location: null,
  };
  const placeIds: Array<string> = [];
  const geocoder = new google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        switch (results[0].geometry.location_type) {
          case google.maps.GeocoderLocationType.APPROXIMATE:
            returns.ret = false;
            returns.location = results[0].geometry.location;
            break;
          default:
            returns.ret = true;
            results.forEach((result) => {
              placeIds.push(result.place_id);
            });
            returns.ids = placeIds;
        }
        resolve(returns);
      } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
        returns.ret = false;
        returns.location = null;
        resolve(returns);
      } else {
        reject(new Error('addressToPlaceIds failed'));
      }
    });
  });
}

// function findLocationQuery(query:string) {
//   return new Promise((res, rej) => {
//     const search = new google.maps.places.PlacesService();
//     search.textSearch({
//       query,
//     }, (ret, stat) => {

//     });
//   });
// }

/**
 * 장소 고유 ID로 좌표를 얻음
 */
function placeIdToCoord(placeId: string) : Promise<google.maps.LatLng> {
  const geocoder = new google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === 'OK') {
        const coord = results[0].geometry.location;
        resolve(coord);
      } else {
        reject(new Error('placeIdToCoord failed'));
      }
    });
  });
}

/**
 * 장소 고유 ID로 가게 이름을 얻음
 */
function placeIdToName(placeId: string, map: google.maps.Map) : Promise<string> {
  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails({ placeId }, (result, status) => {
      if (status === 'OK') {
        resolve(result.name);
      } else {
        reject(new Error('placeIdToName failed'));
      }
    });
  });
}

/**
 * 장소 고유 ID로 장소의 타입 얻음
 */
function placeIdToTypes(placeId: string, map: google.maps.Map) : Promise<Array<string>> {
  const types: Array<string> = [];
  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails({ placeId }, (result, status) => {
      if (status === 'OK' && result.types) {
        result.types.forEach((type) => {
          types.push(type);
        });
        resolve(types);
      } else {
        reject(new Error('placeIdToTypes failed'));
      }
    });
  });
}

/**
 * 장소 고유 ID로 별점을 얻음
 */
function placeIdToRating(placeId: string, map: google.maps.Map) : Promise<number> {
  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails({ placeId }, (result, status) => {
      if (status === 'OK' && result.rating) {
        resolve(result.rating);
      } else {
        reject(new Error('placeIdToRating failed'));
      }
    });
  });
}

/**
 * 장소 고유 ID로 가격 점수를 얻음
 */
function placeIdToPriceLevel(placeId: string, map: google.maps.Map) : Promise<number> {
  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails({ placeId }, (result, status) => {
      if (status === 'OK' && result.price_level) {
        resolve(result.price_level);
      } else {
        reject(new Error('placeIdToPriceLevel failed'));
      }
    });
  });
}

/**
 * 장소 고유 ID로 리뷰를 얻음
 */
function placeIdToReviews(placeId: string, map: google.maps.Map)
  : Promise<Array<google.maps.places.PlaceReview>> {
  const reviews: Array<google.maps.places.PlaceReview> = [];
  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails({ placeId }, (result, status) => {
      console.log('TE');
      console.log(result);
      if (status === 'OK' && result.reviews) {
        result.reviews.forEach((review) => {
          reviews.push(review);
        });
        resolve(reviews);
      } else {
        reject(new Error('placeIdToReviews failed'));
      }
    });
  });
}

/**
 * 입력 좌표의 반경 200m 맛집 좌표를 얻음
 */
function searchNearbyCoords(coord: google.maps.LatLng, map: google.maps.Map)
  : Promise<Array<google.maps.LatLng>> {
  const NearbyCoords : Array<google.maps.LatLng> = [];
  const service = new google.maps.places.PlacesService(map);

  return new Promise((resolve, reject) => {
    service.nearbySearch({
      location: coord,
      types: ['restaurant', 'bakery', 'bar', 'cafe'],
      radius: 200.0, // 일단 200m로 설정
    }, (results, status) => {
      if (status === 'OK') {
        results.forEach((result) => {
          if (result.geometry) {
            NearbyCoords.push(result.geometry.location);
          }
        });
        resolve(NearbyCoords);
      } else {
        reject(new Error('searchNearbyCoords failed'));
      }
    });
  });
}
/**
 * 입력한 좌표애 대하여 지정된 반경안의 맛집의 고유 ID를 얻음
 * @param coord 중앙 좌표
 * @param map 구글 지도
 * @param types 검색 종류
 * @param radius 반경
 * @returns 검색된 맛집의 IDS
 */
function searchNearbyCoordsToId(
  coord: google.maps.LatLng,
  map: google.maps.Map,
  types:Array<string> = [],
  radius:number = 200.0,
): Promise<Array<string>> {
  const placeIds : Array<string> = [];
  const service = new google.maps.places.PlacesService(map);

  return new Promise((resolve, reject) => {
    service.nearbySearch({
      location: coord,
      types,
      radius: 200.0, // 일단 200m로 설정
    }, (results, status) => {
      if (status === 'OK') {
        results.forEach((result) => {
          if (result.id) {
            placeIds.push(result.id);
          }
        });
        resolve(placeIds);
      } else {
        reject(new Error('searchNearbyCoordsToId failed'));
      }
    });
  });
}

/**
 * 입력 좌표의 반경 200m 맛집의 고유 ID를 얻음
 */
function searchNearbyPlaceIds(coord: google.maps.LatLng, map: google.maps.Map)
  : Promise<Array<string>> {
  const NearbyPlaceIds : Array<string> = [];
  const service = new google.maps.places.PlacesService(map);

  return new Promise((resolve, reject) => {
    service.nearbySearch({
      location: coord,
      types: ['restaurant', 'bakery', 'bar', 'cafe'],
      radius: 200.0, // 일단 200m로 설정
    }, (results, status) => {
      if (status === 'OK') {
        results.forEach((result) => {
          if (result.place_id) {
            NearbyPlaceIds.push(result.place_id);
          }
        });
        resolve(NearbyPlaceIds);
      } else {
        // TODO : 팝업띄워서 알려줄 것...
        reject(new Error('searchNearbyPlaceIds failed'));
      }
    });
  });
}

/**
 * 해당 장소 ID에 대하여 MapNode 객체를 반환
 */
async function getMapNode(placeId: string, map: google.maps.Map) : Promise<MapNode> {
  const comment: Array<string> = [];
  const scores: Array<number> = [];

  const name = await placeIdToName(placeId, map);
  const coord = await placeIdToCoord(placeId);
  const reviews = await placeIdToReviews(placeId, map);
  const photo = await placeIdToPhotos(placeId, map); // 사진이 없을 때도 고려해야 함

  const location : LocationType = {
    latitude: coord.lat(),
    longitude: coord.lng(),
  };

  reviews.forEach((review) => {
    comment.push(review.text);
    scores.push(review.rating);
  });

  const score = {
    comment,
    scores,
  };

  return new MapNode(placeId, name, location, score, photo);
}

/**
 * 장소 ID 배열에 대하여 MapNode 객체 배열을 반환
 */
async function getMapNodes(placeIds: Array<string>, map: google.maps.Map)
  : Promise<Array<MapNode>> {
  const mapNodePromises : Array<Promise<MapNode | undefined>> = placeIds.map(async (placeId) => {
    try {
      return await getMapNode(placeId, map);
    } catch (error) {
      console.log('해당 장소에 대한 리뷰가 존재하지 않아 MapNode를 생성할 수 없습니다.');
    }
  });

  const mapNodeResults = await Promise.all(mapNodePromises);
  const mapNodes = mapNodeResults.filter((result): result is MapNode => result !== undefined);
  return mapNodes;
}

/**
 * MapNode 객체 배열을 점수를 기준으로 내림차순 정렬
 */
function sortMapNodesByScore(mapNodes: Array<MapNode>) : Array<MapNode> {
  const sortedMapNodes = [...mapNodes];

  sortedMapNodes.sort((left, right) => {
    const leftLocation = left.location;
    const rightLocation = right.location;
    return right.GetScore(leftLocation) - left.GetScore(rightLocation);
  });

  return sortedMapNodes;
}

/**
 * 사용자가 입력한 주소를 기반으로 근처 맛집들의 위치에 마커 추가
 */
export default async function searchNearbyPlace(address: string) : Promise<Array<MapNode>> {
  const center: google.maps.LatLngLiteral = { lat: 37.3595316, lng: 127.1052133 };
  const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center,
    zoom: 15,
  });
  const placeSearchResult = await addressToPlaceIds(address);
  let placeSearching = null;
  if (placeSearchResult.ret === false) { // 검색에 실패한 경우
    if (placeSearchResult.location === null) {
      return [];
    }
    const searchingZone = placeSearchResult.location;
    placeSearching = await searchNearbyCoordsToId(searchingZone, map);
  }
  const placeIds = placeSearchResult.ids ?? placeSearching ?? [];
  const coord = await placeIdToCoord(placeIds[0]);
  const nearbyPlaceIds = await searchNearbyPlaceIds(coord, map);

  const mapNodes = await getMapNodes(nearbyPlaceIds, map);
  const sortedMapNodes = sortMapNodesByScore(mapNodes);

  const latLngs: Array<google.maps.LatLng> = [];
  sortedMapNodes.forEach((node) => {
    const latLng = new google.maps.LatLng(node.location.latitude, node.location.longitude);
    latLngs.push(latLng);
  });
  addMarkers(latLngs, map);

  return sortedMapNodes;
}
