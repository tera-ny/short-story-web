import { Reducer } from "react";
import firebase from 'firebase'

export interface State {
  title: string;
  body: string;
  limit: number;
  ref?: firebase.firestore.DocumentReference
}

export enum ActionType {
  updateTitle = 'EDIT_STORY_UPDATE_TITLE',
  updateBody = 'EDIT_STORY_UPDATE_BODY',
  submitted = 'EDIT_STORY_SUBMIT'
}

export type Action = {
  type: ActionType.updateTitle | ActionType.updateBody
  payload: { text: string }
} | { type: ActionType.submitted, payload: { ref: firebase.firestore.DocumentReference } }

export const initialState: State = ({ title: '', body: '', limit: 1000 })

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.updateTitle:
      return { ...state, title: action.payload.text };
    case ActionType.updateBody:
      return { ...state, body: action.payload.text }
    case ActionType.submitted:
      return { ...state, ref: action.payload.ref }
    default:
      return state;
  }
};

