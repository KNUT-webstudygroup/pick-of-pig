'use client';

import { FoodTypes } from '@/types/definitions';
import Card from '@/ui/Card';
import { useRouter } from 'next/navigation';
import styled, { css } from 'styled-components';

const foods: FoodTypes[] = [
  {
    img: '/food1.svg',
    title: '양식',
  },
  {
    img: '/food2.svg',
    title: '중식',
  },
  {
    img: '/food3.svg',
    title: '한식',
  },
  {
    img: '/food4.svg',
    title: '일식',
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
        <Card
          key={it.title}
          img={it.img}
          title={it.title}
          onClick={handleClick}
        />
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
  // background-color: pink;
  border-radius: 15px;

  width: 80%;

  & > div {
    &:hover {
      background-color: #217dbb;
    }
  }
`;
