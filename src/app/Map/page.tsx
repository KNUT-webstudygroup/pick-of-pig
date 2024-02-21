"use client";

import styled from "styled-components";

import Maps from "@/components/Map";
import HeaderNav from "@/components/HeaderNav";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Map() {
  const router = useRouter();
  // const queries = router.query; // 전달받은 쿼리 내용

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   console.log(queries);
  // }, [router.isReady]);

  return (
    <MapStyled>
      <HeaderNav />
      <LeftNav>
        <PerferenceContainer>
          <p>선호도</p>
        </PerferenceContainer>
        <RecommendContainer>
          <p>추천순위</p>
        </RecommendContainer>
      </LeftNav>
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
  z-index: -1;
`;

const PerferenceContainer = styled.div``;

const RecommendContainer = styled.div``;

const LeftNav = styled.div`
  background-color: #ff9a9f;
  width: 280px;
  height: 100%;
  padding-top: 120px;
  position: fixed;
`;

export default Map;
