import { useState } from "react";
import styled from "styled-components";
import DoorHandle from "@/ui/DoorHandle";

function Door({ title, loc }: { title: string; loc: string }) {
  return (
    <>
      <DoorStyled loc={loc}>
        <DoorMain>
          <span>{title}</span>
          {loc === "right" ? (
            <img src="/src/assets/pig.svg"></img>
          ) : (
            <img src="/src/assets/meal.svg"></img>
          )}
          <SearchBarContainer>
            <input placeholder="메뉴를 입력하세요" className="search_input" />
            <span class="material-symbols-outlined icon">search</span>
          </SearchBarContainer>
          {loc === "right" ? (
            <RecommendList>
              <span>1. 라면</span>
              <span>2. 칼국수</span>
              <span>3. 김치찌개</span>
            </RecommendList>
          ) : (
            <SearchLocationContainer>
              <span>현재 위치로 설정</span>
              <span class="material-symbols-outlined icon">my_location</span>
            </SearchLocationContainer>
          )}
        </DoorMain>
        <DoorHandle loc={"right"}></DoorHandle>
      </DoorStyled>
    </>
  );
}

export default Door;

const DoorStyled = styled.div<{ loc: string }>`
  display: flex;
  flex: 1;
  flex-direction: ${(props) => (props.loc === "right" ? "row" : "row-reverse")};
  margin-${(props) => props.loc}: 10px;
  width: 100%;
  height: 100%;
  // margin-top : 200px;
  // & > DoorStyled {
  // }
`;

const DoorMain = styled.div`
  margin-top: 180px;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;

  & > img {
    margin-top: 55px;
    margin-bottom: 140px;
  }

  & > span {
    text-align: center;
    font-size: 96px;
    font-weight: 700;
    line-height: normal;
  }
`;

const RecommendList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBarContainer = styled.div`
  & > input {
    border-color: #fff;
    color: #fff;
    border-width: 0 0 1px;
    background-color: #cf4c23;
  }
  margin-bottom: 30px;
`;

const SearchLocationContainer = styled.div`
  color: #fff;
  display: flex;
`;
