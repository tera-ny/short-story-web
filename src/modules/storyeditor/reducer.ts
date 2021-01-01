import { Reducer } from "react";
import firebase from 'firebase'
import { Story } from "../entity";
import { firebaseApp, FirestorePath } from "../firebase";

export interface State {
  title: string;
  body: string;
  isActive: boolean;
  isPublished: boolean;
  limit: number;
  ref?: firebase.firestore.DocumentReference,
  submitted: boolean;
}

export enum ActionType {
  updateTitle = 'EDIT_STORY_UPDATE_TITLE',
  updateBody = 'EDIT_STORY_UPDATE_BODY',
  submitted = 'EDIT_STORY_SUBMIT',
  fetchData = 'EDIT_STORY_FETCH_DATA'
}

export type Action = {
  type: ActionType.updateTitle | ActionType.updateBody
  payload: { text: string }
} | { type: ActionType.submitted, payload: { ref: firebase.firestore.DocumentReference } } | {
  type: ActionType.fetchData,
  payload: { id: string, story: Story }
}

export const mergeState = (id: string, story: Story, currentState: State): State => {
  return { ...currentState, ...story, ref: firebaseApp().firestore().collection(FirestorePath.story).doc(id) }
}

export const initialState: State = ({ title: '', body: '', isActive: true, isPublished: true, limit: 1000, submitted: false })

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.updateTitle:
      return { ...state, title: action.payload.text };
    case ActionType.updateBody:
      return { ...state, body: action.payload.text }
    case ActionType.submitted:
      return { ...state, ref: action.payload.ref, submitted: true }
    case ActionType.fetchData:
      return mergeState(action.payload.id, action.payload.story, state)
    default:
      return state;
  }
};

