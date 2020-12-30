import { NextPage } from "next";
import { useReducer } from "react";
import StoryForm from "~/components/storyeditor";
import storyEditor from "~/modules/storyeditor";
import Header from "~/components/header";
import EditorTemplate from "~/template/new";
import NextHead from "next/head";

const PostStory: NextPage = () => {
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
        <EditorTemplate />
      </main>
    </>
  );
};

export default PostStory;
