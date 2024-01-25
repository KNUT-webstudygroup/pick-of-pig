'use client';

import { useEffect } from 'react';
import Door from '@/components/Door';
import styled, { css } from 'styled-components';
import PigIcon from '@/ui/icon/pig-icon';
import PigNose from '@/ui/pig-nose';
import Map from './Map/page';

function MainPage() {
  return (
    <>
      <MainPageStyled>
        <MainTitleContainer>
          <MainTitleStyled>Pick Of Pigs</MainTitleStyled>
          <PigIcon />
          <MainSubTitle>
            <p>돼지의 메뉴 선택을 받고 싶나요 ??</p>
            <p>!! 아래의 돼지 코를 누르세요 !!</p>
          </MainSubTitle>
        </MainTitleContainer>
        <PigNose />
        <PigTail>꼬리 랜덤버튼</PigTail>
      </MainPageStyled>
    </>
  );
}

export default MainPage;

const MainTitleStyled = styled.p<{ color: string }>`
  font-size: 5rem;
  font-weight: 800;
`;

const MainSubTitle = styled.div`
  text-align: center;
`;

const PigTail = styled.div`
  width: 140px;
  height: 140px;
  background-color: #d9d9d9;
  color: black;
  margin-top: 30px;
`;

const MainTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const MainPageStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--main-bg-color);

  font-size: 2rem;

  & > span {
    font-size: 1rem;
  }
  & > span {
    font-size: 2rem;
  }
`;
