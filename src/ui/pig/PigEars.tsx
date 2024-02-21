"use client";
import PigNose from "@/ui/pig/PIgNose";
import Image from "next/image";
import styled, { css } from "styled-components";
import { imageStyle } from "../Card";
import { ReactComponent as PigLeftEar } from "/pig-left-ear.svg";

function PigEars() {
  // // preserveAspectRatio 속성이 비율을 맞춰줌 -> 즉 width나 height 둘 중에 하나만 고치면 됨

  // svg를 감싸고 있는 Div의 비율에 따라 크기 변경 !
  // const imageStyle = {
  //   width: "100%",
  //   height: "100%",
  //   // viewBox: "0 0 100 100",
  //   // preserveAspectRatio: "none"
  // };
  return (
    <PigEarsContainer>
      <IconContainer>
        <img src="/pig-left-ear.svg" style={imageStyle} />
      </IconContainer>
      {/* <EarsInterval></EarsInterval> */}
      <IconContainer>
        <img src="/pig-right-ear.svg" style={imageStyle} />
      </IconContainer>
    </PigEarsContainer>
  );
}
const IconContainer = styled.div`
  display: flex;

  width: 250px;
  @media screen and (max-width: 1450px) {
    width: 150px;
  }
  @media screen and (max-width: 800px) {
    width: 100px;
  }
`;

const PigEarsContainer = styled.div`
  display: flex;
  justify-content: space-around;

  @media screen and (min-width: 2100px) {
    width: 2100px;
  }
  width: 100%;
`;

// const PigEarContainer = styled.div<{ left: any }>`
//   display: flex;
//   justify-content: ${(props) => (props.left ? "flex-end" : "")};
// `;

export default PigEars;
