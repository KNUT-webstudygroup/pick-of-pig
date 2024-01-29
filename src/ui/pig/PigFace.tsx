import PigNose from "@/ui/pig/PIgNose";
import styled, { css } from "styled-components";
import PigEars from "./PigEars";
import PigEyes from "./PigEyes";

function PigFace() {
  return (
    <PigFaceStyled>
      <PigEars />
      <PigEyes />
      <PigNose />
    </PigFaceStyled>
  );
}

export default PigFace;

const PigFaceStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;s
  width: 100%; /* 100vw 가 아니라 body의 100%로. */

  // height: 100 vh;

  // position: relative;
  // background-color: blue;
`;
