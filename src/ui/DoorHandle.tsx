import { useState } from "react";
import styled from "styled-components";

function DoorHandle({ loc: string }) {
  return <DoorHandleStyled></DoorHandleStyled>;
}

const DoorHandleStyled = styled.button`
  width: 12px;
  height: 278px;
  border-radius: 10px;
  background: #d9d9d9;
  box-shadow: 10px 10px 40px #00000040;
`;

export default DoorHandle;
