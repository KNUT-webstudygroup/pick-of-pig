import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import DoorHandle from '@/ui/DoorHandle';

function Door({ title, loc }: { title: string; loc: string }) {
  const [animate, setAnimate] = useState(false);
  const [input, setInput] = useState('');

  const onClickFadeOut = () => {
    setAnimate(true);
  };

  const activeEnter = (e: React.MouseEvent) => {
    if (e.key === 'Enter') {
      onClickFadeOut();
    }
  };

  return (
    <DoorStyled loc={loc} animate={animate}>
      <div>
        <DoorMain>
          <span>{title}</span>
          <img src="/pig.svg" />
          <SearchBarContainer>
            <input
              placeholder="메뉴를 입력하세요"
              className="search_input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => activeEnter(e)}
            />
            <span class="material-symbols-outlined icon">search</span>
          </SearchBarContainer>
          {loc === 'right' ? (
            // 나중에 컴포넌트로 뺄수 있으면 빼기
            <RecommendList>
              <span>1. 라면</span>
              <span>2. 칼국수</span>
              <span>3. 김치찌개</span>
            </RecommendList>
          ) : (
            <SearchLocationContainer>
              <span>현재 위치로 설정</span>
              <span class="material-symbols-outlined icon">my_location</span>
            </SearchLocationContainer>
          )}
        </DoorMain>
        <DoorHandle loc="right" />
      </div>
    </DoorStyled>
  );
}

export default Door;

const slideout = (loc: string) => keyframes`
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(${loc === 'left' ? '-50vw' : '50vw'});
    opacity: 0;
  }
`;

const DoorStyled = styled.div<{ loc: string; animate: boolean }>`
  display: flex;
  background-color: #cf4c23;
  width: 50vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1; // Door 컴포넌트가 Map 컴포넌트 위에 나타나도록 설정

  ${(props) => (props.loc === 'right' ? 'padding-left: 10px;' : 'padding-right: 10px;')}

  animation: ${({ animate, loc }) => (animate
    ? css`
          ${slideout(loc)} 1s ease-in;
          animation-fill-mode: forwards; // 애니메이션 계속 적용
        `
    : 'none')};

  & > div {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: ${(props) => (props.loc === 'right' ? 'row-reverse' : 'row')};
  }
`;

const DoorMain = styled.div`
  margin-top: 180px;
  display: flex;
  width: 100%;
  height: 80%;
  align-items: center;
  flex-direction: column;

  & > img {
    margin-top: 55px;
    margin-bottom: 140px;
  }

  & > span {
    text-align: center;
    font-size: 96px;
    font-weight: 700;
    line-height: normal;
  }
`;

const RecommendList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBarContainer = styled.div`
  & > input {
    border-color: #fff;
    color: #fff;
    border-width: 0 0 1px;
    background-color: #cf4c23;
  }
  margin-bottom: 30px;
  height: 80px;
`;

const SearchLocationContainer = styled.div`
  color: #fff;
  display: flex;
`;
