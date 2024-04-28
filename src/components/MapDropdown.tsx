import { foodKind } from "@/constants/type";
import { useState } from "react";
import styled from "styled-components";
import DropdownIcon from "../ui/icon/dropdown-icon";

const MapDropdown = () => {
  const [dropdownState, setDropdownState] = useState({
    isVisible: false,
    isFocused: false,
    isIconRotated: false,
  });

  const toggleDropdown = () => {
    setDropdownState((prevState) => ({
      ...prevState,
      isVisible: !prevState.isVisible,
      isIconRotated: !prevState.isIconRotated,
    }));
  };
  const onClick = () => {
    console.log("clicked");
  };

  return (
    <DropdownContainer onClick={toggleDropdown}>
      Category
      <DropdownIcon onClick={onClick} />
      {dropdownState.isVisible && (
        <AnimatedDropdownOptions>
          {foodKind.map((kind, index) => (
            <li key={index}>{kind}</li>
          ))}
        </AnimatedDropdownOptions>
      )}
    </DropdownContainer>
  );
};

export default MapDropdown;

const DropdownContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const AnimatedDropdownOptions = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
  z-index: 1000;
`;
