import LocationDisplay from "@/ui/LocationDisplay";
import styled, { createGlobalStyle } from "styled-components";
import MapToogle from "./MapToogle";

const RightNav = () => {
  return (
    <LeftNavStyled id="rightNav">
      <LocationDisplay />
      <MapToogle kindToggle="category" />
    </LeftNavStyled>
  );
};

const LeftNavStyled = styled.div`
  position: fixed;
  padding-top: 20px;
  top: 100px;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: calc(100% - 100px);
  overflow-y: auto;
  z-index: 1;
  // background-color: #ff9a9f;
  //  나중에 사라지는 애니메이션 넣고 싶을때
  //   transform: translateX(0%);
  //   transition: transform 0.3s ease-in-out;
`;

export default RightNav;
