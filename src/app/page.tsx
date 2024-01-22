"use client";

import { useEffect } from "react";
import Door from "@/components/Door";
import styled, { css } from "styled-components";
import Map from "./Map/page";
import PigIcon from "@/ui/icon/pig-icon";
import PigNose from "@/ui/pig-nose";
import MainPage from "@/components/MainPage";
import MainSelectPage from "@/components/MainSelectPage";

function Home() {
  return (
    <>
      <MainPage></MainPage>
      <MainSelectPage></MainSelectPage>
    </>
  );
}

export default Home;
