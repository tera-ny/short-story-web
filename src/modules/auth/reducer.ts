import { Reducer } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export interface State {
  auth?: {
    user?: {
      uid: string;
      emailVerified: boolean;
    };
  };
  subscribers: {
    auth?: firebase.Unsubscribe;
  };
}

export enum ActionType {
  changedAuth = "AUTH_STATE_CHNAGED_AUTH",
  subscribe = "AUTH_STATE_SUBSCRIBE",
}

export type Action =
  | {
      type: ActionType.subscribe;
      payload: {
        subscriber: firebase.Unsubscribe;
      };
    }
  | {
      type: ActionType.changedAuth;
      payload?: {
        uid: string;
        emailVerified: boolean;
        subscribed?: () => void;
      };
    };

export const initialState: State = { subscribers: {}, auth: undefined };

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.subscribe:
      if (state.subscribers.auth) {
        state.subscribers.auth();
      }
      return {
        ...state,
        subscribers: { auth: action.payload.subscriber },
      };
    case ActionType.changedAuth:
      if (action.payload) {
        return {
          ...state,
          auth: {
            user: action.payload,
          },
        };
      } else {
        return {
          ...state,
          auth: { user: undefined },
        };
      }
    default:
      return state;
  }
};
