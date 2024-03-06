import styled from 'styled-components';
import Category from './Category';
import Options from './Options';

function MainSelectPage() {
  return (
    <MainSelectStyled>
      <Category />
      <Options />
    </MainSelectStyled>
  );
}

export default MainSelectPage;

const MainSelectStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--main-bg-color);
`;
