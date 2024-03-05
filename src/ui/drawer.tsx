import styled, { createGlobalStyle } from "styled-components";
import MapNode from "@/service/MapObject/MapNode";
import MapNodeCard from "./MapNodeCard";
import { useRef, useState } from "react";
import { useEffect } from "react";

function Drawer({
  mapNodes,
  isOpen,
}: {
  mapNodes: Array<MapNode>;
  isOpen: boolean;
}) {
  return (
    <>
      {/* <GlobalStyle /> */}
      <DrawerContainer isOpen={isOpen}>
        <RecommendText>추천 순위</RecommendText>
        {mapNodes.map((node, i) => (
          // score는 추후 수정 예정
          <MapNodeCard key={i} index={i + 1} node={node} />
        ))}
      </DrawerContainer>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    src: url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.eot);
    font-family: 'Nanum Gothic', serif;
  }
`;

const DrawerContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 120px;
  left: ${({ isOpen }) => (isOpen ? "0px" : "-270px")}; /* 변경된 부분 */
  // left: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ff9a9f;
  width: 270px;
  height: calc(100% - 120px);
  // height: 100%;
  overflow-y: auto;

  // transform: translateX(120%);
  transition: left 0.3s ease-in-out;
  // box-shadow: 0 0 40px 0 var(--bg-shadow);
`;

const RecommendText = styled.div`
  align-self: start;
  color: #4b3f4e;
  font-size: 20px;
  font-weight: 600;
  padding: 12px 0px 12px 16px;
`;

export default Drawer;
