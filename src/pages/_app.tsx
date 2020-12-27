import { createGlobalStyle, ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";

const GrobalStyles = createGlobalStyle`
  html {
    font-family: 'Noto Sans JP', sans-serif;
  }
  a {
    text-decoration: none;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GrobalStyles />
      <Component {...pageProps} />
    </>
  );
}
