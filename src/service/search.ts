import { LocationType } from '../types/location';
import MapNode from './MapObject/MapNode';
import { placeIdToPhoto, placeIdToPhotos } from './searchPhoto';

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

/**
 * 입력한 주소로 장소 고유 ID 얻음
 */
function addressToPlaceIds(address: string) : Promise<Array<string>> {
  const placeIds: Array<string> = [];
  const geocoder = new google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        results.forEach((result) => {
          placeIds.push(result.place_id);
        });
        resolve(placeIds);
      } else {
        reject(new Error('addressToPlaceIds failed'));
      }
    });
  });
}

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
 * 장소 고유 ID로 가게 주소를 얻음
 */
function placeIdToAddress(placeId: string, map: google.maps.Map) : Promise<string> {
  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails({ placeId }, (result, status) => {
      if (status === 'OK' && result.formatted_address) {
        resolve(result.formatted_address);
      } else {
        reject(new Error('placeIdToAddress failed'));
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
 * 장소 고유 ID로 가게 번호를 얻음
 */
function placeIdToPhoneNumber(placeId: string, map: google.maps.Map)
  : Promise<string> {
  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails({ placeId }, (result, status) => {
      if (status === 'OK' && result.formatted_phone_number) {
        resolve(result.formatted_phone_number);
      } else {
        reject(new Error('placeIdToPhoneNumber failed'));
      }
    });
  });
}

/**
 * 장소 고유 ID로 가게가 현재 열었는지 여부를 반환
 */
function placeIdToIsOpen(placeId: string, map: google.maps.Map) {
  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.getDetails({ placeId }, (result, status) => {
      if (status === 'OK' && result.opening_hours) {
        resolve(result.opening_hours.isOpen());
      } else {
        reject(new Error('placeIdToIsOpen failed'));
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
      // 🚨 현재 이슈: 배열[0]인 restaurant만 검색되고 나머지는 검색 안됨
      // 🚨 ['cafe']로 하면 카페 검색 잘됨, 나머지는 검색 안됨
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
  const photo = await placeIdToPhoto(placeId, map); // 사진이 없을 때도 고려해야 함
  // console.log(await placeIdToPhotos(placeId, map));
  // console.log(await placeIdToAddress(placeId, map));

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
      console.log(`${error} 해당 정보가 존재하지 않아 MapNode를 생성할 수 없습니다.`);
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
  const placeIds = await addressToPlaceIds(address);
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
