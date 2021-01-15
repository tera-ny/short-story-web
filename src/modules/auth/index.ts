import { Dispatch } from "react";
import { Action, ActionType, reducer, initialState } from "./reducer";
import { firebaseApp, FirestorePath } from "~/modules/firebase";
import AuthContext from "./context";
// import { userConverter } from '../entity'

export const listen = (dispatch: Dispatch<Action>) => {
  const auth = firebaseApp().auth();
  let subscriber = auth.onAuthStateChanged(async (user) => {
    if (user) {
      // let subscriber = firebaseApp().firestore().collection(FirestorePath.user).doc(user.uid).withConverter(userConverter)
      //   .onSnapshot((snapshot) => {
      //     const user = snapshot.data()
      //     dispatch({
      //       type: ActionType.changedProfile,
      //       payload: user
      //     })
      //   })
      dispatch({
        type: ActionType.changedAuth,
        payload: {
          uid: user.uid,
          emailVerified: user.emailVerified,
          subscribed: subscriber,
        },
      });
    } else {
      dispatch({
        type: ActionType.changedAuth,
      });
    }
  });
  dispatch({
    type: ActionType.subscribe,
    payload: {
      subscriber,
    },
  });
};

export const Context = AuthContext;

export default {
  listen,
  reducer,
  initialState,
};
