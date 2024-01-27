import Image from "next/image";
import styled from "styled-components";

interface CardProps {
  title?: string;
  width?: string;
  height?: string;
  img?: string;
  onClick: () => void;
}

export default function Card({
  title,
  width = "200px",
  height = "300px",
  img,
  onClick,
}: CardProps) {
  return (
    <CardStyled $width={width} $height={height} onClick={onClick}>
      <Image width={40} height={40} src={img} />
      <CardTitle>{title}</CardTitle>
    </CardStyled>
  );
}

const CardTitle = styled.div`
  font-size: 2rem;
`;

const CardStyled = styled.div<{
  $width: string;
  $height: string;
  $isTransparent: boolean;
}>`
  // 나중에 따로 처리하는 방법 생각하기
  margin-left: 30px;

  display: flex;
  flex-direction: column;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  justify-content: space-around;
  align-items: center;
  border-radius: 17px;
  background-color: pink;
  // background: var(--light-gray);
  box-shadow: 0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25);
`;

const CardContentWrapperStyled = styled.div<{
  $width: string;
  $height: string;
}>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  border-radius: 4rem;
  background: var(--white);
  box-shadow: 0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 40px 0;
`;

const CardHeaderStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: var(--main-dark-purple);
`;
