'use client';

import styled from 'styled-components';
import SearchBar from '@/ui/SearchBar';
import DeleteIcon from '@/ui/icon/delete-icon';
import PigFaceIcon from '@/ui/icon/pig-face-icon';
import ListIcon from '@/ui/icon/list-icon';
import { useRecoilValue } from 'recoil';
import { categoryList, optionList } from '@/recoil/atoms';
import { useState } from 'react';
import MapNode from '@/service/MapObject/MapNode';
import searchNearbyPlace from '@/service/search';
import Drawer from '@/ui/drawer';
import RandomIcon from '@/ui/icon/random-icon';
import ListModal from './ListModal';
import RandomModal from './RandomModal';

function HeaderNav() {
  const categoryLists = useRecoilValue(categoryList);
  const [searchAddress, setSearchAddress] = useState('');
  // 전역변수로 만들고 싶네
  const [searchMapNodes, setSearchMapNodes] = useState<MapNode[]>([]);
  const optionLists = useRecoilValue(optionList);
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRandomModal, setIsRandomModal] = useState(false);

  const openModal = (name: string) => {
    {
      name === 'LeftNav' ? setIsModalOpen(true) : setIsRandomModal(true);
    }
  };
  const closeModal = (name: string) => {
    {
      name == 'LeftNav' ? setIsModalOpen(false) : setIsRandomModal(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(event.target.value);
  };

  // export 하고
  const handleSearchClick = async () => {
    const sortedMapNodes: MapNode[] = await searchNearbyPlace(searchAddress);
    setSearchMapNodes(sortedMapNodes);
  };

  const openLeftNav = () => {
    setIsLeftNavOpen(!isLeftNavOpen);
  };

  const openRandom = () => {
    setIsRandomModal(!isRandomModal);
  };

  return (
    <MapNavBar>
      <NavIconContainer>
        <ListIcon openLeftNav={openLeftNav} />
        <RandomIcon openRandom={openRandom} />
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
          {categoryLists.slice(0, 3).map((it, index) => (
            <SearchComponentStyled key={index}>
              <div>{it}</div>
              <DeleteIcon />
            </SearchComponentStyled>
          ))}
          <MoreCategory onClick={() => openModal('LeftNav')}>
            더보기
          </MoreCategory>
        </SearchComponentContainer>
      </SearchContainer>

      <Drawer mapNodes={searchMapNodes} isLeftNavOpen={isLeftNavOpen} />
      {isModalOpen ? (
        <ListModal closeModal={() => closeModal('LeftNav')} />
      ) : null}
      {isRandomModal ? (
        <RandomModal closeModal={() => closeModal('Random')} />
      ) : null}
    </MapNavBar>
  );
}

export default HeaderNav;

const MoreCategory = styled.div``;

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
  display: flex;
  flex: 1;

  & > div {
    margin-right: 13px;
  }
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
