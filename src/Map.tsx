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
  & > div {
    flex: 1;
    height: 100vh;
    width: 100vw;
  }
`;
