import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import { fetchStory, fetchUser } from "~/modules/firebase";
import NextHead from "next/head";
import Header from "~/components/header";
import Notfound from "~/pages/404";
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

type Props =
  | {
      permissionDenied: false;
      content: Content;
    }
  | {
      permissionDenied: true;
    };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.query.storyid;
  const uid = context.query.userid;
  if (typeof id === "string" && typeof uid === "string") {
    try {
      const snapshot = await fetchStory(uid, id);
      const data = snapshot.data();
      const name = (await fetchUser(uid)).data().name;
      return {
        props: {
          permissionDenied: false,
          content: {
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
        },
      };
    } catch {}
  }
  return {
    props: {
      permissionDenied: true,
    },
  };
};

const Details: NextPage<Props> = (props) => {
  const query = useRouter().query;
  const [content, setContent] = useState(
    props.permissionDenied === false ? props.content : undefined
  );
  const [notfound, setNotfound] = useState<boolean>();
  useEffect(() => {
    const storyid = query.storyid;
    const uid = query.userid;
    if (
      props.permissionDenied &&
      notfound === undefined &&
      typeof storyid === "string" &&
      typeof uid === "string"
    ) {
      let unmounted = false;
      (async () => {
        try {
          const snapshot = await fetchStory(uid, storyid);
          const data = snapshot.data();
          const name = (await fetchUser(uid)).data().name;
          if (!unmounted) {
            setContent({
              id: storyid,
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
            });
          }
        } catch {
          if (!unmounted) {
            setNotfound(true);
          }
        }
      })();
      return () => {
        unmounted = true;
      };
    }
  }, [props.permissionDenied, query, notfound]);
  if (notfound) {
    return <Notfound />;
  }
  return (
    <div>
      <NextHead>
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="short-story.space" />
        {content && (
          <>
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
          </>
        )}
      </NextHead>
      <Header />
      {content && (
        <>
          <main>
            <Template content={content} />
          </main>
        </>
      )}
    </div>
  );
};

export default Details;
