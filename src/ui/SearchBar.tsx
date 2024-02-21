import styled from "styled-components";
import SearchBarIcon from "./icon/search-bar-icon";

function SearchBar() {
  return (
    <SearchBarStyled>
      <SearchBarIcon />
      <input />
    </SearchBarStyled>
  );
}

const SearchBarStyled = styled.div`
  display: flex;
  position: relative;
  height: 60px;
  width: 400px;

  & > input {
    background-color: #e37d82;
    height: 100%;
    width: 100%;
    border-radius: 15px;
    border-width: 0;
    color: black;
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

export default SearchBar;
