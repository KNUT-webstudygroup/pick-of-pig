import PigNose from "@/ui/pig-nose";
import styled, { css } from "styled-components";

function PigFace() {
  return (
    <PigFaceStyled>
      <PigEyesContainer>
        <PigEyes></PigEyes>
        <PigEyes left="70%"></PigEyes>
      </PigEyesContainer>
      <PigNose />
    </PigFaceStyled>
  );
}

export default PigFace;

const PigFaceStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* 100vw 가 아니라 body의 100%로. */
`;

const PigEyesContainer = styled.div`
  width: 1000px;
  height: 100px;
  border-radius: 117px;
  position: relative;
  cursor: pointer;
`;

const PigEyes = styled.div`
  width: 40px;
  height: 40px;
  background-color: #000; /* 콧구멍 색상 설정 (필요에 따라 수정 가능) */
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: ${(props) => props.left || "30%"};
  transform: translate(-50%, -50%);
`;
