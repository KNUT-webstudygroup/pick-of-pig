"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import searchNearbyPlace from "@/service/search";

function Maps() {
  const [searchAddress, setSearchAddress] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(event.target.value);
  };

  const handleSearchClick = () => {
    searchNearbyPlace(searchAddress);
  };
  // 아마 차후에 추상팩토리같은 디자인 패턴을 적용해야 하지않을까 싶네요.
  const addGoogleMap = (center: google.maps.LatLngLiteral): google.maps.Map =>
    new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center,
      zoom: 15,
    });
  const style = { width: "100vw", height: "100vh" };
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
      <div className="search">
        <input
          type="text"
          id="address"
          value={searchAddress}
          style={{ color: "black" }}
          onChange={handleInputChange}
        />
        <input
          id="submit"
          type="button"
          value="검색"
          onClick={handleSearchClick}
        />
      </div>
    </>
  );
}

const MapNavBar = styled.div`
  height: 150px;
  width: 100%;
  background-color: #ffb9b4;
`;

export default Maps;
