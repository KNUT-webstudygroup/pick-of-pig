import styled from "styled-components";

interface CardProps {
  title?: string;
  width?: string;
  height?: string;
  img: string;
  onClick?: () => void;
}

export default function Card({
  title,
  width = "250px",
  height = "300px",
  img,
  onClick,
}: CardProps) {
  return (
    <CardStyled>
      <ImgStyled style={{ width: width, height: height }} onClick={onClick}>
        <img src={img} style={{ width: "100%", height: "100%" }} />
      </ImgStyled>
      <CardTitle>{title}</CardTitle>
    </CardStyled>
  );
}

const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
`;

const CardTitle = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #4b3f4e;
`;

const ImgStyled = styled.div`
  // 나중에 따로 처리하는 방법 생각하기
  margin-left: 30px;

  display: flex;

  justify-content: space-around;
  align-items: center;
  // box-shadow: 0px 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.25);
`;
