import DoorHandle from "@/ui/DoorHandle";
import SearchBar from "@/ui/SearchBar";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

function HalfDoor(loc: string) {
  return (
    <HalfDoorStyled loc={loc}>
      <div>
        <SearchBar color="test"></SearchBar>
        <SearchResults>
          <span>검색결과</span>
          <SearchResult>
            <li>1. 햄버거</li>
            <li>2. 피자</li>
            <li>3. 파스타</li>
          </SearchResult>
        </SearchResults>
        <DoorHandle loc={"right"}></DoorHandle>
      </div>
    </HalfDoorStyled>
  );
}

const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 70px;

  // align-items: center;
`;
const SearchResult = styled.div``;

const HalfDoorStyled = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  background-color: #ff7a00;
  width: 25vw;
  height: 100vh;

  & > div {
    flex-direction: ${(props) =>
      props.loc === "right" ? "row-reverse" : "row"};
  }

  top: 0;
  left: 0;
  z-index: 1; // Door 컴포넌트가 Map 컴포넌트 위에 나타나도록 설정
`;

export default HalfDoor;
