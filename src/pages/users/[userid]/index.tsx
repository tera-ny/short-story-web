import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Header from "~/components/header";
import UserTemplate from "~/template/user";
import { firebaseApp, FirestorePath } from "~/modules/firebase";
import { storyConverter, userConverter } from "~/modules/entity";
import { format } from "~/modules/date";
import NextHead from "next/head";
import { Content } from "~/components/storycomponent";

export type Props = {
  user: {
    id: string;
    name: string;
    icon: string | null;
  };
  contents: Content[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const uid = params.userid;
  if (typeof uid === "string") {
    let user: {
      id: string;
      name: string;
      icon: string | null;
    };
    const userRef = firebaseApp()
      .firestore()
      .collection(FirestorePath.user)
      .doc(uid);
    try {
      const userSnapshot = await userRef.withConverter(userConverter).get();
      user = {
        id: userSnapshot.id,
        name: userSnapshot.get("name"),
        icon: userSnapshot.get("icon") ?? null,
      };
    } catch {
      return { notFound: true };
    }
    try {
      const contentsSnapshot = await userRef
        .collection(FirestorePath.story)
        .where("isPublished", "==", true)
        .where("isActive", "==", true)
        .orderBy("createTime", "desc")
        .withConverter(storyConverter)
        .get();
      const contents = contentsSnapshot.docs.map(
        (snapshot): Content => {
          const story = snapshot.data();
          const body =
            story.body.length <= 100
              ? story.body
              : story.body.substring(0, 100) + "...";
          return {
            id: snapshot.id,
            title: story.title,
            body: body,
            createTime: format(story.createTime.toDate(), "YYYY/MM/DD"),
          };
        }
      );
      return {
        props: {
          user: user,
          contents,
        },
        revalidate: 60,
      };
    } catch (e) {
      console.error(e);
    }
  }
  return { notFound: true, revalidate: 30 };
};

const User: NextPage<Props> = (props) => {
  return (
    <>
      <NextHead>
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="short-story.space" />
        <title>{props.user.name} short-story.space</title>
        <meta
          property="og:title"
          content={`${props.user.name} short-story.space`}
        />
        <meta property="profile:username " content={props.user.name} />
        <meta property="og:image" content={props.user.icon} />
        <meta property="og:description" content={""} />
      </NextHead>
      <Header />
      <main>
        <UserTemplate {...props} />
      </main>
    </>
  );
};

export default User;
