import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

function SearchBar(color: string) {
  return (
    <SearchBarStyled>
      <input placeholder="메뉴 검색" color={color} />
      <span className="material-symbols-outlined icon">search</span>
    </SearchBarStyled>
  );
}

const SearchBarStyled = styled.div`
  display: flex;

  width: 100%;
  justify-content: center;

  & > input {
    height: 70px;
    border-radius: 10px;
    border-color: #fff;
    color: black;
  }

  & > .icon {
    font-size: 70px;
  }
`;

export default SearchBar;
