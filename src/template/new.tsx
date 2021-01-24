import { useRouter } from "next/router";
import { FC, useContext, useEffect, useReducer } from "react";
import StoryEditor from "~/components/storyeditor";
import { Context } from "~/modules/auth";
import storyEditorModule from "~/modules/storyeditor";

const New: FC = () => {
  const [state, dispatch] = useReducer(
    storyEditorModule.reducer,
    storyEditorModule.initialState
  );
  const router = useRouter();
  const context = useContext(Context);

  useEffect(() => {
    if (state.ref && context.subscribed?.user) {
      router.push(
        `/users/${context.subscribed.user.uid}/stories/${state.ref.id}`
      );
    }
  }, [state.ref, context.subscribed]);

  return (
    <Context.Consumer>
      {(authState) =>
        authState.subscribed && (
          <StoryEditor state={state} dispatch={dispatch} />
        )
      }
    </Context.Consumer>
  );
};

export default New;
