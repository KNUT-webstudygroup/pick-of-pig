import { useState } from "react";
import styled from "styled-components";
import "./Home.css";

function Home() {
  return (
    <>
      <Container className="main">
        <div className="section">
          <p>오늘 뭐먹지?</p>
          <img src="/src/assets/pig.svg"></img>
          <div className="search_container">
            <input placeholder="메뉴를 입력하세요" className="search_input" />
            <span class="material-symbols-outlined icon">search</span>
            <div className="ex_recommend">
              <span>1. 라면</span>
              <span>2. 칼국수</span>
              <span>3. 김치찌개</span>
            </div>
          </div>
        </div>

        <div className="section">
          <p>어디서 먹지?</p>
          <img src="/src/assets/meal.svg"></img>
          <div className="search_container">
            <input placeholder="메뉴를 입력하세요" className="search_input" />
            <span class="material-symbols-outlined icon">search</span>
            <div className="location">현재 위치로 설정</div>
            <span class="material-symbols-outlined icon">my_location</span>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;

const Container = styled.div``;
