import { LocationType } from '../types/location';
import MapNode from './MapObject/MapNode';

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
        reject(new Error('Geocoding failed'));
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
        reject(new Error('Geocoding failed'));
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
        reject(new Error('NearbySearch failed'));
      }
    });
  });
}

async function getMapNode(placeId: string, map: google.maps.Map) : Promise<MapNode> {
  const comment: Array<string> = [];
  const scores: Array<number> = [];

  const coord = await placeIdToCoord(placeId);
  const reviews = await placeIdToReviews(placeId, map);

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

  return new MapNode(location, score);
}

/**
 * 사용자가 입력한 주소를 기반으로 근처 맛집들의 위치에 마커 추가
 */
export default async function searchNearbyPlace(address: string) {
  const center: google.maps.LatLngLiteral = { lat: 37.3595316, lng: 127.1052133 };
  const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center,
    zoom: 15,
  });
  const placeIds = await addressToPlaceIds(address);
  const coord = await placeIdToCoord(placeIds[0]);
  const nearbyCoords = await searchNearbyCoords(coord, map);
  addMarkers(nearbyCoords, map);
}
