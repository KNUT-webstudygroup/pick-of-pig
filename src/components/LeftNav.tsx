import styled, { createGlobalStyle } from "styled-components";
import MapNode from "@/service/MapObject/MapNode";
import { useRef, useState, useEffect } from "react";
import MapNodeCard from "@/ui/MapNodeCard";
import searchNearbyPlace from "@/service/search";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  searchAddressState,
  searchClickState,
  useSsrComplectedState,
  ssrCompletedState,
} from "@/recoil/atoms";
import { createMap } from "@/service/map";

function LeftNav() {
  const [searchMapNodes, setSearchMapNodes] = useState<MapNode[]>([]);
  const searchAddress = useRecoilValue(searchAddressState);
  const isSearchClick = useRecoilValue(searchClickState);
  const checkSSREnd = useSsrComplectedState();
  const SSREnded = useRecoilValue(ssrCompletedState);
  useEffect(() => {
    const map = createMap();
    if (SSREnded === false) {
      checkSSREnd();
    } else {
      const handleSearchClick = async () => {
        const sortedMapNodes: MapNode[] = await searchNearbyPlace(
          searchAddress,
          map
        );
        setSearchMapNodes(sortedMapNodes);
      };
      handleSearchClick();
    }
  }, [isSearchClick]);

  return (
    <>
      <GlobalStyle />
      <LeftNavStyled id="leftNav">
        {searchMapNodes.map((node, i) => (
          <MapNodeCard key={node.id} index={i + 1} node={node} />
        ))}
      </LeftNavStyled>
    </>
  );
}

export default LeftNav;

const LeftNavStyled = styled.div`
  position: fixed;
  top: 120px;
  left: 0px;
  display: flex;
  flex-direction: column;
  transform: translateX(0%);
  transition: transform 0.3s ease-in-out;
  align-items: center;
  // background-color: #ff9a9f;
  width: 300px;
  height: calc(100% - 100px);
  overflow-y: auto;
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
