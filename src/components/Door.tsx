import DoorHandle from "@/ui/DoorHandle";
import { useState } from "react";
// import "./Door.css";
// import DoorHandle from "@/ui/DoorHandle";
import styled from "styled-components";

function Door({ title, loc }: { title: string; loc: boolean }) {
  return (
    <>
      <DoorStyled>
        <DoorMain>
          <span>{title}</span>
          {loc === true ? (
            <img src="/src/assets/meal.svg"></img>
          ) : (
            <img src="/src/assets/pig.svg"></img>
          )}
          <SearchBarContainer>
            <input placeholder="메뉴를 입력하세요" className="search_input" />
            <span class="material-symbols-outlined icon">search</span>
          </SearchBarContainer>
          {loc === true ? (
            <RecommendList>
              <span>1. 라면</span>
              <span>2. 칼국수</span>
              <span>3. 김치찌개</span>
            </RecommendList>
          ) : (
            <SearchLocationContainer>
              <div className="location">현재 위치로 설정</div>
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

const DoorMain = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > img {
    margin-top: 55px;
    margin-bottom: 140px;
  }

  & > span {
    color: #fff;
    text-align: center;
    font-family: Inter;
    font-size: 96px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const RecommendList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchLocationContainer = styled.div`
  color: #fff;
  display: flex;
`;

const SearchBarContainer = styled.div`
  & > input {
    border-color: #fff;
    color: #fff;
    border-width: 0 0 1px;
    background-color: #cf4c23;
  }
`;

const DoorStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
