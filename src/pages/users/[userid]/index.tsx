import { NextPage, GetServerSideProps } from "next";
import Header from "~/components/header";
import UserTemplate from "~/template/user";
import { firebaseApp, FirestorePath } from "~/modules/firebase";
import { storyConverter, userConverter } from "~/modules/entity";
import { format } from "~/modules/date";
import NextHead from "next/head";

export interface Content {
  id: string;
  title: string;
  body: string;
  createTime: string;
}

export interface Props {
  user?: {
    id: string;
    name: string;
  };
  contents: Content[];
}

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
  const includePrivate = convertToBoolean(context.query.includePrivate);
  if (includePrivate) {
    return { props: { contents: [] } };
  }
  const uid = context.query.userid;
  if (typeof uid === "string") {
    try {
      const userRef = firebaseApp()
        .firestore()
        .collection(FirestorePath.user)
        .doc(uid);
      const userSnapshot = await userRef.withConverter(userConverter).get();
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
          user: { id: userSnapshot.id, name: userSnapshot.get("name") },
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
        {props.user && (
          <>
            <title>{props.user.name} short-story.space</title>
            <meta
              property="og:title"
              content={`${props.user.name} short-story.space`}
            />
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
