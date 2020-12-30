import { NextPage, GetServerSideProps } from "next";
import Header from "~/components/header";

interface Props {
  statusCode: number;
}

const Error: NextPage<Props> = ({ statusCode }) => (
  <>
    <Header />
    <main>
      <h1>short-story.space</h1>
      <h2>{statusCode}</h2>
      <p>予期せぬエラーが発生しました。ご迷惑をおかけします。</p>
      <h4>short-story.space 運営</h4>
    </main>
  </>
);

export const getServerSideProps: GetServerSideProps<Props> = async ({
  res,
}) => {
  return { props: { statusCode: res.statusCode } };
};

export default Error;
