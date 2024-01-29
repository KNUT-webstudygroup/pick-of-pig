"use client";
import PigNose from "@/ui/pig/PIgNose";
import Image from "next/image";
import styled, { css } from "styled-components";

function PigEars() {
  // // preserveAspectRatio 속성이 비율을 맞춰줌 -> 즉 width나 height 둘 중에 하나만 고치면 됨

  // svg를 감싸고 있는 Div의 비율에 따라 크기 변경 !
  const imageStyle = {
    width: "100%",
    height: "100%",
    // preserveAspectRatio: "none",zx
  };
  return (
    <PigEarsContainer>
      <img src="/pig-left-ear.svg" style={imageStyle} />
      <img src="/pig-right-ear.svg" style={imageStyle} />
    </PigEarsContainer>
  );
  // div 로 그림 그리기
  // return (
  //   <PigEarContainer>
  //     <PigEar></PigEar>
  //     <PigEar></PigEar>
  //   </PigEarContainer>
  // );
}

//  w -> 300, h -> 225

// html로 그림 그리기
// const PigEarContainer = styled.div`
//   display: flex;
//   // justify-content: fle;
// `;

// const PigEar = styled.div`
//   margin-left: 30px;
//   width: 300px;
//   height: 225px;
//   // border-radius: 40px 80px / 80px 40px;
//   border-radius: 250px 50px 60px 80px / 200px 60px 60px 10px;
//   background-color: var(--pig-color);
// `;

// 기존 SVG 파일 다루기

const PigEarsContainer = styled.div`
  display: flex;
  justify-content: center;
  // align-items: center;
  width: 100%;
  // width: 250px;

  & > img {
    margin-left: 450px;
    margin-right: 450px;
  }
`;

const PigEarContainer = styled.div<{ left: any }>`
  display: flex;
  justify-content: ${(props) => (props.left ? "flex-end" : "")};
  // width: 1480px;
  // height: 100%;
`;

export default PigEars;
