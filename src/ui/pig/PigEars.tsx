"use client";

import styled, { css } from "styled-components";
import { imageStyle } from "../Card";

function PigEars() {
  return (
    <PigEarsContainer>
      <IconContainer>
        <img src="/pig-left-ear.svg" style={imageStyle} />
      </IconContainer>
      <IconContainer>
        <img src="/pig-right-ear.svg" style={imageStyle} />
      </IconContainer>
    </PigEarsContainer>
  );
}

const PigEarsContainer = styled.div`
  display: flex;
  justify-content: space-around;

  @media screen and (min-width: 2100px) {
    width: 2100px;
  }

  width: 100%;
`;

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

export default PigEars;
