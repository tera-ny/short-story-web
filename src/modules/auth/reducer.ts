import { Reducer } from "react";
import firebase from 'firebase'

export interface State {
  user?: {
    uid: string,
    emailVerified: boolean
  }
  subscribed: boolean
}

export enum ActionType {
  changed = 'AUTH_STATE_CHANGED',
}

export type Action = {
  type: ActionType.changed
  payload: { user: firebase.User | null }
}

export const initialState: State = ({ subscribed: false, user: undefined })

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.changed:
      const user = action.payload.user ? {
        uid: action.payload.user.uid,
        emailVerified: action.payload.user.emailVerified
      } : undefined
      return {
        subscribed: true, user: user
      };
    default:
      return state;
  }
};

