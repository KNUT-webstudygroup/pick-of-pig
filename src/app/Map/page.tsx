'use client';

import { useEffect, useState } from 'react';
import './Map.css';
import searchAddressToCoordinate from '../../service/search';

function Map() {
  const [searchAddress, setSearchAddress] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(event.target.value);
  };

  const handleSearchClick = () => {
    searchAddressToCoordinate(searchAddress);
  };

  const style = { width: '100vw', height: '100vh' };
  useEffect(() => {
    const center: google.maps.LatLngLiteral = { lat: 37.3595316, lng: 127.1052133 };
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center,
      zoom: 15,
    });
  }, []);

  return (
    <>
      <div id="map" style={style} />
      <div className="search">
        <input type="text" id="address" value={searchAddress} onChange={handleInputChange} />
        <input id="submit" type="button" value="검색" onClick={handleSearchClick} />
      </div>
    </>
  );
}

export default Map;
