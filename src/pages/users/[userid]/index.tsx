import { NextPage, GetServerSideProps } from "next";
import Header from "~/components/header";
import UserTemplate from "~/template/user";
import { firebaseApp, FirestorePath } from "~/modules/firebase";
import { storyConverter, userConverter } from "~/modules/entity";
import { format } from "~/modules/date";
import NextHead from "next/head";
import { Content } from "~/components/storycomponent";

export type Props =
  | {
      private: false;
      user: {
        id: string;
        name: string;
        icon: string | null;
      };
      contents: Content[];
    }
  | {
      private: true;
      user: {
        id: string;
      };
    };

const convertToBoolean = (text: string | string[]): boolean | undefined => {
  try {
    if (typeof text === "string") {
      return JSON.parse(text);
    }
  } catch {}
  return undefined;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const uid = context.query.userid;
  if (typeof uid === "string") {
    const includePrivate = convertToBoolean(context.query.includePrivate);
    if (includePrivate) {
      return { props: { private: true, user: { id: uid } } };
    }
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
        icon: userSnapshot.get("icon"),
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
            story.body.length < 201
              ? story.body
              : story.body.substring(0, 200) + "...";
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
          private: false,
          user: user,
          contents,
        },
      };
    } catch (e) {
      console.error(e);
    }
  }
  return { notFound: true };
};

const User: NextPage<Props> = (props) => {
  return (
    <>
      <NextHead>
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="short-story.space" />
        {props.private === false && (
          <>
            <title>{props.user.name} short-story.space</title>
            <meta
              property="og:title"
              content={`${props.user.name} short-story.space`}
            />
            <meta property="profile:username " content={props.user.name} />
            {/* Todo: description */}
          </>
        )}
      </NextHead>
      <Header />
      <main>
        <UserTemplate {...props} />
      </main>
    </>
  );
};

export default User;
