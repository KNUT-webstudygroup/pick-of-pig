import styled, { createGlobalStyle } from 'styled-components';
// import MapNode from "@/service/MapObject/MapNode";
import MapNode from '@/service/MapObject/MapNode';
import { useRef, useState, useEffect } from 'react';
import MapNodeCard from '@/ui/MapNodeCard';
import searchNearbyPlace from '@/service/search';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  searchAddressState, searchClickState, useSsrComplectedState, ssrCompletedState, mapState,
} from '@/recoil/atoms';

function LeftNavContainer({ isLeftNavOpen }: { isLeftNavOpen: boolean }) {
  const [searchMapNodes, setSearchMapNodes] = useState<MapNode[]>([]);
  const map = useRecoilValue(mapState);
  const searchAddress = useRecoilValue(searchAddressState);
  const isSearchClick = useRecoilValue(searchClickState);
  const checkSSREnd = useSsrComplectedState();
  const SSREnded = useRecoilValue(ssrCompletedState);
  useEffect(() => {
    if (SSREnded === false) {
      checkSSREnd();
    } else {
      const handleSearchClick = async () => {
        const sortedMapNodes: MapNode[] = await searchNearbyPlace(searchAddress, map);
        setSearchMapNodes(sortedMapNodes);
      };
      handleSearchClick();
    }
  }, [isSearchClick]);

  return (
    <>
      <GlobalStyle />
      <LeftNavStyled isLeftNavOpen={isLeftNavOpen}>
        {searchMapNodes.map((node, i) => (
          <MapNodeCard key={node.id} index={i + 1} node={node} />
        ))}
      </LeftNavStyled>
    </>
  );
}

export default LeftNavContainer;

const TitleStyled = styled.div`
  align-self: start;
  color: #4b3f4e;
  font-size: 20px;
  font-weight: 600;
  padding: 12px 0px 12px 16px;
`;

const LeftNavStyled = styled.div<{ isLeftNavOpen: boolean }>`
  position: fixed;
  top: 120px;
  left: ${(props) => (props.isLeftNavOpen ? '-20px' : '-300px')}; /* 변경된 부분 */
  display: flex;
  flex-direction: column;
  align-items: center;
  //background-color: #ffb9b4;
  width: 300px;
  height: calc(100% - 100px);
  overflow-y: auto;
  transition: left 0.3s ease-in-out;
  z-index: 1;
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    src: url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.eot);
    font-family: 'Nanum Gothic', serif;
  }
  ::-webkit-scrollbar {
  display: none;
}
`;
