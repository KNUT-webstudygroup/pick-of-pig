import { useState } from "react";
import styled from "styled-components";

function DoorHandle({ loc: string }) {
  return <DoorHandleStyled></DoorHandleStyled>;
}

const DoorHandleStyled = styled.div`
  width: 12px;
  height: 278px;
  border-radius: 10px;
  background: #d9d9d9;
`;

export default DoorHandle;
