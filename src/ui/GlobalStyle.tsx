import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --main-bg-color : #FFB9B4;
    --pig-color : #FF9A9F;
    --pig-shadow-color : #E37D82
  }

  img {
    width: 100%;
    height: 100%;
    
  }

  *{
    padding : 0px;
    margin : 0px;
    // font-size : 1rem;
    color: #000;
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
    width : 100%; /* 100vw는 화면의 UX등을 묵살하기 때문에, https://bumday.tistory.com/99 를 참고해 100%로 변경.*/
    height : 100vh;
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
