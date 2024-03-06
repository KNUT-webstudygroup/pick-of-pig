import { categoryList, optionList } from "@/recoil/atoms";
import { categoryLists } from "@/ui/CategoryBtn";
import DeleteIcon from "@/ui/icon/delete-icon";
import { foods } from "@/ui/OptionsBtns";
import SearchBar from "@/ui/SearchBar";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const ListModal = ({ closeModal }: { closeModal: (name: string) => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // const selectCategoryList = useRecoilValue(categoryList);
  const [selectCategory, setSelectCategoryList] = useRecoilState(categoryList);
  const [selectOption, setSelectOption] = useRecoilState(optionList);
  const selectOptionList = useRecoilValue(optionList);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handleClickOutside = (event: MouseEvent) => {
      // 모달이 열려있고, 모달 바깥을 클릭했을 때 모달이 닫히도록 처리
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal("LeftNav");
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handleClickOutside);
    // 클린업 함수 ,,? 모르겠음
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const onCategoryClick = (title: string) => {
    if (!selectCategory.includes(title)) {
      setSelectCategoryList([...selectCategory, title]);
    } else {
      setSelectCategoryList(selectCategory.filter((item) => item !== title));
    }
  };

  const onOptionClick = (title: string) => {
    if (!selectOption.includes(title)) {
      setSelectOption([...selectOption, title]);
    } else setSelectOption(selectOption.filter((item) => item !== title));
  };

  // useEffect(() => {
  //   setCategory([...selectList]);
  // }, [selectList]);

  return (
    <ListModalStyled>
      <ModalContentStyled ref={modalRef}>
        <SearchBar />

        <WrapperComponentStyled>
          {categoryLists.map((it, index) => (
            <ComponentStyled
              key={index}
              className={selectCategory.includes(it.title) ? "check" : ""}
              onClick={() => onCategoryClick(it.title)}
            >
              <div>{it.title}</div>
            </ComponentStyled>
          ))}

          {foods.map((it, index) => (
            <ComponentStyled
              key={index}
              className={selectOptionList.includes(it.title) ? "check" : ""}
              onClick={() => onOptionClick(it.title)}
            >
              <div>{it.title}</div>
            </ComponentStyled>
          ))}
        </WrapperComponentStyled>
      </ModalContentStyled>
    </ListModalStyled>
  );
};

export default ListModal;

const WrapperComponentStyled = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const ListModalStyled = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContentStyled = styled.div`
  position: absolute;
  width: 800px;
  height: 500px;
  padding: 15px;
  background-color: #ffb9b4;
  border-radius: 10px;
`;

const ClostModal = styled.div`
  display: none;
`;

const ComponentStyled = styled.div`
  min-width: 100px;
  height: 40px;
  background-color: #ffe3e1;
  font-size: 1rem;
  border-radius: 20px;

  white-space: nowrap;

  padding: 0 15px;
  display: flex;
  box-shadow: 0 6px 0 0 #ff9a9f;
  margin-right: 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  // overflow: hidden; /* 넘치는 부분 숨김 */
  // text-overflow: ellipsis; /* 넘치는 텍스트에 대한 대체 문자(...) 표시 */
  flex-shrink: 0;

  &:hover {
    color: #fff;
    background-color: #f17c82;
  }
  &.check {
    color: #fff;
    background-color: #f17c82;
  }
`;
