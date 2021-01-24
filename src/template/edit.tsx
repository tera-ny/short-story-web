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
    if (context.subscribed?.user) {
      let unmounted = false;
      (async () => {
        try {
          const snapshot = await fetchStory(
            context.subscribed.user.uid,
            props.id
          );
          if (!unmounted) {
            dispatch({
              type: ActionType.fetchData,
              payload: { ref: snapshot.ref, story: snapshot.data() },
            });
            setNotfound(false);
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
  }, [props.id, context.subscribed]);

  useEffect(() => {
    if (state.submitted && context.subscribed?.user) {
      router.push({
        pathname: "/users/[userid]/stories/[storyid]",
        query: { userid: context.subscribed.user.uid, storyid: props.id },
      });
    }
  }, [state.submitted, context.subscribed]);

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
