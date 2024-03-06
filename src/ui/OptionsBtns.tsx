import { categoryList, optionList } from '@/recoil/atoms';
import { FoodTypes } from '@/types/definitions';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import Card from './Card';

export const foods: FoodTypes[] = [
  {
    img: '/options.png',
    title: '개별 공간이 있는 점포',
  },
  {
    img: '/options.png',
    title: '좌식으로 편하게 쉴 수 있는 가게',
  },
  {
    img: '/options.png',
    title: '완전 금연 레스토랑',
  },
  {
    img: '/options.png',
    title: '라이브 공연이 있는 레스토랑',
  },
  {
    img: '/options.png',
    title: '범 10시 이후 입점 가능한 가게',
  },
  {
    img: '/options.png',
    title: '아침까지 여유있게 즐길 수 있는 가게',
  },
  {
    img: '/options.png',
    title: '바다가 보이는 레스토랑',
  },
  {
    img: '/options.png',
    title: '노래방을 즐길 수 있는 가게',
  },
];

function OptionsBtns() {
  // const test = useRecoilValue(categoryList);
  const [options, setOptions] = useState<string[]>([]);
  const setOptionList = useSetRecoilState(optionList);

  const onclick = (it: string) => {
    if (!options.includes(it)) {
      setOptions([...options, it]);
    } else {
      setOptions(options.filter((item) => item !== it));
    }
    // console.log(test);
  };

  useEffect(() => {
    setOptionList([...options]);
    // console.log(options);
  }, [options]);

  return (
    <OptionsBtnStyled>
      {foods.map((it) => (
        <Option>
          <img
            src={it.img}
            onClick={() => onclick(it.title)}
            className={options.includes(it.title) ? 'check' : ''}
          />
          <OptionTitle>{it.title}</OptionTitle>
        </Option>
      ))}
    </OptionsBtnStyled>
  );
}

export default OptionsBtns;

const OptionTitle = styled.div`
  font-size: 1.5rem;
  color: #4b3f4e;
  max-width: 250px;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 30px;

  & > img {
    margin-bottom: 30px;
    margin-top: 30px;
    width: 250px;
    height: 350px;
  }

  & > img.check {
    filter: contrast(50%);
  }
`;

const OptionsBtnStyled = styled.div`
  margin: 10px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 15px;

  width: 80%;
  max-width: 1500px;
`;

// allowsDogs,
// curbsidePickup,
// delivery,
// dineIn,
//  editorialSummary,
// evChargeOptions*,
// fuelOptions*,
// goodForChildren,
// goodForGroups,

// 개별 공간이 있는 점포
// 좌식으로 편하게 쉴 수 있는 가게
// 아이 동반으로 갈 수 있는 레스토랑
// 음료 반입이 가능한 가게
// 완전 금연 레스토랑
// 아침식사 가능한 가게
// 범 10시 이후 입점 가능한 가게
// 심야영업하는 가게
// 아침까지 여유있게 즐길 수 있는 가게
// 노래방을 즐길 수 있는 가게
// 라이브 공연이 있는 레스토랑
// 바다가 보이는 레스토랑
