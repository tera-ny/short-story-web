import { useRouter } from "next/router";
import { FC, useContext, useEffect, useReducer, useState } from "react";
import StoryEditor from "~/components/storyeditor";
import { Context } from "~/modules/auth";
import { fetchStory } from "~/modules/firebase";
import storyEditorModule from "~/modules/storyeditor";
import { ActionType } from "~/modules/storyeditor/reducer";
import Notfound from "~/pages/404";

interface Props {
  id: string;
}

const Edit: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(
    storyEditorModule.reducer,
    storyEditorModule.initialState
  );
  const context = useContext(Context);
  const [notfound, setNotfound] = useState<boolean>();
  const router = useRouter();
  useEffect(() => {
    if (context.uid) {
      let unmouted = false;
      (async () => {
        try {
          const story = await fetchStory(props.id);
          if (!unmouted) {
            dispatch({
              type: ActionType.fetchData,
              payload: { id: props.id, story },
            });
            setNotfound(false);
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
  }, [props.id, context.uid]);

  useEffect(() => {
    if (state.submitted && context.uid) {
      router.push({
        pathname: "/users/[userid]/stories/[storyid]",
        query: { userid: context.uid, storyid: props.id },
      });
    }
  }, [state.submitted, context.uid]);

  if (notfound) {
    return <Notfound />;
  }

  return notfound === false ? (
    <StoryEditor state={state} dispatch={dispatch} />
  ) : (
    <></>
  );
};

export default Edit;
