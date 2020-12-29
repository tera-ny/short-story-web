import { Reducer, useReducer } from "react";
import firebase from 'firebase'

export interface State {
  uid?: string
  subscribed: boolean
}

export enum ActionType {
  changed = 'AUTH_STATE_CHANGED',
}

export type Action = {
  type: ActionType.changed
  payload: { user: firebase.User | null }
}

export const initialState: State = ({ subscribed: false, uid: undefined })

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.changed:
      return { subscribed: true, uid: action.payload.user?.uid };
    default:
      return state;
  }
};

