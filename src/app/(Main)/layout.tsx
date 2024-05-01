'use client';

import styled from 'styled-components';
import HeaderNav from '@/components/Header';
import { useState } from 'react';
import LeftNavContainer from '@/components/LeftNav';
import RandomModal from '@/components/modal/RandomModal';
import OAuth2 from '@/components/oauth2';

function MainLayout({ children }: { children: React.ReactNode }) {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(true);
  const [isRandomModal, setIsRandomModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openLeftNav = () => {
    setIsLeftNavOpen(!isLeftNavOpen);
  };
  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const openRandom = () => {
    setIsRandomModal(!isRandomModal);
  };
  const closeModal = (name: string) => {
    setIsRandomModal(false);
  };
  return (
    // Header, Left nav정하고 들어가기
    //  장바구니도 들어가야함
    <>
      <HeaderNav
        openLeftNav={openLeftNav}
        openRandom={openRandom}
        isOpenModal={isOpenModal}
        openModal={openModal}
      />
      <LeftNavContainer isLeftNavOpen={isLeftNavOpen} />
      {isRandomModal ? (
        <RandomModal closeModal={() => closeModal('Random')} />
      ) : null}
      <MainContentStyled>{children}</MainContentStyled>
    </>
  );
}

export default MainLayout;

// 지도비율과 basket비율 어떻게 할지..
const MainContentStyled = styled.div``;
