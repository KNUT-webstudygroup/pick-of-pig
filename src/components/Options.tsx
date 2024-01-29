import OptionsBtns from "@/ui/OptionsBtns";
import SearchMap from "@/ui/SearchMap";
import styled from "styled-components";

function Options() {
  return (
    <OptionsContainer>
      <Title>Options</Title>
      <OptionsBtns />
      <SearchMapContainer>
        <SearchMap />
      </SearchMapContainer>
    </OptionsContainer>
  );
}

export default Options;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 64px;
  font-weight: 700;

  margin-top: 68px;
  margin-bottom: 70px;
`;

const SearchMapContainer = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
