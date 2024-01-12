import { useEffect } from "react";
import "./Map.css";

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
    <>
      <div id="map"></div>
    </>
  );
}

export default Map;
