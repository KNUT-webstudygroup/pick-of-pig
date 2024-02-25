'use client';

import { useEffect, useState } from 'react';
import Drawer from '@/ui/drawer';
import MapNode from '@/service/MapObject/MapNode';
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
  const addGoogleMap = (center : google.maps.LatLngLiteral) : google.maps.Map => (
    new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center,
      zoom: 15,
    })
  );
  const style = { width: '100vw', height: '100vh' };
  useEffect(() => {
    const center: google.maps.LatLngLiteral = { lat: 37.3595316, lng: 127.1052133 };
    addGoogleMap(center);
  }, []);

  return (
    <>
      {/* 검색창 잠깐 오른쪽으로 옮겼어요 */}
      <div className="search" style={{ textAlign: 'right' }}>
        <input type="text" id="address" value={searchAddress} style={{ color: 'black' }} onChange={handleInputChange} />
        <input id="submit" type="button" value="검색" style={{ color: 'black' }} onClick={handleSearchClick} />
      </div>
      <div id="map" style={style} />
      <Drawer mapNodes={searchMapNodes} />
    </>
  );
}

export default Map;
