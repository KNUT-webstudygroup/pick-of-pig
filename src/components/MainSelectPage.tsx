import PigFace from "@/ui/pig-face";
import PigNose from "@/ui/pig-nose";
import styled, { css } from "styled-components";
import CustomRecMenu from "./CustomRecMenu";
// import FoodSelect from "./FoodSelec";

function MainSelectPage() {
  return (
    <MainSelectStyled>
      <PigFace />
      {/* <FoodSelect></FoodSelect> */}
      <CustomRecMenu />
    </MainSelectStyled>
  );
}

export default MainSelectPage;

const MainSelectStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--main-bg-color);
`;
