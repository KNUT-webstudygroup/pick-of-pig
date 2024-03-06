import PigNose from '@/ui/pig/PIgNose';
import styled, { css } from 'styled-components';
import PigEars from './PigEars';
import PigEyes from './PigEyes';

function PigFace() {
  return (
    <PigFaceStyled>
      <PigEars />
      <PigEyes />
      <PigNose />
    </PigFaceStyled>
  );
}

export default PigFace;

const PigFaceStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 1000px;
`;
