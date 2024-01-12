import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    padding : 0px;
	  margin : 0px;
	  font-size : 24px;
    color: #fff;
    font-family: Inter;
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
