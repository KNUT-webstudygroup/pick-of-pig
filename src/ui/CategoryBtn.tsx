"use client";
import { categoryList } from "@/recoil/atoms";
import { categoryTypes } from "@/types/definitions";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

export const categoryLists: categoryTypes[] = [
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
  const [selectList, setSelectList] = useState<string[]>([]);
  const setCategory = useSetRecoilState(categoryList);
  // const oldTodoList = useRecoilValue(contentState);

  const onclick = (title: string) => {
    if (!selectList.includes(title)) {
      setSelectList([...selectList, title]);
    } else {
      setSelectList(selectList.filter((item) => item !== title));
    }
  };

  useEffect(() => {
    setCategory([...selectList]);
  }, [selectList]);

  return (
    <>
      {categoryLists.map((it) => (
        <CategoryBtnStyled
          key={it.id}
          onClick={() => onclick(it.title)}
          className={selectList.includes(it.title) ? "active" : ""}
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
