import { NextPage, GetServerSideProps } from "next";
import NextHead from "next/head";

export const getServerSideProps: GetServerSideProps = async () => {
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
  </>
);

export default Login;
