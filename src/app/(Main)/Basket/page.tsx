"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";

function Basket() {
  return (
    <ContainerStyled>
      <div>장바구니 페이지</div>
    </ContainerStyled>
  );
}

export default Basket;

const ContainerStyled = styled.div`
  position: absolute;
  top: 105px;
  left: 300px;
  background-color: #ffb9b4;

  width: calc(100% - 300px);
  height: calc(100% - 105px);
`;
