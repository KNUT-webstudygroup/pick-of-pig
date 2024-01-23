'use client';

import { useEffect, useState } from 'react';
import searchAddressToCoordinate from '../../service/search';

function Map() {
  const [searchAddress, setSearchAddress] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(event.target.value);
  };

  const handleSearchClick = () => {
    searchAddressToCoordinate(searchAddress);
  };
  // 아마 차후에 추상팩토리같은 디자인 패턴을 적용해야 하지않을까 싶네요.
  // 동작과 변수를 구분하는 영역인 것 같아서 나눴어요!
  const addGoogleMap = (center : google.maps.LatLngLiteral) : google.maps.Map => (
    new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center,
      zoom: 15,
    })
  );
  const style = { width: '100vw', height: '100vh' };
  useEffect(() => {
    const center: google.maps.LatLngLiteral = { lat: 37.3595316, lng: 127.1052133 };
    // 사용할 일이 없어서 객체로 할당 안해도 될것 같네요
    // const map =
    addGoogleMap(center);
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
