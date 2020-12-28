import { createGlobalStyle } from "styled-components";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { initializeApp } from "~/modules/firebase";
import NextHead from "next/head";

const GrobalStyles = createGlobalStyle`
  html {
    font-family: 'Noto Sans JP', sans-serif;
  }
  a {
    text-decoration: none;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeApp();
  });
  return (
    <>
      <NextHead>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;500;700&display=swap"
          rel="stylesheet"
        />
      </NextHead>
      <GrobalStyles />
      <Component {...pageProps} />
    </>
  );
}
