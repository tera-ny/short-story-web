import Header from "~/components/header";
import NextHead from "next/head";
import Template from "~/template/top";
import { NextPage, GetServerSideProps } from "next";
import "firebase/firestore";
import { firebaseApp } from "~/modules/firebase";
import { Story, storyConverter } from "~/modules/entity";

export interface Content {
  id: string;
  author: string;
  entity: Pick<Story, "title" | "body">;
}

interface Props {
  contents: Content[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
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

    const contents = result.docs.map(
      (snapshot): Content => {
        return {
          id: snapshot.id,
          /// /users/${uid}/${stories}/${storyid}
          author: snapshot.ref.parent.parent.id,
          entity: {
            title: snapshot.get("title"),
            body: snapshot.get("body"),
          },
        };
      }
    );
    return { props: { contents } };
  } catch (e) {
    console.error(e);
    return { props: { contents: [] } };
  }
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
        <Template contents={props.contents} />
      </main>
    </div>
  );
};

export default Home;
