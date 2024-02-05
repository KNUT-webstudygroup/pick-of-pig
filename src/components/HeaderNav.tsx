"use client";

import styled from "styled-components";
import SearchBar from "@/ui/SearchBar";
import DeleteIcon from "@/ui/icon/delete-icon";
import PigFaceIcon from "@/ui/icon/pig-face-icon";
import ListIcon from "@/ui/icon/list-icon";

function HeaderNav() {
  return (
    <MapNavBar>
      <NavIconContainer>
        <ListIcon />
      </NavIconContainer>

      <MainIconContainer>
        <PigFaceIcon />
      </MainIconContainer>

      <SearchContainer>
        <SearchBar />

        <SearchComponents>
          <SearchComponent>
            <p>한식</p>
          </SearchComponent>
          <DeleteIcon />
        </SearchComponents>
      </SearchContainer>
    </MapNavBar>
  );
}

export default HeaderNav;

const MapNavBar = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;

  padding: 0 50px;

  height: 120px;
  width: 100%;
  background-color: #ffb9b4;
  top: 0;
  z-index: 1;
`;

const NavIconContainer = styled.div`
  flex: 1;
`;
const MainIconContainer = styled.div`
  flex: 1;
`;

const SearchContainer = styled.div``;

const SearchComponents = styled.div`
  margin-top: 15px;
  flex: 1;
  display: flex;
  position: relative;

  & > div:nth-child(2) {
    position: absolute;
    left: 70px;
    top: 3px;
  }
`;

const SearchComponent = styled.div`
  width: 110px;
  height: 40px;
  background-color: #ffe3e1;
  color: #4b3f4e;
  font-size: 1.5rem;
  border-radius: 20px;

  display: flex;
  left: 10px;
  padding-right: 20px;
  justify-content: center;
  align-items: center;
`;
