import { reducer, initialState, Action as EditorAction, ActionType as EditorActionType, State as EditorState } from './reducer'
import StoryEditorContext from './context'

export const Context = StoryEditorContext
export type Action = EditorAction
export const ActionType = EditorActionType
export type State = EditorState

export default {
  reducer,
  initialState,
}