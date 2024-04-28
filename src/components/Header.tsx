"use client";

import styled from "styled-components";
import SearchBar from "@/ui/SearchBar";
import PigFaceIcon from "@/ui/icon/pig-face-icon";
import ListIcon from "@/ui/icon/list-icon";
import { useRecoilState } from "recoil";
import { searchAddressState, searchClickState } from "@/recoil/atoms";
import { useState } from "react";
import RandomIcon from "@/ui/icon/random-icon";
import ShopIcon from "@/ui/icon/shop-icon";
import { useRouter } from "next/navigation";
import useMenu from "@/hooks/useMenu";
import Modals from "./modal/Modals";

function HeaderNav() {
  const [isSearchClick, setIsSearchClick] = useRecoilState(searchClickState);
  const [searchAddress, setSearchAddress] = useRecoilState(searchAddressState);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { toggleLeftNav } = useMenu();
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(event.target.value);
  };

  const onClickLogo = () => {
    toggleLeftNav();
  };

  const handleSearchClick = async () => {
    setIsSearchClick(!isSearchClick);
  };

  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const moveBasket = () => {
    router.push("/Basket");
  };

  return (
    <>
      <HeaderStyled>
        <NavIconContainer>
          <ListIcon openLeftNav={onClickLogo} />
          <ShopIcon moveBasket={moveBasket} />
          <RandomIcon openModal={openModal} />
          {isOpenModal ? <Modals /> : null}
        </NavIconContainer>

        <HeaderIconStyled>
          <PigFaceIcon />
        </HeaderIconStyled>

        <SearchStyled>
          <SearchBar
            handleInputChange={handleInputChange}
            handleSearchClick={handleSearchClick}
            searchAddress={searchAddress}
          />
        </SearchStyled>
      </HeaderStyled>
    </>
  );
}

export default HeaderNav;

const HeaderStyled = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  height: 100px;
  width: 100%;
  background-color: #ffb9b4;
  top: 0;
  z-index: 3;
`;

const NavIconContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;

  & > div {
    margin-right: 40px;
  }
`;
const HeaderIconStyled = styled.div`
  flex: 1;
`;

const SearchStyled = styled.div`
  width: 400px;
`;
