import CategoryBtn from "@/ui/CategoryBtn";
import styled from "styled-components";

function Category() {
  const imageStyle = {
    width: "100%",
    height: "100%",
  };
  return (
    <CategoryStyled>
      <CloudContainer>
        <img src="/cloud.svg" style={imageStyle}></img>
      </CloudContainer>
      <Title>Category</Title>

      <CategoryBtnContainer>
        <CategoryBtn />
      </CategoryBtnContainer>
    </CategoryStyled>
  );
}

const CloudContainer = styled.div`
  width: 80%;
`;

const CategoryBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  width: 70%;
`;

const CategoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  @media screen and (max-width: 500px) {
    font-size: 3rem;
  }
  font-size: 4rem;
  font-weight: 700;

  margin-top: 68px;
  margin-bottom: 70px;
`;

export default Category;
