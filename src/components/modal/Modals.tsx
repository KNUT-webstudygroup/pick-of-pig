import { useState } from "react";
import styled from "styled-components";
import GhostLegModal from "./GhostLegModal";
import { ModalType } from "./modal.data";
import RandomModal from "./RandomModal";
import RouletteModal from "./RouletteModal";

const Modals = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<string>("");

  const openModal = (name: string) => {
    setShowModal(true);
    setModalName(name);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ModalSelectContainerStyled>
        <ModalSelectStyled onClick={() => openModal("RANDOM")}>
          {ModalType.RANDOM}
        </ModalSelectStyled>
        <ModalSelectStyled onClick={() => openModal("GHOSTLEG")}>
          {ModalType.GHOSTLEG}
        </ModalSelectStyled>
        <ModalSelectStyled onClick={() => openModal("ROULETTE")}>
          {ModalType.ROULETTE}
        </ModalSelectStyled>
      </ModalSelectContainerStyled>
      {showModal && modalName === "RANDOM" ? (
        <RandomModal closeModal={closeModal} />
      ) : modalName === "GHOSTLEG" ? (
        <GhostLegModal closeModal={closeModal} />
      ) : modalName === "ROULETTE" ? (
        <RouletteModal closeModal={closeModal} />
      ) : null}
    </>
  );
};

export default Modals;

const ModalSelectContainerStyled = styled.div`
  position: absolute;
  background-color: #ff9a9f;

  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 200px;
  // height: 300px;
  z-index: 7;
  left: 260px;
  top: 50px;
`;

const ModalSelectStyled = styled.div`
  background-color: #ffe3e1;
  font-weight: 700;
  color: #000;
  width: 80%;
  height: 40px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 45px;
  border-radius: 10px;
`;
