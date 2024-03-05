"use client";

import styled from "styled-components";
import SearchBar from "@/ui/SearchBar";
import DeleteIcon from "@/ui/icon/delete-icon";
import PigFaceIcon from "@/ui/icon/pig-face-icon";
import ListIcon from "@/ui/icon/list-icon";
import { useRecoilValue } from "recoil";
import { categoryList, optionList } from "@/recoil/atoms";
import { useState } from "react";
import MapNode from "@/service/MapObject/MapNode";
import searchNearbyPlace from "@/service/search";
import Drawer from "@/ui/drawer";

function HeaderNav() {
  const categoryLists = useRecoilValue(categoryList);
  const [searchAddress, setSearchAddress] = useState("");
  const [searchMapNodes, setSearchMapNodes] = useState<MapNode[]>([]);
  const optionLists = useRecoilValue(optionList);
  const [isOpen, setIsOpen] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(event.target.value);
  };

  const handleSearchClick = async () => {
    const sortedMapNodes: MapNode[] = await searchNearbyPlace(searchAddress);
    setSearchMapNodes(sortedMapNodes);
  };

  const openLeftNav = () => {
    setIsOpen(!isOpen);
  };

  // const container = document.getElementById("searchComponent");

  // // 요소의 가로 스크롤이 가능한지 여부를 확인합니다.
  // const isOverflowXHidden = container.scrollWidth > container.clientWidth;

  // // 가로 스크롤이 가능한지 여부를 확인합니다.
  // if (isOverflowXHidden) {
  //   console.log("가로 스크롤이 가능합니다.");
  // } else {
  //   console.log("가로 스크롤이 숨겨져 있습니다.");
  // }

  return (
    <MapNavBar>
      <NavIconContainer>
        <ListIcon openLeftNav={openLeftNav} />
      </NavIconContainer>

      <MainIconContainer>
        <PigFaceIcon />
      </MainIconContainer>

      <SearchContainer>
        <SearchBar
          handleInputChange={handleInputChange}
          handleSearchClick={handleSearchClick}
          searchAddress={searchAddress}
        />

        <SearchComponentContainer id="searchComponent">
          {categoryLists.map((it, index) => (
            <SearchComponentStyled key={index}>
              <div>{it}</div>
              <DeleteIcon />
            </SearchComponentStyled>
          ))}
        </SearchComponentContainer>
      </SearchContainer>

      <Drawer mapNodes={searchMapNodes} isOpen={isOpen} />
    </MapNavBar>
  );
}

export default HeaderNav;

const MapNavBar = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;

  padding: 0 30px;

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

const SearchContainer = styled.div`
  width: 400px;
`;

const SearchComponentContainer = styled.div`
  margin-top: 10px;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  overflow-x: hidden;
`;

const SearchComponentStyled = styled.div`
  width: 90px;
  height: 35px;
  background-color: #ffe3e1;
  color: #4b3f4e;
  font-size: 1rem;
  border-radius: 20px;

  white-space: nowrap;

  padding: 0 12px;
  display: flex;
  left: 10px;
  margin-right: 20px;
  justify-content: space-between;
  align-items: center;
  // overflow: hidden; /* 넘치는 부분 숨김 */
  // text-overflow: ellipsis; /* 넘치는 텍스트에 대한 대체 문자(...) 표시 */
  flex-shrink: 0;
`;
