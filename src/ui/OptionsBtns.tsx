import { FoodTypes } from "@/types/definitions";
import styled, { css } from "styled-components";
import Card from "./Card";

const foods: FoodTypes[] = [
  {
    img: "/food1.svg",
    title: "개별 공간이 있는 점포",
  },
  {
    img: "/food2.svg",
    title: "좌식으로 편하게 쉴 수 있는 가게",
  },
  {
    img: "/food3.svg",
    title: "완전 금연 레스토랑",
  },
  {
    img: "/food4.svg",
    title: "라이브 공연이 있는 레스토랑",
  },
  {
    img: "/food1.svg",
    title: "범 10시 이후 입점 가능한 가게",
  },
  {
    img: "/food2.svg",
    title: "아침까지 여유있게 즐길 수 있는 가게",
  },
  {
    img: "/food3.svg",
    title: "바다가 보이는 레스토랑",
  },
  {
    img: "/food4.svg",
    title: "노래방을 즐길 수 있는 가게",
  },
];

function OptionsBtns() {
  return (
    <OptionsBtnStyled>
      {foods.map((it) => (
        <Card key={it.title} img={it.img} title={it.title}></Card>
      ))}
    </OptionsBtnStyled>
  );
}

export default OptionsBtns;

const OptionsBtnStyled = styled.div`
  margin: 10px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 15px;

  width: 80%;

  & > div {
    &:hover {
      background-color: #217dbb;
    }
  }
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
