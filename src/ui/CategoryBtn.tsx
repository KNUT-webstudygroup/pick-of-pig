"use client";
import { categoryTypes } from "@/types/definitions";
import { useState } from "react";
import styled from "styled-components";

export const categoryList: categoryTypes[] = [
  {
    id: 1,
    title: "한식",
  },
  {
    id: 2,
    title: "중식",
  },
  {
    id: 3,
    title: "일식",
  },
  {
    id: 4,
    title: "양식",
  },
  {
    id: 5,
    title: "아시안",
  },
  {
    id: 6,
    title: "카페",
  },
  {
    id: 7,
    title: "빵집",
  },
  {
    id: 8,
    title: "술집",
  },
];

function CategoryBtn() {
  // 형 이 주석 친 부분으로는 왜 안되는 걸까???
  // const [select, setSelect] = useState<number[]>([]);
  // const selectList: any = [];

  // const onclick = (id: number) => {
  //   console.log(selectList)

  //   console.log(id);
  //   if (!selectList.includes(id)) {
  //     selectList.push(id);
  //     console.log(selectList)
  //   } else {
  //     console.log(id)
  //     selectList.splice(selectList.indexOf(id), 1);
  //   }
  //   setSelect(selectList); //<<--- 여기에서 문제있는듯
  // selectList 초기화하고 재설정하는 것 같은데 JS의 Array는 call by reference 라서 same으로 판단한것 같음.
  // https://ella951230.tistory.com/entry/React-useState-%EB%B0%B0%EC%97%B4-%EB%B3%80%EA%B2%BD%EB%B0%A9%EB%B2%95-spread-%EB%AC%B8%EB%B2%95

  //   console.log("selectList", selectList);
  //   console.log("select", select);
  // };

  const [selectList, setSelectList] = useState<number[]>([]);

  const onclick = (id: number) => {
    if (!selectList.includes(id)) {
      setSelectList([...selectList, id]);
    } else {
      setSelectList(selectList.filter((item) => item !== id));
    }
  };

  return (
    <>
      {categoryList.map((it) => (
        <CategoryBtnStyled
          key={it.id}
          onClick={() => onclick(it.id)}
          className={selectList.includes(it.id) ? "active" : ""}
        >
          {it.title}
        </CategoryBtnStyled>
      ))}
    </>
  );
}

const CategoryBtnStyled = styled.div`
  width: 200px;
  height: 100px;

  @media screen and (max-width: 700px) {
    width: 150px;
    height: 75px;
    font-size: 2.5rem;
    margin-left: 24px;
    margin-bottom: 27px;
  }

  @media screen and (max-width: 500px) {
    width: 100px;
    height: 50px;
    font-size: 1.5rem;
  }

  background-color: #fff;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  box-shadow: 0 10px 0 0 #ff9a9f;

  margin-left: 30px;
  margin-bottom: 36px;

  &:hover {
    color: #fff;
    background-color: #f17c82;
  }

  &.active {
    color: #fff;
    background-color: #f17c82;
  }
`;

export default CategoryBtn;
