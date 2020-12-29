import { reducer, initialState, Action as EditorAction, ActionType as EditorActionType } from './reducer'
import StoryEditorContext from './context'

export const Context = StoryEditorContext
export type Action = EditorAction
export const ActionType = EditorActionType

export default {
  reducer,
  initialState,
}