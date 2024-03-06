import styled, { createGlobalStyle } from 'styled-components';
import MapNode from '@/service/MapObject/MapNode';

import { useRef, useState, useEffect } from 'react';

import MapNodeCard from '@/ui/MapNodeCard';
import DeleteIcon from '@/ui/icon/delete-icon';
import { useRecoilValue } from 'recoil';
import { categoryList, optionList } from '@/recoil/atoms';
import ListModal from './ListModal';
// import { categoryLists } from "@/ui/CategoryBtn";

// 2번쨰 버전
function LeftNav({
  mapNodes,
  isOpen,
}: {
  mapNodes: Array<MapNode>;
  isOpen: boolean;
}) {
  const categoryLists = useRecoilValue(categoryList);
  const optionLists = useRecoilValue(optionList);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* <GlobalStyle /> */}
      <DrawerContainer isOpen={isOpen}>
        <DrawerColumn>
          <RecommendText>category</RecommendText>
          <AddList onClick={openModal}> 더보기</AddList>
          {isModalOpen ? <ListModal closeModal={closeModal} /> : null}
        </DrawerColumn>

        <SearchComponentContainer id="searchComponent">
          {categoryLists.map((it) => (
            <SearchComponentStyled key={it}>
              <div>{it}</div>
              <DeleteIcon />
            </SearchComponentStyled>
          ))}
        </SearchComponentContainer>

        <DrawerColumn>
          <RecommendText>options</RecommendText>
          <AddList onClick={openModal}> 더보기</AddList>
        </DrawerColumn>
        <SearchComponentContainer id="searchComponent">
          {optionLists.map((it) => (
            <SearchComponentStyled key={it}>
              <div>{it}</div>
              <DeleteIcon />
            </SearchComponentStyled>
          ))}
        </SearchComponentContainer>
      </DrawerContainer>
    </>
  );
}

export default LeftNav;

const AddList = styled.div`
  //   align-self: start;
  padding: 12px 0px 12px 16px;
`;

const DrawerColumn = styled.div`
  align-self: start;
  display: flex;
  align-items: center;
`;

const DrawerContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 120px;
  left: ${({ isOpen }) => (isOpen ? '0px' : '-270px')}; /* 변경된 부분 */

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ff9a9f;

  width: 250px;
  height: calc(100% - 120px);
  overflow-y: auto;
  transition: left 0.5s ease-in-out;
`;

const RecommendText = styled.div`
  //   align-self: start;
  color: #4b3f4e;
  font-size: 20px;
  font-weight: 600;
  padding: 12px 0px 12px 16px;
`;

const SearchComponentContainer = styled.div`
  margin-top: 10px;
  width: 90%;
  height: 150px;
  display: flex;
  //   flex-direction: column;
  //   justify-content: flex-start;
  //   align-items: flex-start;
  flex-wrap: wrap;
  overflow-x: hidden;
`;

const SearchComponentStyled = styled.div`
  min-width: 90px;
  max-width: 230px;
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
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  overflow: hidden; /* 넘치는 부분 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 대한 대체 문자(...) 표시 */
  flex-shrink: 0;
`;
