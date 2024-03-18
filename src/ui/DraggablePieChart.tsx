import React, { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

function DraggablePieChart() {
  const centerX = 50;
  const centerY = 50;
  const radius = 50;
  const circumference = Math.PI * radius; // 원의 둘레의 길이

  const firstCircleRef = useRef(null);
  const secondCircleRef = useRef(null);
  const thirdCircleRef = useRef(null);

  const middleCircleRef = useRef(null);

  const [firstCircleAngle, setFirstCircleAngle] = useState(0);
  const [secondCircleAngle, setSecondCircleAngle] = useState((2 * Math.PI) / 3);
  const [thirdCircleAngle, setThirdCircleAngle] = useState(-(2 * Math.PI) / 3);
  const [firstCircleX, setFirstCircleX] = useState(centerX + radius * Math.cos(firstCircleAngle));
  const [firstCircleY, setFirstCircleY] = useState(centerY + radius * Math.sin(firstCircleAngle));
  const [secondCircleX, setSecondCircleX] = useState(centerX + radius * Math.cos(secondCircleAngle));
  const [secondCircleY, setSecondCircleY] = useState(centerY + radius * Math.sin(secondCircleAngle));
  const [thirdCircleX, setThirdCircleX] = useState(centerX + radius * Math.cos(thirdCircleAngle));
  const [thirdCircleY, setThirdCircleY] = useState(centerY + radius * Math.sin(thirdCircleAngle));

  const [distance, setDistance] = useState(circumference / 3);
  const [rating, setRating] = useState(circumference / 3);
  const [price, setPrice] = useState(circumference / 3);
  const [distanceTextX, setDistanceTextX] = useState(0);
  const [distanceTextY, setDistanceTextY] = useState(0);
  const [ratingTextX, setRatingTextX] = useState(0);
  const [ratingTextY, setRatingTextY] = useState(0);
  const [priceTextX, setPriceTextX] = useState(0);
  const [priceTextY, setPriceTextY] = useState(0);

  useEffect(() => {
    const distanceTextPosition = calculateTextPosition(firstCircleAngle, secondCircleAngle, centerX, centerY, 25, false);
    const priceTextPosition = calculateTextPosition(firstCircleAngle, thirdCircleAngle, centerX, centerY, 25, false);
    const ratingTextPosition = calculateTextPosition(secondCircleAngle, thirdCircleAngle, centerX, centerY, 25, true);

    setDistanceTextX(distanceTextPosition.x);
    setDistanceTextY(distanceTextPosition.y);
    setPriceTextX(priceTextPosition.x);
    setPriceTextY(priceTextPosition.y);
    setRatingTextX(ratingTextPosition.x);
    setRatingTextY(ratingTextPosition.y);
  }, [firstCircleAngle, secondCircleAngle, thirdCircleAngle]);

  const handleFirstCircle = (de: MouseEvent, circleRef, setCircleX, setCircleY, setCircleAngle) => {
    de.preventDefault();

    const handleMouseMove = (me: MouseEvent) => {
      // viewbox 내부의 상대적인 마우스 좌표를 계산
      const rect = circleRef.current.getBoundingClientRect();
      const deltaX = me.clientX - (rect.left + rect.right) / 2;
      const deltaY = me.clientY - (rect.top + rect.bottom) / 2;

      const angle = Math.atan2(deltaY, deltaX);
      const newCircleX = centerX + radius * Math.cos(angle);
      const newCircleY = centerY + radius * Math.sin(angle);

      // 각 원의 반지름
      const circleRadius = 4;

      // 각 원의 중심 간의 거리 계산
      const distanceToFirst = Math.sqrt((newCircleX - firstCircleX) ** 2 + (newCircleY - firstCircleY) ** 2);
      const distanceToSecond = Math.sqrt((newCircleX - secondCircleX) ** 2 + (newCircleY - secondCircleY) ** 2);
      const distanceToThird = Math.sqrt((newCircleX - thirdCircleX) ** 2 + (newCircleY - thirdCircleY) ** 2);

      // 원들이 겹치지 않을 때만 업데이트
      if ((distanceToSecond > 2 * circleRadius && distanceToThird > 2 * circleRadius)
      ) {
        setCircleAngle(angle);
        setCircleX(newCircleX);
        setCircleY(newCircleY);

        const distanceWidth = (radius / 2) * Math.abs(angle - secondCircleAngle);
        const priceWidth = (radius / 2) * Math.abs(angle - thirdCircleAngle);
        setDistance(distanceWidth);
        setPrice(priceWidth);

        const distanceTextPosition = calculateTextPosition(angle, secondCircleAngle, centerX, centerY, 25, false);
        const priceTextPosition = calculateTextPosition(thirdCircleAngle, angle, centerX, centerY, 25, false);
        setDistanceTextX(distanceTextPosition.x);
        setDistanceTextY(distanceTextPosition.y);
        setPriceTextX(priceTextPosition.x);
        setPriceTextY(priceTextPosition.y);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleSecondCircle = (de: MouseEvent, circleRef, setCircleX, setCircleY, setCircleAngle) => {
    de.preventDefault();

    const handleMouseMove = (me: MouseEvent) => {
      // viewbox 내부의 상대적인 마우스 좌표를 계산
      const rect = circleRef.current.getBoundingClientRect();
      const deltaX = me.clientX - (rect.left + rect.right) / 2;
      const deltaY = me.clientY - (rect.top + rect.bottom) / 2;

      const angle = Math.atan2(deltaY, deltaX);
      const newCircleX = centerX + radius * Math.cos(angle);
      const newCircleY = centerY + radius * Math.sin(angle);

      // 각 원의 반지름
      const circleRadius = 4;

      // 각 원의 중심 간의 거리 계산
      const distanceToFirst = Math.sqrt((newCircleX - firstCircleX) ** 2 + (newCircleY - firstCircleY) ** 2);
      const distanceToSecond = Math.sqrt((newCircleX - secondCircleX) ** 2 + (newCircleY - secondCircleY) ** 2);
      const distanceToThird = Math.sqrt((newCircleX - thirdCircleX) ** 2 + (newCircleY - thirdCircleY) ** 2);

      // 원들이 겹치지 않을 때만 업데이트
      if (distanceToFirst > 2 * circleRadius && distanceToThird > 2 * circleRadius) {
        setCircleAngle(angle);
        setCircleX(newCircleX);
        setCircleY(newCircleY);

        const distanceWidth = (radius / 2) * Math.abs(angle - firstCircleAngle);
        const ratingWidth = (radius / 2) * Math.abs(angle - thirdCircleAngle - 2 * Math.PI);
        setDistance(distanceWidth);
        setRating(ratingWidth);

        const distanceTextPosition = calculateTextPosition(angle, firstCircleAngle, centerX, centerY, 25, false);
        const ratingTextPosition = calculateTextPosition(thirdCircleAngle, angle, centerX, centerY, 25, true);
        setDistanceTextX(distanceTextPosition.x);
        setDistanceTextY(distanceTextPosition.y);
        setRatingTextX(ratingTextPosition.x);
        setRatingTextY(ratingTextPosition.y);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleThirdCircle = (de: MouseEvent, circleRef, setCircleX, setCircleY, setCircleAngle) => {
    de.preventDefault();

    const handleMouseMove = (me: MouseEvent) => {
      // viewbox 내부의 상대적인 마우스 좌표를 계산
      const rect = circleRef.current.getBoundingClientRect();
      const deltaX = me.clientX - (rect.left + rect.right) / 2;
      const deltaY = me.clientY - (rect.top + rect.bottom) / 2;

      const angle = Math.atan2(deltaY, deltaX);
      const newCircleX = centerX + radius * Math.cos(angle);
      const newCircleY = centerY + radius * Math.sin(angle);

      // 각 원의 반지름
      const circleRadius = 4;

      // 각 원의 중심 간의 거리 계산
      const distanceToFirst = Math.sqrt((newCircleX - firstCircleX) ** 2 + (newCircleY - firstCircleY) ** 2);
      const distanceToSecond = Math.sqrt((newCircleX - secondCircleX) ** 2 + (newCircleY - secondCircleY) ** 2);
      const distanceToThird = Math.sqrt((newCircleX - thirdCircleX) ** 2 + (newCircleY - thirdCircleY) ** 2);

      // 원들이 겹치지 않을 때만 업데이트
      if (distanceToFirst > 2 * circleRadius && distanceToSecond > 2 * circleRadius) {
        setCircleAngle(angle);
        setCircleX(newCircleX);
        setCircleY(newCircleY);

        const priceWidth = (radius / 2) * Math.abs(angle - firstCircleAngle);
        const ratingWidth = (radius / 2) * Math.abs(angle - secondCircleAngle + 2 * Math.PI);
        setPrice(priceWidth);
        setRating(ratingWidth);

        const priceTextPosition = calculateTextPosition(angle, firstCircleAngle, centerX, centerY, 25, false);
        const ratingTextPosition = calculateTextPosition(secondCircleAngle, angle, centerX, centerY, 25, true);
        setPriceTextX(priceTextPosition.x);
        setPriceTextY(priceTextPosition.y);
        setRatingTextX(ratingTextPosition.x);
        setRatingTextY(ratingTextPosition.y);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const calculateTextPosition = (angle1, angle2, centerX, centerY, radius, isRating) => {
    let middleAngle = (angle1 + angle2) / 2;
    if (isRating === true) middleAngle += Math.PI;
    const x = centerX + radius * Math.cos(middleAngle) - 7;
    const y = centerY + radius * Math.sin(middleAngle) + 2;
    return { x, y };
  };

  return (
    <PieChartContainer>
      <GlobalStyle />
      <svg width="200" height="200" viewBox="0 0 100 100" ref={middleCircleRef}>
        {/* 거리-평점-가격에 대한 3개의 부채꼴 */}
        <circle cx={centerX} cy={centerY} r={radius / 2} fill="transparent" stroke="#FF4B4B" strokeWidth={radius} strokeDasharray={`${distance} ${circumference}`} transform={`rotate(${(firstCircleAngle * 180) / Math.PI} ${centerX} ${centerY})`} />
        <circle cx={centerX} cy={centerY} r={radius / 2} fill="transparent" stroke="#45A15E" strokeWidth={radius} strokeDasharray={`${rating} ${circumference}`} transform={`rotate(${(secondCircleAngle * 180) / Math.PI} ${centerX} ${centerY})`} />
        <circle cx={centerX} cy={centerY} r={radius / 2} fill="transparent" stroke="#4C5EFF" strokeWidth={radius} strokeDasharray={`${price} ${circumference}`} transform={`rotate(${(thirdCircleAngle * 180) / Math.PI} ${centerX} ${centerY})`} />
        {/* 거리-평점-가격에 대한 텍스트 */}
        <text x={distanceTextX} y={distanceTextY}>거리</text>
        <text x={ratingTextX} y={ratingTextY}>평점</text>
        <text x={priceTextX} y={priceTextY}>가격</text>
        {/* 아래의 원을 드래그하여 부채꼴 너비 조절 */}
        <circle onMouseDown={(e) => handleFirstCircle(e, middleCircleRef, setFirstCircleX, setFirstCircleY, setFirstCircleAngle)} ref={firstCircleRef} cx={firstCircleX} cy={firstCircleY} r="4" fill="#4B3F4E" />
        <circle onMouseDown={(e) => handleSecondCircle(e, middleCircleRef, setSecondCircleX, setSecondCircleY, setSecondCircleAngle)} ref={secondCircleRef} cx={secondCircleX} cy={secondCircleY} r="4" fill="#4B3F4E" />
        <circle onMouseDown={(e) => handleThirdCircle(e, middleCircleRef, setThirdCircleX, setThirdCircleY, setThirdCircleAngle)} ref={thirdCircleRef} cx={thirdCircleX} cy={thirdCircleY} r="4" fill="#4B3F4E" />
      </svg>

      <PieChartFigure>
        <CircleContainer>
          <StyledCircle style={{ backgroundColor: '#FF4B4B' }} />
          <PercentageText>
            {Math.round((distance / circumference) * 100)}
            %
          </PercentageText>
        </CircleContainer>
        <CircleContainer>
          <StyledCircle style={{ backgroundColor: '#45A15E' }} />
          <PercentageText>
            {Math.round((rating / circumference) * 100)}
            %
          </PercentageText>
        </CircleContainer>
        <CircleContainer>
          <StyledCircle style={{ backgroundColor: '#4C5EFF' }} />
          <PercentageText>
            {Math.round((price / circumference) * 100)}
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

    text {
      font-size: 8px;
      font-weight: 500;
      fill: white;
    }
`;

const PieChartFigure = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
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
