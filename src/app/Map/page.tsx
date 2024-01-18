'use client';

import { useEffect } from 'react';
import './Map.css';

// import SearchHandler from '../../service/search';

function MediaKeyStatusMap() {
  const { naver } = window;

  return new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3595316, 127.1052133),
    zoom: 15,
    mapTypeControl: true,
  });
}
function Map() {
  const style = { width: '100%', height: '800px' };
  useEffect(() => {
    MediaKeyStatusMap();
  }, []);

  return (
    <>
      <div id="map" style={style} />
      <div className="search">
        <input type="text" id="address" />
        <input id="submit" type="button" value="검색" />
      </div>
      <table>
        <thead>
          <tr>
            <th>주소</th>
            <th>위도</th>
            <th>경도</th>
          </tr>
        </thead>
        <tbody id="mapList" />
      </table>
    </>
  );
}

export default Map;
