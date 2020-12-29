import { createContext } from 'react'
import { initialState, State } from './reducer'

const LogInContext = createContext<State>(initialState);

export default LogInContext