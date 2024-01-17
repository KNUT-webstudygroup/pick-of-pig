import { useEffect } from 'react';
import { searchAddressToCoordinate, searchReviews } from './service/search';
import './Map.css';

function Map() {
  const { naver } = window;

  const drawMap = () => {
    new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.3595316, 127.1052133),
      zoom: 15,
      mapTypeControl: true,
    });
  };

  useEffect(() => {
    drawMap();
    searchAddressToCoordinate('중구'); // 마커 삽입 테스트
    searchReviews(37.3595316, 127.1052133); // 리뷰 출력 테스트
  }, []);

  return (
    <body>
      <div id="map" />
    </body>
  );
}

export default Map;
