import Header from "~/components/header";
import NextHead from "next/head";
import { NextPage, GetStaticProps } from "next";
import "firebase/firestore";
import styled from "styled-components";

export const getStaticProps: GetStaticProps<{}> = async () => {
  return { props: {} };
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 40px;
`;

const Home: NextPage = () => {
  return (
    <Container>
      <NextHead>
        <title>short-story.space</title>
        <meta property="og:title" content="short-story.space トップ" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="short-story.space" />
        <meta
          property="og:description"
          content="short-story.spaceは小説を1000文字以内で投稿できるプラットフォームです。見たこと感じたこと考えたことを思うままに投稿してみましょう！"
        />
      </NextHead>
      <Header />
      <Main>
        <Title>Comming Soon!</Title>
        <p>近日公開予定です</p>
      </Main>
    </Container>
  );
};

export default Home;
