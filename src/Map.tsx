import { useEffect } from "react";
import styled from "styled-components";

function Map() {
  const { naver } = window;

  const drawMap = () => {
    new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.3595316, 127.1052133),
      zoom: 15,
      mapTypeControl: true,
    });
  };

  useEffect(() => {
    drawMap();
  }, []);

  return (
    <MapStyled>
      <div id="map"></div>
    </MapStyled>
  );
}

export default Map;

const MapStyled = styled.div`
  flex-direction: column;
  position: absolute;
  top: 0px;
  z-index:0; /*지도 기타 아이콘이 맨 위에 뜨는 것에 대한 대응.*/
  & > div {
    flex: 1;
    height: 100vh;
    width: 100vw;
  }
`;
