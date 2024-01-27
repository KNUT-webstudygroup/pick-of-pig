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
    <PigNoseStyled>
      <PigNoseMain onClick={handleClick}>
        <Nostril />
        <Nostril left="70%" />
      </PigNoseMain>
      <PigNoseShadow></PigNoseShadow>
    </PigNoseStyled>
  );
}

const PigNoseStyled = styled.div`
  position: relative;
  background-color: gray;
  // 왜 width: 400px; 한 만큼 가운데서 왼쪽으로 이동하지?
  width: 400px;
`;

const PigNoseMain = styled.div`
  width: 400px;
  height: 200px;
  background-color: var(--pig-color);
  border-radius: 117px;
  cursor: pointer;
  position: absolute;
  z-index: 1;
`;

const PigNoseShadow = styled.div`
  z-index: 0;
  width: 400px;
  height: 200px;
  background-color: var(--pig-shadow-color);
  border-radius: 117px;
  top: 20px;
  position: absolute;
  cursor: pointer;
`;

const Nostril = styled.div`
  width: 70px;
  height: 70px;
  background-color: #4b3f4e; /* 콧구멍 색상 설정 (필요에 따라 수정 가능) */
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: ${(props) => props.left || "30%"};
  transform: translate(-50%, -50%);
`;
