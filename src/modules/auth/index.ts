import { Dispatch } from 'react'
import { Action, ActionType, reducer, initialState } from './reducer'
import { firebaseApp } from '~/modules/firebase'
import AuthContext from './context'

export const listen = (dispatch: Dispatch<Action>) => {
  const auth = firebaseApp().auth()
  return auth.onAuthStateChanged((user) => {
    console.log(user)
    dispatch({
      type: ActionType.changed,
      payload: { user }
    })
  });
}

export const Context = AuthContext

export default {
  listen,
  reducer,
  initialState,
}