import React, { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

function DraggablePieChart() {
  const centerX = 50;
  const centerY = 50;
  const radius = 50;
  const circumference = Math.PI * radius; // 원의 둘레의 길이
  const dashArray = `${circumference / 3} ${circumference}`;

  const [distance, setDistance] = useState(100 / 3);
  const [rating, setRating] = useState(100 / 3);
  const [price, setPrice] = useState(100 / 3);

  const firstCircleRef = useRef(null);
  const secondCircleRef = useRef(null);
  const thirdCircleRef = useRef(null);

  const middleCircleRef = useRef(null);

  const [firstCircleX, setFirstCircleX] = useState(centerX + radius * Math.cos(0));
  const [firstCircleY, setFirstCircleY] = useState(centerY + radius * Math.sin(0));
  const [secondCircleX, setSecondCircleX] = useState(centerX + radius * Math.cos((2 * Math.PI) / 3));
  const [secondCircleY, setSecondCircleY] = useState(centerY + radius * Math.sin((2 * Math.PI) / 3));
  const [thirdCircleX, setThirdCircleX] = useState(centerX + radius * Math.cos((4 * Math.PI) / 3));
  const [thirdCircleY, setThirdCircleY] = useState(centerY + radius * Math.sin((4 * Math.PI) / 3));

  const [mouseX, setMouseX] = useState();
  const [mouseY, setMouseY] = useState();

  const handleMouseDown = (de: MouseEvent, circleRef, setCircleX, setCircleY) => {
    de.preventDefault();

    const handleMouseMove = (e: MouseEvent) => {
      // viewbox 내부의 상대적인 마우스 좌표를 계산
      const rect = circleRef.current.getBoundingClientRect();
      const offsetX = e.clientX - (rect.left + rect.right) / 2;
      const offsetY = e.clientY - (rect.top + rect.bottom) / 2;

      const deltaX = offsetX;
      const deltaY = offsetY;

      const angle = Math.atan2(deltaY , deltaX);
      const newCircleX = centerX + radius * Math.cos(angle);
      const newCircleY = centerY + radius * Math.sin(angle);

      setCircleX(newCircleX);
      setCircleY(newCircleY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <PieChartContainer>
      <GlobalStyle />
      <svg width="200" height="200" viewBox="0 0 100 100" ref={middleCircleRef}>
        {/* 거리-가격-평점에 대한 3개의 부채꼴 */}
        <circle cx={centerX} cy={centerY} r={radius / 2} fill="transparent" stroke="#FF4B4B" strokeWidth={radius} strokeDasharray={dashArray} transform="rotate(0 50 50)"  />
        <circle cx={centerX} cy={centerY} r={radius / 2} fill="transparent" stroke="#45A15E" strokeWidth={radius} strokeDasharray={dashArray} transform="rotate(120 50 50)" />
        <circle cx={centerX} cy={centerY} r={radius / 2} fill="transparent" stroke="#4C5EFF" strokeWidth={radius} strokeDasharray={dashArray} transform="rotate(240 50 50)" />
        {/* 아래의 원을 드래그하여 부채꼴 너비 조절 */}
        <circle onMouseDown={(e) => handleMouseDown(e, middleCircleRef, setFirstCircleX, setFirstCircleY)} ref={firstCircleRef} cx={firstCircleX} cy={firstCircleY} r="4" fill="lightgrey" stroke="#4B3F4E" />
        <circle onMouseDown={(e) => handleMouseDown(e, middleCircleRef, setSecondCircleX, setSecondCircleY)} ref={secondCircleRef} cx={secondCircleX} cy={secondCircleY} r="4" fill="lightgrey" stroke="#4B3F4E" />
        <circle onMouseDown={(e) => handleMouseDown(e, middleCircleRef, setThirdCircleX, setThirdCircleY)} ref={thirdCircleRef} cx={thirdCircleX} cy={thirdCircleY} r="4" fill="lightgrey" stroke="#4B3F4E" />
      </svg>

      <PieChartFigure>
        <CircleContainer>
          <StyledCircle style={{ backgroundColor: '#FF4B4B' }} />
          <PercentageText>
            {Math.round(distance)}
            %
          </PercentageText>
        </CircleContainer>
        <CircleContainer>
          <StyledCircle style={{ backgroundColor: '#45A15E' }} />
          <PercentageText>
            {Math.round(rating)}
            %
          </PercentageText>
        </CircleContainer>
        <CircleContainer>
          <StyledCircle style={{ backgroundColor: '#4C5EFF' }} />
          <PercentageText>
            {Math.round(price)}
            %
          </PercentageText>
        </CircleContainer>
      </PieChartFigure>

    </PieChartContainer>
  );
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    src: url(//fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.eot);
    font-family: 'Nanum Gothic', serif;
  }
`;

const PieChartContainer = styled.div`
    display: flex;
    flex-direction: column;

    circle {
      background-color: white;
    }

    svg {
      overflow: visible;
    }
`;

const PieChartFigure = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CircleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const StyledCircle = styled.div`
  height: 14px;
  width: 14px;
  border-radius: 7px;
`;

const PercentageText = styled.div`
  padding: 0px 4px 0px 4px;
  font-size: 12px;
  font-weight: 600;
  color: #4B3F4E;
`;

export default DraggablePieChart;
