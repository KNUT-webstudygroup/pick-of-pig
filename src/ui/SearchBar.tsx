"use client";

import styled from "styled-components";
import SearchBarIcon from "./icon/search-bar-icon";

function SearchBar({
  handleInputChange,
  handleSearchClick,
  searchAddress,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchClick: () => void;
  searchAddress: string;
}) {
  return (
    <SearchBarStyled>
      <input
        type="text"
        id="address"
        value={searchAddress}
        style={{ color: "black" }}
        onChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearchClick();
          }
        }}
      />
      <SearchBarIcon handleSearchClick={handleSearchClick} />
    </SearchBarStyled>
  );
}

export default SearchBar;

const SearchBarStyled = styled.div`
  display: flex;
  position: relative;
  height: 60px;
  width: 100%;

  & > input {
    background-color: #e37d82;
    padding-left: 30px;
    padding-right: 80px;
    height: 100%;
    width: 100%;
    border-radius: 15px;
    border-width: 0;
    color: black;
    font-size: 1.5rem;
  }

  & > input:focus {
    outline: none;
  }

  & > div {
    position: absolute;
    top: 15px;
    right: 30px;
    font-size: 30px;
  }
`;

const SearchBarIconStyled = styled.div`
  width: 35px;
  height: 35px;
`;
