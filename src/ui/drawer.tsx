import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import MapNode from '@/service/MapObject/MapNode';
import MapNodeCard from './MapNodeCard';

function Drawer({ mapNodes }: { mapNodes: Array<MapNode> }) {
  return (
    <DrawerContainer>
      <RecommendText>
        추천 순위
      </RecommendText>
      {mapNodes.map((node, i) => (
        // score는 추후 수정 예정
        <MapNodeCard key={i} index={i + 1} score={i + 1} name={node.name} />
      ))}
    </DrawerContainer>
  );
}

const DrawerContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FF9A9F;
    width: 270px;
    height: 100%;
    overflow-y: auto;
`;

const RecommendText = styled.div`
    align-self: start;
    color: #4B3F4E;
    font-size: 20px;
    font-weight: bold;
    font-family: 'Nanum Gothic', serif;
    padding: 12px 0px 12px 16px;
`;

export default Drawer;
