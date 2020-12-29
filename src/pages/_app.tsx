import { createGlobalStyle } from "styled-components";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import { useEffect, useReducer } from "react";
import auth from "~/modules/auth";
import { Context } from "~/modules/auth";

const GrobalStyles = createGlobalStyle`
  html {
    font-family: 'Noto Sans JP', sans-serif;
  }
  a {
    text-decoration: none;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(auth.reducer, auth.initialState);
  useEffect(() => {
    return auth.listen(dispatch);
  }, []);
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
      <Context.Provider value={state}>
        <Component {...pageProps} />
      </Context.Provider>
    </>
  );
}
