import { Reducer } from "react";
import firebase from 'firebase/app'
import 'firebase/auth'

export interface State {
  auth?: {
    user?: {
      uid: string,
      emailVerified: boolean
    }
    profile?: {
      name: string
      icon?: string
    }
  }
  subscribers: {
    profile?: () => void,
    auth?: firebase.Unsubscribe
  }
}

export enum ActionType {
  changedProfile = 'AUTH_STATE_CHANGED_Profile',
  changedAuth = 'AUTH_STATE_CHNAGED_AUTH',
  subscribe = 'AUTH_STATE_SUBSCRIBE'
}

export type Action = {
  type: ActionType.subscribe
  payload: {
    subscriber: firebase.Unsubscribe
  }
} | {
  type: ActionType.changedProfile
  payload?: {
    name: string
    icon?: string
  }
} | {
  type: ActionType.changedAuth
  payload?: {
    uid: string,
    emailVerified: boolean
    subscribed: () => void,
  }
}

export const initialState: State = ({ subscribers: {}, auth: undefined })

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.subscribe:
      if (state.subscribers.auth) {
        state.subscribers.auth()
      }
      return {
        ...state, subscribers: { auth: action.payload.subscriber }
      }
    case ActionType.changedProfile:
      return {
        ...state, profile: action.payload
      };
    case ActionType.changedAuth:
      if (state.subscribers.profile) {
        state.subscribers.profile()
      }
      if (action.payload) {
        if (state.auth?.user?.uid ?? undefined !== action.payload.uid) {
          return {
            ...state, auth: {
              user: action.payload,
              profile: undefined
            }
          }
        } else {
          return {
            ...state, auth: { user: action.payload }
          }
        }
      } else {
        return {
          ...state, auth: undefined
        }
      }
    default:
      return state;
  }
};

