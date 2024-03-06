import { useState } from 'react';
import styled from 'styled-components';

interface CardProps {
  title?: string;
  width?: string;
  height?: string;
  img: string;
  onClick?: () => void;
}

export const imageStyle = {
  width: '100%',
  height: '100%',
};

export default function Card({
  title,
  width = '250px',
  height = '350px',
  img,
  onClick,
}: CardProps) {
  const [state, setState] = useState(false);

  return (
    <CardStyled>
      <ImgStyled
        style={{ width, height }}
        onClick={onClick}
        className={state ? 'click' : ''}
      >
        <img src={img} style={imageStyle} />
      </ImgStyled>
      <CardTitle>{title}</CardTitle>
    </CardStyled>
  );
}

const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 420px;
  margin-left: 30px;
  margin-bottom: 30px;
`;

const CardTitle = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #4b3f4e;

  margin-top: 20px;
`;

const ImgStyled = styled.div`
  &.click {
    background-color: gray;
  }

  // box-shadow: 0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25);
`;
