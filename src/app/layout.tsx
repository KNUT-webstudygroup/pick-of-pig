'use client';

import type { Metadata } from 'next';
import styled from 'styled-components';
import { Inter } from 'next/font/google';
import GlobalStyle from '@/ui/GlobalStyle';
import { RecoilRoot } from 'recoil';
import { GoogleOAuthProvider } from '@react-oauth/google';
import OAuth2 from '@/components/oauth2';
import oauthKey from '@/service/oauth2key';
// import "@/ui/css/globals.css";

const inter = Inter({ subsets: ['latin'] });

function RootLayout({ children }: { children: React.ReactNode }) {
  const clientKey = oauthKey;
  return (
    <html lang="en">
      <head>
        {/* 나중에 정리 */}
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>pigs of pick</title>
        <meta name="description" content="Pick of pigs" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?&key=${process.env.GOOGLE_MAP_ID}&libraries=places`}
        />
      </head>
      <GoogleOAuthProvider clientId={clientKey}>
        <RecoilRoot>
          <GlobalStyle />
          <body>{children}</body>
        </RecoilRoot>
      </GoogleOAuthProvider>
    </html>
  );
}

export default RootLayout;

// const Test = styled.div``;
