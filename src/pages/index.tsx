import Header from "~/components/header";
import NextHead from "next/head";
import Template from "~/template/top";
import { NextPage, GetServerSideProps } from "next";
import "firebase/firestore";
import { Story } from "~/modules/entity";
import { firebaseApp } from "~/modules/firebase";

interface Props {
  stories: Story[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const query = firebaseApp()
    .firestore()
    .collection("stories")
    .where("isPublished", "==", true)
    .where("isActive", "==", true)
    .limit(3);
  const result = await query.get();
  const stories = result.docs.map((snapshot) => snapshot.data() as Story);
  console.log(stories);
  return { props: { stories } };
};

const Home: NextPage<Props> = (props) => {
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
      </NextHead>
      <Header />
      <main>
        <Template stories={props.stories} />
      </main>
    </div>
  );
};

export default Home;
