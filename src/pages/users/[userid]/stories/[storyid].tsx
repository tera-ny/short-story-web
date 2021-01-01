import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import { firebaseApp, FirestorePath } from "~/modules/firebase";
import { Story } from "~/modules/entity";
import NextHead from "next/head";
import Header from "~/components/header";
import Notfound from "~/pages/404";
import StoryComponent from "~/components/story";
import styled from "styled-components";

interface Props {
  story?: Story;
}

const fetchStory = async (id: string) => {
  const response = await firebaseApp()
    .firestore()
    .collection(FirestorePath.story)
    .doc(id)
    .get();
  return response.data() as Story;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.query.storyid;
  if (typeof id === "string") {
    try {
      const story = await fetchStory(id);
      if (story.author === context.query.userid) {
        return {
          props: { story },
        };
      }
    } catch {}
  }
  return {
    props: {},
  };
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    max-width: 720px;
  }
`;

const Details: NextPage<Props> = (props) => {
  const query = useRouter().query;
  const [story, setStory] = useState(props.story);
  const [notfound, setNotfound] = useState<boolean>();
  useEffect(() => {
    const storyid = query.storyid;
    if (typeof storyid === "string" && !story) {
      let unmouted = false;
      (async () => {
        try {
          const story = await fetchStory(storyid);
          if (!unmouted) {
            setStory(story);
          }
        } catch {
          if (!unmouted) {
            setNotfound(true);
          }
        }
      })();
      return () => {
        unmouted = true;
      };
    }
  }, [props.story, query]);
  if (notfound) {
    return <Notfound />;
  }
  return (
    <div>
      <NextHead>
        <meta property="og:type" content="book" />
        <meta property="og:site_name" content="short-story.space" />
        {story && (
          <>
            <title>{story.title} short-story.space</title>
            <meta
              property="og:title"
              content={story.title + " short-story.space"}
            />
            {/* Todo: append Author */}
            <meta property="book:author" content={story.author} />
            <meta
              property="og:description"
              content={
                story.body.length < 51
                  ? story.body
                  : story.body.substring(0, 50) + "..."
              }
            />
          </>
        )}
      </NextHead>
      <Header />
      {story && (
        <>
          <main>
            <Container>
              <StoryComponent {...story} />
            </Container>
          </main>
        </>
      )}
    </div>
  );
};

export default Details;
