import { Action, State } from "../lib/types";

export function reducer(state: State, action: Action) {
  if (action.type === "plus") {
    state.rolesPool.push(action.roles[action.index])
    return {
      rolesPool: state.rolesPool,
      numbers: state.numbers.map((number, index) =>
        index === action.index ? number + 1 : number
      ),
    };
  } else {
    state.rolesPool.pop()
    return {
      rolesPool: state.rolesPool,
      numbers: state.numbers.map((number, index) =>
        index === action.index ? number - 1 : number
      ),
    };
  }
}
