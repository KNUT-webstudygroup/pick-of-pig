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
  width: 300px;
  height: 180px;
  background-color: var(--pig-color);
  border-radius: 117px;
  position: relative;
  cursor: pointer;
`;

const Nostril = styled.div`
  width: 40px;
  height: 40px;
  background-color: #000; /* 콧구멍 색상 설정 (필요에 따라 수정 가능) */
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: ${(props) => props.left || "30%"};
  transform: translate(-50%, -50%);
`;
