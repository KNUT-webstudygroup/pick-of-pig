'use client';

import { FoodTypes } from '@/types/definitions';
import Card from '@/ui/FoodCard';
import PigFace from '@/ui/pig-face';
import PigNose from '@/ui/pig-nose';
import { useEffect, useReducer } from 'react';

// nextjs 13 이상부터는 next/router이 아닌 next/navigation이다 !!
import { useRouter } from 'next/navigation';
import styled, { css } from 'styled-components';

const foods: FoodTypes[] = [
  {
    img: '/food1.svg',
    title: '양식',
    // description: "Quickly join queue for 1:1 match",
  },
  {
    img: '/food2.svg',
    title: '중식',
    // description: "Create or join a game",
  },
  {
    img: '/food3.svg',
    title: '한식',
    // description: "Create or join a channel",
  },
  {
    img: '/food4.svg',
    title: '일식',
    // description: "View or change my settings",
  },
];

function FoodSelect() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/Map');
  };

  return (
    <FoodSelectStyled>
      {foods.map((it) => (
        // <CardContainer key={it.title}>
        <Card
          key={it.title}
          img={it.img}
          title={it.title}
          onClick={handleClick}
        />
        // </CardContainer>
      ))}
      {/* <Card></Card> */}
    </FoodSelectStyled>
  );
}

export default FoodSelect;

const FoodSelectStyled = styled.div`
  margin: 10px 10px; 
  height: 400px;
  display: flex;
  justify-content: center;
  background-color: pink;

  & > div {
    &:hover {
      background-color: #217dbb;
    }
  }
`;