import { NextPage, GetStaticProps } from "next";
import NextHead from "next/head";
import LoginTemplate from "~/template/login";
import Header from "~/components/header";

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

const Login: NextPage = () => (
  <>
    <NextHead>
      <meta property="og:title" content="short-story.space ログイン" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="short-story.space" />
      <meta
        property="og:description"
        content="short-story.spaceにログインして作品の投稿をしてみましょう。"
      />
    </NextHead>
    <Header />
    <main>
      <LoginTemplate />
    </main>
  </>
);

export default Login;
