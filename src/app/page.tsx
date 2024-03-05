"use client";

import MainPage from "@/components/MainPage";
import MainSelectPage from "@/components/MainSelectPage";
import GlobalStyle from "@/ui/GlobalStyle";
import { RecoilRoot } from "recoil";

function Home() {
  console.log(score); // undeFined

  score = 80; // 값의 할당
  var score; // 변수선언

  console.log(score); // ??
  return (
    <>
      <MainPage />
      <MainSelectPage />
    </>
  );
}

export default Home;
