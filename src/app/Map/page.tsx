"use client";

import styled from "styled-components";

import Maps from "@/components/Map";
import HeaderNav from "@/components/HeaderNav";

function Map() {
  return (
    <MapStyled>
      <HeaderNav />
      {/* <LeftNav>
        <PerferenceContainer></PerferenceContainer>
        <RecommendContainer>
          <p>추천순위</p>
        </RecommendContainer>
      </LeftNav> */}
      <MapContainer>
        <Maps />
      </MapContainer>
    </MapStyled>
  );
}

const MapStyled = styled.div`
  position: absolute;
  width: 100%;
`;

const MapContainer = styled.div`
  position: relative;
`;

const PerferenceContainer = styled.div``;

const RecommendContainer = styled.div``;

const LeftNav = styled.div`
  background-color: #ff9a9f;
  width: 280px;
  height: 100%;
`;

export default Map;
