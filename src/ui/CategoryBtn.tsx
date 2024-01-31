"use client";
import { categoryTypes } from "@/types/definitions";
import { useState } from "react";
import styled from "styled-components";

const categoryList: categoryTypes[] = [
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
  const [select, setSelect] = useState();

  const onclick = (id: number) => {
    setSelect(id);
  };

  return (
    <>
      {categoryList.map((it) => (
        <CategoryBtnStyled
          key={it.id}
          onClick={() => onclick(it.id)}
          className={select == it.id ? "active" : ""}
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
