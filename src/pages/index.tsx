import Header from "~/components/header";
import NextHead from "next/head";
import Template from "~/template/top";
import { NextPage, GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  return { props: {} };
};

const Home: NextPage = () => {
  return (
    <div>
      <NextHead>
        <title>short-story.space</title>
        <meta property="og:title" content="short-story.space トップ" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="short-story.space" />
        <meta
          property="og:description"
          content="short-story.spaceは小説を1000文字以内で投稿できるプラットフォームです。見たこと感じたこと考えたことを思うままに投稿してみましょう！"
        />
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
