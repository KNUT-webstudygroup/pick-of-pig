import styled from "styled-components";
import { categoryLists } from "../ui/CategoryBtn";
import { foods } from "@/ui/OptionsBtns";
import MapDropdown from "./MapDropdown";

function MapToogle() {
  // const selectCategory = categoryLists;
  // const selectOption = foods;

  return (
    <MapToogleStyled className="app">
      <MapDropdown />
    </MapToogleStyled>
  );
}

export default MapToogle;

const MapToogleStyled = styled.div`
  z-index: 5;
  width: 240px;
  height: 50px;
  background-color: #ffb9b4;

  border-radius: 10px;

  margin-top: 10px;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // position: fixed;
  // top: 400px;
  // right: 10px;
`;

// const DropdownStyled = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: var(--white);
//   border: none;
//   resize: none;
//   outline: none;
//   /* cursor: pointer; */
// `;
