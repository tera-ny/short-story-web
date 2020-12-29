import { NextPage } from "next";
import { useReducer } from "react";
import StoryForm from "~/components/storyform";
import storyEditor from "~/modules/storyeditor";
import Header from "~/components/header";
import { Context } from "~/modules/auth";
import NextHead from "next/head";

const PostStory: NextPage = () => {
  const [state, dispatch] = useReducer(
    storyEditor.reducer,
    storyEditor.initialState
  );
  return (
    <>
      <NextHead>
        <meta property="og:title" content="short-story.space 作品投稿" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="short-story.space" />
        <meta
          property="og:description"
          content="short-story.spaceに自分だけのオリジナル作品の投稿をしてみましょう！"
        />
      </NextHead>
      <Header />
      <main>
        <Context.Consumer>
          {(state) =>
            state.uid && state.subscribed ? (
              <StoryForm dispatch={dispatch} />
            ) : (
              <></>
            )
          }
        </Context.Consumer>
      </main>
    </>
  );
};

export default PostStory;
