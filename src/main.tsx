import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "../node_modules/react-router-dom/dist/index";
import App from "./App";
import GlobalStyle from "./GlobalStyle";
import Map from "./Map";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
      <Map />
    </BrowserRouter>
  </React.StrictMode>
);
