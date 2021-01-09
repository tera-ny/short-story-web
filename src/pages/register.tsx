import { NextPage } from "next";
import NextHead from "next/head";
import Header from "~/components/header";

const RegisterPage: NextPage = () => {
  return (
    <>
      <NextHead>
        <title>新規のユーザー登録 - short-story.space</title>
        <meta property="og:site" content="website" />
        <meta
          property="og:title"
          content="新規ユーザー登録 - short-story.space"
        />
        <meta
          property="og:description"
          content="ユーザー登録をして自分の思い描いた物語を投稿しよう！"
        />
      </NextHead>
      <Header />
      <main></main>
    </>
  );
};

export default RegisterPage;
