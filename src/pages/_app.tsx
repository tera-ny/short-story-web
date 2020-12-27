import { createGlobalStyle } from "styled-components";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { initializeApp } from "~/modules/firebase";

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
      <GrobalStyles />
      <Component {...pageProps} />
    </>
  );
}
