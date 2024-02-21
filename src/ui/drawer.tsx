import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import MapNodeCard from './MapNodeCard';

function Drawer() {
  return (
    <DrawerContainer>
      <RecommendText>
        추천 순위
      </RecommendText>
      <MapNodeCard index={1} star={5} name="파앤피하우스" />
      <MapNodeCard index={2} star={3} name="파앤피하우스" />
      <MapNodeCard index={3} star={1} name="파앤피하우스" />
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
