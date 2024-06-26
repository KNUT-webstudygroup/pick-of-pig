'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import searchNearbyPlace from '@/service/search';
import { createMap } from '@/service/map';

function Maps() {
  const [searchAddress, setSearchAddress] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(event.target.value);
  };
  useEffect(() => {
    const map = createMap();
    const handleSearchClick = () => {
      searchNearbyPlace(searchAddress, { map });
    };
  });

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
      <div style={{ position: 'absolute' }}>
        <div id="map" style={style} />
        <div className="search">
          <input
            type="text"
            id="address"
            value={searchAddress}
            style={{ color: 'black' }}
            onChange={handleInputChange}
          />
          <input
            id="submit"
            type="button"
            value="검색"
            onClick={handleSearchClick}
          />
        </div>
      </div>
    </>
  );
}

export default Maps;
