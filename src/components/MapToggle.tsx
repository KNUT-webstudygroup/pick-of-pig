import styled from "styled-components";
import { foodKind, foodOption } from "@/constants/type";
import { useEffect, useState } from "react";
import DropdownIcon from "../ui/icon/dropdown-icon";

function MapToogle({
  toggleType,
  isActive,
  onToggle,
}: {
  toggleType: string;
  isActive: boolean;
  onToggle: () => void;
}) {
  const displayItems = toggleType === "category" ? foodKind : foodOption;
  // const [dropdownHeight, setDropdownHeight] = useState<boolean>();
  const onClick = () => {
    console.log("clicked");
  };

  // if (toggleType == "option" && isActive) {
  //   setDropdownHeight(true);
  // } else {
  //   setDropdownHeight(false);
  // }
  // useEffect(() => {
  //   if (isActive) {
  //     // 예를 들어, 드롭다운 옵션의 개수에 따라 높이 조정
  //     const newHeight = displayItems.length * 35; // 각 옵션의 높이 가정
  //     onToggle(newHeight);
  //   }
  // }, [isActive, displayItems, onToggle]);

  return (
    <ToggleStyled className="app">
      <DropdownStyled onClick={onToggle}>
        <span>{toggleType}</span>
        <DropdownIcon onClick={onClick} />
        {isActive && (
          <DropdownOptionsStyled>
            {displayItems.map((kind, index) => (
              <DropdownOptionStyled key={index}>{kind}</DropdownOptionStyled>
            ))}
          </DropdownOptionsStyled>
        )}
      </DropdownStyled>
    </ToggleStyled>
  );
}

export default MapToogle;

const ToggleStyled = styled.div<{ isActive: boolean }>`
  z-index: 5;
  width: 240px;
  height: 35px;
  background-color: #ffb9b4;

  border-radius: 10px;
  margin-top: 10px;

  transition: transform 0.3s ease-in-out; // 움직임에 대한 트랜지션 효과 추가
`;
// transform: ${({ isActive }) =>
//   isActive ? "translateY(0)" : "translateY(100%)"};

const DropdownStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 100%;
  width: 100%;

  cursor: pointer;
  & > span {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const DropdownOptionsStyled = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // opacity: 0;
  background-color: rgba(255, 255, 255, 0);
`;

const DropdownOptionStyled = styled.li`
  background-color: #ffb9b4;
  margin-top: 3px;
  font-size: 1rem;
  font-weight: 600;
  width: 90%;
  height: 30px;
  opacity: 1;

  display: flex;
  justify-content: flex-start;
  padding-left: 30px;
  
  align-items: center;
  border-radius: 10px;

  white-space: nowrap;
  text-overflow: ellipsis; 
  // word-break: break-all;
  overflow: hidden;
}
`;
