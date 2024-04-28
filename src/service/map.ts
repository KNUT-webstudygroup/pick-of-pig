"use client";

import { currentAddressState } from "@/recoil/atoms";
import { extractAddressComponents } from "@/utils/mapUtils";

export function createMap() {
  const center: google.maps.LatLngLiteral = {
    lat: 37.3595316,
    lng: 127.1052133,
  };
  if (caching === undefined) {
    caching = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center,
        zoom: 15,
      }
    );
  }
  return caching; // 위의 if문에 의해서 caching됨.
}

let caching: google.maps.Map<Element> | undefined;

function addMarker(coord: google.maps.LatLng, map: google.maps.Map) {
  const marker = new google.maps.Marker({
    map,
    position: coord,
  });
  marker.addListener("click", () => {
    map.setCenter(coord);
    console.log("모달 띄우자!");
  });
  return marker;
}

export function addMarkers(
  coords: Array<google.maps.LatLng>,
  map: google.maps.Map
) {
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

export function initializeMap(changeLocation: (address: string) => void) {
  const mapCenter: google.maps.LatLngLiteral = {
    lat: 37.3595316,
    lng: 127.1052133,
  };
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: mapCenter,
      zoom: 15,
    }
  );

  // 지도가 움직일 때마다 실행될 이벤트 리스너
  map.addListener("center_changed", () => {
    // 지도의 새로운 중심 좌표를 얻음
    const newCenter = map.getCenter();

    // 새로운 중심 좌표를 기반으로 주소를 얻기 위한 함수 호출
    // getAddressFromCoords(newCenter.lat(), newCenter.lng());
    getAddressFromCoords(newCenter.lat(), newCenter.lng(), changeLocation);
  });
}

// 좌표를 기반으로 주소를 얻는 함수
export function getAddressFromCoords(
  lat: number,
  lng: number,
  changeLocation: (address: string) => void
) {
  const geocoder = new google.maps.Geocoder();
  const latlng = {
    lat: lat,
    lng: lng,
  };

  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === "OK") {
      if (results[0]) {
        const newAddress = extractAddressComponents(
          results[0].formatted_address
        );
        changeLocation(newAddress);
        // console.log(`현재 주소: newAddress`, newAddress);
      } else {
        console.error("결과를 찾을 수 없습니다.");
      }
    } else {
      console.error("Geocoder 실패 이유: " + status);
    }
  });
}
