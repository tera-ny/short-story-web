import { createGlobalStyle } from "styled-components";
import type { AppProps } from "next/app";
import NextHead from "next/head";

const GrobalStyles = createGlobalStyle`
  html {
    font-family: 'Noto Sans JP', sans-serif;
  }
  a {
    text-decoration: none;
  }
  body {
    margin: 0;
  }
  main {
    padding-bottom: 40px;
  }
  p {
    font-weight: 300;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
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
