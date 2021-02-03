import Header from "~/components/header";
import NextHead from "next/head";
import { NextPage, GetStaticProps } from "next";
import "firebase/firestore";
import { firebaseApp } from "~/modules/firebase";
import { storyConverter, userConverter } from "~/modules/entity";
import { format } from "~/modules/date";
import { Content as StoryContent } from "~/components/storycomponent";
import styled from "styled-components";

export type Content = StoryContent & { user: { id: string; name: string } };

interface Props {
  contents: Content[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const query = firebaseApp()
    .firestore()
    .collectionGroup("stories")
    .where("isPublished", "==", true)
    .where("isActive", "==", true)
    .orderBy("createTime", "desc")
    .withConverter(storyConverter)
    .limit(3);
  try {
    const result = await query.get();

    const contents = await Promise.all(
      result.docs.map(
        async (snapshot): Promise<Content> => {
          const data = snapshot.data();
          const authorRef = snapshot.ref.parent.parent;
          const userSnapshot = await authorRef
            .withConverter(userConverter)
            .get();
          const userData = userSnapshot.data();
          return {
            id: snapshot.id,
            user: {
              id: userSnapshot.id,
              name: userSnapshot.get("name") ?? "",
            },
            title: data.title,
            body: data.body,
            createTime: format(userData.createTime.toDate(), "YYYY/MM/DD"),
          };
        }
      )
    );
    return { props: { contents }, revalidate: 120 };
  } catch (e) {
    console.error(e);
    return { props: { contents: [] }, revalidate: 30 };
  }
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

const Home: NextPage<Props> = (props) => {
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
