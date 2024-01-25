import PigFace from '@/ui/pig-face';
import PigNose from '@/ui/pig-nose';
import styled, { css } from 'styled-components';
import FoodSelect from './FoodSelec';

function MainSelectPage() {
  return (
    <MainSelectStyled>
      <PigFace />
      <FoodSelect />
      <CustomRecContainer />
    </MainSelectStyled>
  );
}

export default MainSelectPage;

const CustomRecContainer = styled.div`
  //   widtth: 100px;
  height: 100px;
  background-color: #000;
`;

const MainSelectStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: var(--main-bg-color);
`;
