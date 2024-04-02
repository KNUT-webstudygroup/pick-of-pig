'use client';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { mapState } from '@/recoil/atoms';
import { createMap } from '@/service/map';

function Map() {
  const setMap = useSetRecoilState(mapState);

  // 아마 차후에 추상팩토리같은 디자인 패턴을 적용해야 하지않을까 싶네요.
  const style = { width: '100vw', height: '100vh' };
  useEffect(() => {
    setMap(createMap());
  }, [setMap]);
  return (
    <>
      <div id="map" style={style} />
    </>
  );
}

export default Map;
