import { NextPage, GetServerSideProps } from "next";
import NextHead from "next/head";
import LoginTemplate from "~/template/login";

interface Props {
  path: string | null;
  as: string | null;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const as = context.query.redirect_to_as;
  const path = context.query.redirect_to_path;
  console.log(path, as);
  return {
    props: {
      path: typeof path === "string" ? path : null,
      as: typeof as === "string" ? as : null,
    },
  };
};

const Login: NextPage<Props> = (props) => (
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
    <main>
      <LoginTemplate {...props} />
    </main>
  </>
);

export default Login;
