import Header from "~/components/header";
import NextHead from "next/head";
import Template from "~/template/top";
import { NextPage, GetServerSideProps } from "next";
import "firebase/firestore";
import { firebaseApp } from "~/modules/firebase";
import { storyConverter, userConverter } from "~/modules/entity";
import { format } from "~/modules/date";
import { Content as StoryContent } from "~/components/storycomponent";

export type Content = StoryContent & { user: { id: string; name: string } };

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
            /// /users/${uid}/${stories}/${storyid}
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
