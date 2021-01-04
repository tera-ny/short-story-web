import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import { fetchStory } from "~/modules/firebase";
import NextHead from "next/head";
import Header from "~/components/header";
import Notfound from "~/pages/404";
import Template, { Props } from "~/template/details";

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.query.storyid;
  const uid = context.query.userid;
  if (typeof id === "string" && typeof uid === "string") {
    try {
      const snapshot = await fetchStory(uid, id);
      return {
        props: {
          item: {
            title: snapshot.get("title"),
            body: snapshot.get("body"),
          },
        },
      };
    } catch {}
  }
  return {
    props: {},
  };
};

const Details: NextPage<Props> = (props) => {
  const query = useRouter().query;
  const [item, setItem] = useState(props.item);
  const [notfound, setNotfound] = useState<boolean>();
  useEffect(() => {
    const storyid = query.storyid;
    const uid = query.userid;
    if (typeof storyid === "string" && typeof uid === "string" && !item) {
      let unmounted = false;
      (async () => {
        try {
          const snapshot = await fetchStory(uid, storyid);
          if (!unmounted) {
            setItem(snapshot.data());
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
  }, [props.item, query]);
  if (notfound) {
    return <Notfound />;
  }
  return (
    <div>
      <NextHead>
        <meta property="og:type" content="book" />
        <meta property="og:site_name" content="short-story.space" />
        {item && (
          <>
            <title>{item.title} short-story.space</title>
            <meta
              property="og:title"
              content={item.title + " short-story.space"}
            />
            {/* Todo: append Author */}
            <meta
              property="og:description"
              content={
                item.body.length < 51
                  ? item.body
                  : item.body.substring(0, 50) + "..."
              }
            />
          </>
        )}
      </NextHead>
      <Header />
      {item && (
        <>
          <main>
            <Template item={item} />
          </main>
        </>
      )}
    </div>
  );
};

export default Details;
