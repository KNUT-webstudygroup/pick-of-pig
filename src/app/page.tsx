'use client';

import { useEffect } from 'react';
import Door from '@/components/Door';
import styled, { css } from 'styled-components';
import PigIcon from '@/ui/icon/pig-icon';
import PigNose from '@/ui/pig-nose';
import MainPage from '@/components/MainPage';
import MainSelectPage from '@/components/MainSelectPage';
import Map from './Map/page';

function Home() {
  return (
    <>
      <MainPage />
      <MainSelectPage />
    </>
  );
}

export default Home;
