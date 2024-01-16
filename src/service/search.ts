import { LocationType } from '../types/location';

function addMarkers(locations : Array<LocationType>) {
  const map = new naver.maps.Map('map', { // id="map"인 <div>에 지도를 생성
    center: new naver.maps.LatLng(37.3595316, 127.1052133),
    // TODO : 유저 위치 받아와서 그거 중심으로 지도배치.
    zoom: 15,
    mapTypeControl: true,
  });

  const coords : Array<naver.maps.LatLng> = [];

  locations.forEach((location) => {
    const coord = new naver.maps.LatLng(location.longitude, location.latitude);
    coords.push(coord);

    const marker = new naver.maps.Marker({
      map,
      position: coord,
    });
    // no-new rule를 잘못읽은 듯
  });

  // 모든 마커가 보이도록 지도의 중심 위치와 경계 변경
  map.setCenter(coords[0]);
  map.fitBounds(coords);
}

// 주소로 검색하여 마커 표시 및 좌표 반환
export default function searchAddressToCoordinate(address : string) {
  const locations : Array<LocationType> = [];

  naver.maps.Service.geocode({
    query: address,
  }, (status, response) => {
    if (status === naver.maps.Service.Status.ERROR) {
      return alert('Something Wrong!');
    }

    if (response.v2.meta.totalCount === 0) {
      return alert(`검색된 주소의 개수: ${response.v2.meta.totalCount}`);
    }

    const items = response.v2.addresses; // 검색된 주소의 배열

    items.forEach((item) => {
      const location : LocationType = {
        latitude: Number(item.x),
        longitude: Number(item.y),
      };
      locations.push(location);
    });

    addMarkers(locations);
  });

  return locations;
}

// 새로운 좌표로 지도 이동 후 마커 삽입
