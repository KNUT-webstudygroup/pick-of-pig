'use client';

import { useEffect } from 'react';

function Map() {
  // 아마 차후에 추상팩토리같은 디자인 패턴을 적용해야 하지않을까 싶네요.
  const addGoogleMap = (center: google.maps.LatLngLiteral): google.maps.Map => new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center,
    zoom: 15,
  });
  const style = { width: '100vw', height: '100vh' };
  useEffect(() => {
    const center: google.maps.LatLngLiteral = {
      lat: 37.3595316,
      lng: 127.1052133,
    };
    addGoogleMap(center);
  }, []);
  return (
    <>
      <div id="map" style={style} />
    </>
  );
}

export default Map;
