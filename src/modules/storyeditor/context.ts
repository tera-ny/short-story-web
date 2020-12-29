import { createContext } from 'react'
import { initialState, State } from './reducer'

const StoryEditorContext = createContext<State>(initialState);

export default StoryEditorContext