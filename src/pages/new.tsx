import { NextPage } from "next";
import { useReducer } from "react";
import StoryForm from "~/components/storyform";
import storyEditor from "~/modules/storyeditor";
import Header from "~/components/header";

const PostStory: NextPage = () => {
  const [state, dispatch] = useReducer(
    storyEditor.reducer,
    storyEditor.initialState
  );
  return (
    <>
      <Header />
      <div>
        <StoryForm dispatch={dispatch} />
      </div>
    </>
  );
};

export default PostStory;
