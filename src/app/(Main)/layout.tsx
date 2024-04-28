"use client";

import styled from "styled-components";
import HeaderNav from "@/components/Header";
import LeftNav from "@/components/LeftNav";
import RightNav from "../../components/RightNav";

// layout, modal, header, leftnav 기능 구현
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    // Header, Left nav정하고 들어가기
    //  장바구니도 들어가야함
    <>
      <HeaderNav />
      <LeftNav />
      <RightNav />
      <MainContentStyled>{children}</MainContentStyled>
    </>
  );
}

export default MainLayout;

// 지도비율과 basket비율 어떻게 할지..
const MainContentStyled = styled.div``;
