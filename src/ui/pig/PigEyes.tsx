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
  // width: 80%;
  // border-radius: 117px;
  // position: relative;
  // cursor: pointer;

  margin-bottom: 120px;

  display: flex;
  justify-content: space-around;
  width: 65%;
`;

const PigEye = styled.div`
  width: 70px;
  height: 70px;
  background-color: #4b3f4e; /* 콧구멍 색상 설정 (필요에 따라 수정 가능) */
  border-radius: 50%;
  // position: absolute;
  // top: 50%;
  // left: ${(props) => props.left || "30%"};
  // transform: translate(-50%, -50%);
`;
