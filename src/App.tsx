import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
// import Home from "./Home";

import Door from "./components/Door";

function App() {
  return (
    <>
      <Main>
        <Door title="오늘 뭐먹지 ?" loc={true}></Door>
        <Door title="어디서 먹지 ?" loc={false}></Door>
      </Main>
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
