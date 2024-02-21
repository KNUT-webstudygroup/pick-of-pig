import styled from "styled-components";
import MapSearchIcon from "./icon/map-search-icon";
import { useRouter } from "next/navigation";

function SearchMap() {
  const router = useRouter();

  const handleClick = () => {
    // const path: { pathname: string; query: string } = {
    //   pathname: "/Map",
    //   query: "test",
    // };
    // router.push({ pathname: `/Map`, query: `test` }, "test");
    // router.push(
    //   {
    //     pathname: "/Map",
    //     query: { 1: "test" },
    //   },
    //   "/order"
    // );
    router.push("/Map?test");
  };

  return (
    <SearchMapStyled onClick={handleClick}>
      <IconContainer>
        <MapSearchIcon />
      </IconContainer>
      <Title>지도로 보여줘</Title>
    </SearchMapStyled>
  );
}

const Title = styled.div`
  color: #fff;
  font-size: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchMapStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 320px;
  height: 70px;
  background-color: #e34a4a;
  border-radius: 45px;
  box-shadow: 0 10px 0 0 #cf3939;
  margin-bottom: 30px;
`;

const IconContainer = styled.div`
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export default SearchMap;
