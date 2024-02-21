import OptionsBtns from "@/ui/OptionsBtns";
import SearchMap from "@/ui/SearchMap";
import { useState } from "react";
import styled from "styled-components";

function Options() {
  const [option, setOption] = useState();

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
  background-color: var(--main-bg-color);
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

const SearchMapContainer = styled.div`
  // margin-top: 70px;
  display: flex;
  justify-content: flex-end;
  // width: 100%;
  // height: 100%;
`;
