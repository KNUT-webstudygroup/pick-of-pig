'use client';

import { useEffect } from 'react';
import './Map.css';

function Map() {
  useEffect(() => {
    const { naver } = window;

    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.3595316, 127.1052133),
      zoom: 15,
      mapTypeControl: true,
    });
  }, []);

  return (
    <>
        <div id="map">d</div>
    </>
  );
}

export default Map;
