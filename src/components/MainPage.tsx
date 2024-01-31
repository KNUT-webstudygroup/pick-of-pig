"use client";

import styled from "styled-components";
import PigFace from "@/ui/pig/PigFace";

function MainPage() {
  return (
    <>
      <MainPageStyled>
        <MainTitleStyled>Pick Of Pigs</MainTitleStyled>
        <PigFace></PigFace>
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
  width: 100%;
  height: 100%;
  background-color: var(--main-bg-color);
`;

const MainTitleStyled = styled.p`
  margin-top: 120px;
  color: #4b3f4e;
  font-size: 8rem;
  font-weight: 800;
`;
