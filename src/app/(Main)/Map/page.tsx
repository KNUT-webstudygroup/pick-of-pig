'use client';

import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { ssrCompletedState } from '@/recoil/atoms';
import { createMap } from '@/service/map';

function Map() {
  // 아마 차후에 추상팩토리같은 디자인 패턴을 적용해야 하지않을까 싶네요.
  const style = { width: '100vw', height: '100vh' };
  const SSREnded = useRecoilValue(ssrCompletedState);
  useEffect(() => {
    if (SSREnded)createMap();
  }, []);
  return (
    <>
      <div id="map" style={style} />
    </>
  );
}

export default Map;
