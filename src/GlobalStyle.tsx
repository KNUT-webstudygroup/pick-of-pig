import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    padding : 0px;
	  margin : 0px;
	  font-size : 24px;
    color: #fff;
    font-family: Inter;
  }

  li {
    list-style-type: none;
  }
  button{
    background: inherit;
    border:none; 
    box-shadow:none; 
    border-radius:0; 
    padding:0; 
    overflow:visible; 
    cursor:pointer
  }

  img {
    width: 150px;
    height: 150px;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
  }

  input::placeholder {
    color: #fff;
    width: 300px;
  }

  .icon {
    color: #fff;
    font-size : 40px;
  }

`;

export default GlobalStyle;
