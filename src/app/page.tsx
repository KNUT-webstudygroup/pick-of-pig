'use client';

import MainPage from '@/components/MainPage';
import MainSelectPage from '@/components/MainSelectPage';
import GlobalStyle from '@/ui/GlobalStyle';
import { RecoilRoot } from 'recoil';

function Home() {
  return (
    <>
      <MainPage />
      <MainSelectPage />
    </>
  );
}

export default Home;
