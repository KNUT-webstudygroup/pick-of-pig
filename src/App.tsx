import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
// import Home from "./Home";

import Door from "./components/Door";
import Map from "./Map";

function App() {
  return (
    <>
      <Main>
        <Door title="오늘 뭐먹지 ?" loc="right"></Door>
        <Door title="어디서 먹지 ?" loc="left"></Door>
      </Main>
      {/* <Map /> */}
    </>
  );
}

export default App;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #cf4c23;
  display: flex;
`;
