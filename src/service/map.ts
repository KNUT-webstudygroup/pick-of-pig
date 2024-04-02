export function createMap() {
  const center: google.maps.LatLngLiteral = { lat: 37.3595316, lng: 127.1052133 };
  const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center,
    zoom: 15,
  });
  return map;
}

function addMarker(coord: google.maps.LatLng, map: google.maps.Map) {
  const marker = new google.maps.Marker({
    map,
    position: coord,
  });
  marker.addListener('click', () => {
    map.setCenter(coord);
    console.log('모달 띄우자!');
  });
  return marker;
}

export function addMarkers(coords : Array<google.maps.LatLng>, map: google.maps.Map) {
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
