import { useState } from "react";
import styled from "styled-components";
import Door from "@/components/Door";
import Map from "@/Map";
import { Outlet } from "react-router-dom";
import MainPage from "./MainPage";

function Layout() {
  return (
    <>
      <Main>
        <MainPage></MainPage>
        {/* <HalfDoor loc="left"></HalfDoor>
        <HalfDoor loc="right"></HalfDoor> */}
        {/* <Door title="오늘 뭐먹지 ?" loc="left"></Door>
        <Door title="어디서 먹지 ?" loc="right"></Door> */}
      </Main>
      <Map />
      {/* <Outlet></Outlet> */}
    </>
  );
}

export default Layout;

const Main = styled.div`
  position: absoulte;
  background-color: #333;
  display: flex;
`;
