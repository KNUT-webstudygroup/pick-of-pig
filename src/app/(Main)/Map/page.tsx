"use client";

import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { currentAddressState, ssrCompletedState } from "@/recoil/atoms";
import { createMap, initializeMap } from "@/service/map";

function Map() {
  // 아마 차후에 추상팩토리같은 디자인 패턴을 적용해야 하지않을까 싶네요.
  const [currentAddress, setCurrentAddress] =
    useRecoilState(currentAddressState);
  const style = { width: "100vw", height: "100vh" };
  const SSREnded = useRecoilValue(ssrCompletedState);

  const changeLocation = (newAddress: string) => {
    if (currentAddress !== newAddress) {
      setCurrentAddress(newAddress);
    }
  };

  useEffect(() => {
    // createMap();
    // initializeMap();
    initializeMap((newAddress) => {
      changeLocation(newAddress);
    });

    if (SSREnded) {
    }
  }, []);
  return (
    <>
      <div id="map" style={style} />
    </>
  );
}

export default Map;
