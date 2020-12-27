import Header from "~/components/header";
import NextHead from "next/head";
import { FC } from "react";
import Template from "~/template/top";

const Home: FC = () => {
  return (
    <div>
      <NextHead>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;500;700&display=swap"
          rel="stylesheet"
        />
      </NextHead>
      <Header />
      <main>
        <Template />
      </main>
    </div>
  );
};

export default Home;
