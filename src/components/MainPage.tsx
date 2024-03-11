'use client';

import styled from 'styled-components';
import PigFace from '@/ui/pig/PigFace';

function MainPage() {
  return (
    <>
      <MainPageStyled>
        <MainTitleStyled>Pick Of Pigs</MainTitleStyled>
        <PigFace />
      </MainPageStyled>
    </>
  );
}

export default MainPage;

const MainPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  // margin-bottom: 30px;
  background-color: var(--main-bg-color);
`;

const MainTitleStyled = styled.p`
  @media screen and (max-width: 1200px) {
    & {
      font-size: 6rem;
    }
  }

  @media screen and (max-width: 800px) {
    & {
      font-size: 4rem;
    }
  }
  margin-top: 120px;
  color: #4b3f4e;
  font-size: 8rem;
  font-weight: 800;
`;
