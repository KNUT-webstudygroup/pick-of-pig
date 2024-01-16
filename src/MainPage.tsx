import { useState } from "react";
import styled from "styled-components";
import Door from "@/components/Door";
import Map from "@/Map";
import { Outlet } from "react-router-dom";
import HalfDoor from "./components/HalfDoor";

function MainPage() {
  return (
    <>
      <Door title="오늘 뭐먹지 ?" loc="left"></Door>
      <Door title="어디서 먹지 ?" loc="right"></Door>
      {/* <HalfDoor loc="left"></HalfDoor>
      <HalfDoor loc="right"></HalfDoor> */}
    </>
  );
}

export default MainPage;
