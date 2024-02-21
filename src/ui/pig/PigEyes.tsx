import styled, { css } from "styled-components";

function PigEyes() {
  return (
    <PigEyesContainer>
      <PigEye />
      <PigEye left="70%" />
    </PigEyesContainer>
  );
}

export default PigEyes;

const PigEyesContainer = styled.div`
  @media screen and (min-width: 2100px) {
    width: 1200px;
  }
  // margin-bottom: 40px;

  // margin-bottom: 120px;
  display: flex;
  justify-content: space-around;
  width: 58%;
`;

const PigEye = styled.div`
  width: 70px;
  height: 70px;
  background-color: #4b3f4e; /* 콧구멍 색상 설정 (필요에 따라 수정 가능) */
  border-radius: 50%;

  @media screen and (max-width: 1450px) {
    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 800px) {
    width: 35px;
    height: 35px;
  }
`;
