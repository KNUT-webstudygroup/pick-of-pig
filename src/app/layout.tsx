"use client";

import type { Metadata } from "next";
import styled from "styled-components";
import { Inter } from "next/font/google";
import GlobalStyle from "@/ui/GlobalStyle";
// import "@/ui/css/globals.css";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* 나중에 정리 */}
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        {/* <script
          type="text/javascript"
          src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=%CLIENT_ID%&submodules=geocoder"
        ></script> */}
        <script
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.CLIENT_ID}&submodules=geocoder`}
        />

        <title>pigs of pick</title>
      </head>
      <GlobalStyle />
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;

// const Test = styled.div``;
