import { LocationType } from '../types/location';

export function searchReviews(coord: google.maps.LatLng, map: google.maps.Map) {
  const geocoder = new google.maps.Geocoder();
  // 좌표를 이용하여 해당 장소의 고유 ID 얻음
  geocoder.geocode(
    { location: coord },
    (response) => {
      if (response[0]) {
        const placeId: string = response[0].place_id;
        const service = new google.maps.places.PlacesService(map);
        // 장소의 고유 ID를 이용하여 리뷰 얻음
        service.getDetails({ placeId }, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            return place.reviews; // 장소에 대한 리뷰 반환
          }
        });
      }
    },
  );
}

function addMarker(coord: google.maps.LatLng, map: google.maps.Map) {
  // 정적객체로 만듦.
  const marker = new google.maps.Marker({
    map,
    position: coord,
  });
  return marker;
}

function addMarkers(locations : Array<LocationType>) {
  const center: google.maps.LatLngLiteral = { lat: 37.3595316, lng: 127.1052133 };
  const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center,
    zoom: 15,
  });

  const bounds = new google.maps.LatLngBounds();

  locations.forEach((location) => {
    const coord = new google.maps.LatLng(location.latitude, location.longitude);
    addMarker(coord, map);
    map.setCenter(coord);
    bounds.extend(coord);
    // no-new rule를 잘못읽은 듯
  });

  // 다중 마커일 때 모두 보이도록 지도의 경계 변경
  if (locations.length > 1) {
    map.fitBounds(bounds);
  }
}

// 주소로 검색하여 마커 표시 및 좌표 반환
export default function searchAddressToCoordinate(address : string) {
  const locations : Array<LocationType> = [];
  const geocoder = new google.maps.Geocoder();
  // 이하 부분을 서버와 분리한다.
  // a) 위치좌표, 혹은 주소를 전송받으면 callback으로서 Marker를 표식하는 과정으로 정정한다.
  geocoder.geocode({ address }, (results, status) => {
    if (status === 'OK') {
      results.forEach((result) => {
        const location : LocationType = {
          latitude: result.geometry.location.lat(),
          longitude: result.geometry.location.lng(),
        };
        locations.push(location);
      });
      addMarkers(locations);
    }
  });

  return locations;
}
