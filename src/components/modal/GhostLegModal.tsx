import { categoryLists } from "@/ui/CategoryBtn";
import { foods } from "@/ui/OptionsBtns";
import PigNose from "@/ui/pig/PIgNose";
import SearchBar from "@/ui/SearchBar";
import { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

function GhostLegModal({ closeModal }: { closeModal: (name: string) => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal("Random");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <RandomModalStyled>
      <ModalContentStyled ref={modalRef}>
        <Title>오늘의 돼지의 랜덤 선택</Title>
        <SubTitle>아래 돼지가 오늘의 pick을 선택합니다.</SubTitle>
        <RandomPickContainer />
        <PigNose />
      </ModalContentStyled>
    </RandomModalStyled>
  );
}

export default GhostLegModal;

const RandomPickContainer = styled.div`
  width: 80%;
  height: 100px;
  margin-top: 30px;
  border-radius: 10px;
  background-color: #ffb9b4;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 50px;
`;

const SubTitle = styled.div`
  font-size: 1.5rem;
  margin-top: 30px;
`;

const RandomModalStyled = styled.div`
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
  width: 500px;
  height: 700px;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  align-items: center;
`;
