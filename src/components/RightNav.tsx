import LocationDisplay from "@/ui/LocationDisplay";
import { useState } from "react";
import styled from "styled-components";
import MapToggle from "./MapToggle";

const RightNav = () => {
  const [activeDropdown, setActiveDropdown] = useState("none");
  // const [dropdownHeight, setDropdownHeight] = useState(0);

  const handleToggleDropdown = (toggleType: string) => {
    if (activeDropdown === toggleType) {
      setActiveDropdown("none");
    } else {
      setActiveDropdown(toggleType);
    }
  };
  return (
    <LeftNavStyled id="rightNav">
      <LocationDisplay />
      <MapToggle
        toggleType="category"
        isActive={activeDropdown === "category"}
        onToggle={() => handleToggleDropdown("category")}
      />
      <MapToggle
        toggleType="option"
        isActive={activeDropdown === "option"}
        onToggle={() => handleToggleDropdown("option")}
      />
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
