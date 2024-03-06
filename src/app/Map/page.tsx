'use client';

import { useEffect, useState } from 'react';
import Drawer from '@/ui/drawer';
import MapNode from '@/service/MapObject/MapNode';
import styled from 'styled-components';
import HeaderNav from '@/components/HeaderNav';
import searchNearbyPlace from '../../service/search';

function Map() {
  const [searchAddress, setSearchAddress] = useState('');
  const [searchMapNodes, setSearchMapNodes] = useState<MapNode[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(event.target.value);
  };

  const handleSearchClick = async () => {
    const sortedMapNodes: MapNode[] = await searchNearbyPlace(searchAddress);
    setSearchMapNodes(sortedMapNodes);
  };

  // 아마 차후에 추상팩토리같은 디자인 패턴을 적용해야 하지않을까 싶네요.
  const addGoogleMap = (center: google.maps.LatLngLiteral): google.maps.Map => new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center,
    zoom: 15,
  });
  const style = { width: '100vw', height: '100vh' };
  useEffect(() => {
    const center: google.maps.LatLngLiteral = {
      lat: 37.3595316,
      lng: 127.1052133,
    };
    addGoogleMap(center);
  }, []);

  return (
    <>
      <HeaderNav />
      <div id="map" style={style} />
      {/* <Drawer mapNodes={searchMapNodes} /> */}
    </>
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
