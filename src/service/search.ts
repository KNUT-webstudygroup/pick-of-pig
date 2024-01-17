export type LocationType = {
  latitude: number,
  longitude: number,
};

// 주소로 검색하여 마커 표시 및 좌표 반환
export function searchAddressToCoordinate(address: string) {
  const locations: Array<LocationType> = [];

  naver.maps.Service.geocode(
    {
      query: address,
    },
    function (status, response) {
      if (status === naver.maps.Service.Status.ERROR) {
        return alert("Something Wrong!");
      }

      if (response.v2.meta.totalCount === 0) {
        return alert("검색된 주소의 개수: " + response.v2.meta.totalCount);
      }

      const items = response.v2.addresses; // 검색된 주소의 배열

      items.forEach((item) => {
        let location: LocationType = {
          latitude: Number(item.x),
          longitude: Number(item.y),
        };
        locations.push(location);
      });

      addMarkers(locations);
    }
  );

  return locations;
}

// 새로운 좌표로 지도 이동 후 마커 삽입
function addMarkers(locations: Array<LocationType>) {
  const map = new naver.maps.Map("map", {
    // id="map"인 <div>에 지도를 생성
    center: new naver.maps.LatLng(37.3595316, 127.1052133),
    zoom: 15,
    mapTypeControl: true,
  });

  const coords: Array<naver.maps.LatLng> = [];

  locations.forEach((location) => {
    let coord = new naver.maps.LatLng(location.longitude, location.latitude);
    coords.push(coord);

    new naver.maps.Marker({
      map: map,
      position: coord,
    });
  });

  // 모든 마커가 보이도록 지도의 중심 위치와 경계 변경
  map.setCenter(coords[0]);
  map.fitBounds(coords);
}

export function searchReviews(latitude: number, longitude: number) {
  const mapElement = document.createElement("div");
  const map = new google.maps.Map(mapElement); // 장소에 대한 정보를 얻기 위해 지도 객체 임의로 생성

  const geocoder = new google.maps.Geocoder();
  // 좌표를 이용하여 해당 장소의 고유 ID 얻음
  geocoder.geocode(
    { location: { lat: latitude, lng: longitude } },
    function (response) {
      if (response[0]) {
        const placeId: string = response[0].place_id;

        const service = new google.maps.places.PlacesService(map);
        // 장소의 고유 ID를 이용하여 리뷰 얻음
        service.getDetails({ placeId: placeId }, function (place, status) { // (참고: placeId "ChIJ70lL5f4iZDURou4DxhPonPA"로 하면 리뷰 잘 가져옴)
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(place); // 장소에 대한 정보
            console.log(place.reviews); // 장소에 대한 리뷰
          }
        });
      }
    }
  );
}
