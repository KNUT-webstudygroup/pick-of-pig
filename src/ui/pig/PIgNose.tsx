import styled from "styled-components";

import IconContainer from "@/ui/icon/icon.container";
import { useState } from "react";

export default function PigNose() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);

    window.scrollTo({
      top: window.innerHeight, // 현재 화면 높이만큼 스크롤
      behavior: "smooth", // 부드러운 스크롤
    });
  };

  return (
    <PigNoseStyled onClick={handleClick}>
      <Nostril />
      <Nostril left="70%" />
    </PigNoseStyled>
  );
}

const PigNoseStyled = styled.div`
  position: relative;
  width: 400px;
  height: 200px;
  background-color: var(--pig-color);
  border-radius: 117px;
  cursor: pointer;
  box-shadow: 0 20px 0 0 #e37d82;

  margin-top: 120px;

  @media screen and (max-width: 1450px) {
    margin-top: 80px;
    width: 300px;
    height: 150px;
  }

  @media screen and (max-width: 800px) {
    margin-top: 50px;
    width: 200px;
    height: 100px;
  }
`;

const Nostril = styled.div`
  @media screen and (max-width: 1450px) {
    width: 50px;
    height: 50px;
  }
  @media screen and (max-width: 800px) {
    width: 35px;
    height: 35px;
  }
  width: 70px;
  height: 70px;
  background-color: #4b3f4e; /* 콧구멍 색상 설정 (필요에 따라 수정 가능) */
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: ${(props) => props.left || "30%"};
  transform: translate(-50%, -50%);
`;
