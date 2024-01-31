import PigNose from '@/ui/pig-nose';
import Image from 'next/image';
import styled, { css } from 'styled-components';

function PigEars() {
  const styles = { width: '100px' };
  const imageStyle = {width : '100%'}

  return (
    <PigEarsContainer>
      {/* <pig */}
      <Test>
        {/* <Image width={540} height={540} src="/assets/pig-left-ear.svg"></Image> */}
        <Image width={540} height={100} viewbox="0 0 540 100" src="/food1.svg" />
        <div style={styles}>
          <img src="/assets/pig-left-ear.svg" style={imageStyle}/>
        </div>
      </Test>
    </PigEarsContainer>
  );
}

const Test = styled.div`
  width: 100px;
  height: 200px;
`;

const PigEarsContainer = styled.div`
  // width: 600px;
  // height: 100px;
`;

const PigEar = styled.div`
  // background-color: #ff9a9f;
`;

export default PigEars;
