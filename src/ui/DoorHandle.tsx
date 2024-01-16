import { useState } from "react";
import styled from "styled-components";

function DoorHandle({ loc: string }) {
  return <DoorHandleStyled></DoorHandleStyled>;
}
// TODO : 문이 사라지는건 아마 Apple safari 구현 방식에서, display:none로 뱌ㅏ귀어서 그럴 수 있어보인다.
// 이건 좀 더 지켜보자... 
const DoorHandleStyled = styled.button`
  width: 12px;
  height: 278px;
  border-radius: 10px;
  background: #d9d9d9;
  box-shadow: 10px 10px 40px #00000040;
  position:fixed;
  top:calc(50vh - 139px); /*대문 버튼 중앙으로*/
`;

export default DoorHandle;
