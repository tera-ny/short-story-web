import { NextPage, GetStaticProps } from "next";
import NextHead from "next/head";
import Header from "~/components/header";
import RegisterTemplate from "~/template/register";

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

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
      <main>
        <RegisterTemplate />
      </main>
    </>
  );
};

export default RegisterPage;
