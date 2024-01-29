"use client";

import styled from "styled-components";

import Maps from "@/components/Map";
import SearchBar from "@/ui/SearchBar";

function Map() {
  return (
    <>
      <MapNavBar>
        <SearchBar></SearchBar>
      </MapNavBar>
      <Maps />
    </>
  );
}

const MapNavBar = styled.div`
  height: 150px;
  width: 100%;
  background-color: #ffb9b4;
`;

export default Map;
