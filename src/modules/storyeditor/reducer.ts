import { Reducer } from "react";

export interface State {
  title: string;
  body: string;
}

export enum ActionType {
  updateTitle = 'EDIT_STORY_UPDATE_TITLE',
  updateBody = 'EDIT_STORY_UPDATE_BODY',
}

export type Action = {
  type: ActionType.updateTitle | ActionType.updateBody
  payload: { text: string }
}

export const initialState: State = ({ title: '', body: '' })

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.updateTitle:
      return { ...state, title: action.payload.text };
    case ActionType.updateBody:
      return { ...state, body: action.payload.text }
    default:
      return state;
  }
};

