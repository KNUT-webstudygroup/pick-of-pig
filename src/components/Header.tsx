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
import { ModalType } from "./modal/modal.data";
import { useRouter } from "next/navigation";

function HeaderNav({
  openLeftNav,
  openRandom,
  isOpenModal,
  openModal,
}: {
  openLeftNav: () => void;
  openRandom: () => void;
  isOpenModal: boolean;
  openModal: () => void;
}) {
  const [isSearchClick, setIsSearchClick] = useRecoilState(searchClickState);
  const [searchAddress, setSearchAddress] = useRecoilState(searchAddressState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRandomModal, setIsRandomModal] = useState(false);
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(event.target.value);
  };

  const handleSearchClick = async () => {
    setIsSearchClick(!isSearchClick);
  };

  // 나중에 라우터 경로 모아두기
  const moveBasket = () => {
    router.push("/Basket");
  };

  return (
    <>
      <HeaderStyled>
        <NavIconContainer>
          <ListIcon openLeftNav={openLeftNav} />
          <ShopIcon moveBasket={moveBasket} />
          <RandomIcon openModal={openModal} />
          {isOpenModal ? (
            <ModalSelectContainerStyled>
              <ModalSelectStyled onClick={openRandom}>
                {ModalType.RANDOM}
              </ModalSelectStyled>
              <ModalSelectStyled>{ModalType.GHOSTLEG}</ModalSelectStyled>
              <ModalSelectStyled>{ModalType.ROULETTE}</ModalSelectStyled>
            </ModalSelectContainerStyled>
          ) : null}

          {/* */}
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
      <HeaderLineStyled></HeaderLineStyled>
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
  z-index: 1;
`;

const ModalSelectStyled = styled.div`
  background-color: #ffe3e1;
  font-weight: 700;
  color: #000;
  width: 80%;
  height: 40px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 45px;
  border-radius: 10px;
`;

const ModalSelectContainerStyled = styled.div`
  position: absolute;
  background-color: #ff9a9f;

  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 200px;
  // height: 300px;
  z-index: 7;
  left: 260px;
  top: 50px;
`;

const MoreCategory = styled.div``;

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

const HeaderLineStyled = styled.div`
  width: 100%;
  height: 5px;
  background-color: #e37d82;
  position: absolute;
  z-index: 2;
  top: 100px;
`;
