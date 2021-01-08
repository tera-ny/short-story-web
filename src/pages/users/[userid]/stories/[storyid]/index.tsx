import { useRouter } from "next/router";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { fetchStory, fetchUser } from "~/modules/firebase";
import NextHead from "next/head";
import Header from "~/components/header";
import Template from "~/template/details";
import { format } from "~/modules/date";

export interface Content {
  id: string;
  title: string;
  body: string;
  displayTime: string;
  user: {
    id: string;
    name: string;
  };
  meta: {
    publishedTime: string;
    modifiedTime: string;
  };
}

type Props = Content;

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params.storyid;
  const uid = params.userid;
  if (typeof id === "string" && typeof uid === "string") {
    try {
      const [snapshot, userSnapshot] = await Promise.all([
        fetchStory(uid, id),
        fetchUser(uid),
      ]);
      const data = snapshot.data();
      const name = userSnapshot.data().name;
      return {
        props: {
          id,
          title: data.title,
          body: data.body,
          displayTime: format(data.createTime.toDate(), "YYYY/MM/DD"),
          user: {
            id: uid,
            name,
          },
          meta: {
            publishedTime: format(data.createTime.toDate()),
            modifiedTime: format(data.updateTime.toDate()),
          },
        },
        revalidate: 60,
      };
    } catch {}
  }
  return {
    notFound: true,
    revalidate: 60,
  };
};

const Details: NextPage<Props> = (content) => {
  const query = useRouter().query;
  return (
    <div>
      <NextHead>
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="short-story.space" />
        <title>{content.title} short-story.space</title>
        <meta
          property="og:title"
          content={content.title + " short-story.space"}
        />
        {/* Todo: append Author */}
        <meta property="article:author" content={content.user.name} />
        <meta
          property="article:published_time"
          content={content.meta.publishedTime}
        />
        <meta
          property="article:modified_time"
          content={content.meta.modifiedTime}
        />
        <meta
          property="og:description"
          content={
            content.body.length < 51
              ? content.body
              : content.body.substring(0, 50) + "..."
          }
        />
      </NextHead>
      <Header />
      <main>
        <Template content={content} />
      </main>
    </div>
  );
};

export default Details;
