import { State } from "./reducer";

const canRegisterTitle = (state: State) => 25 >= state.title.length && 0 < state.title.length
const canRegisterBody = (state: State) => state.limit >= state.body.length && 0 < state.body.length
const cnaRegister = (state: State) => canRegisterTitle(state) && canRegisterBody(state)

export default {
  canRegisterTitle,
  canRegisterBody,
  cnaRegister
}