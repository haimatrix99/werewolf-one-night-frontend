import { Role } from "../lib/enums";
import { Action, State } from "../lib/types";

export function reducer(state: State, action: Action) {
  if (action.type === "plus") {
    state.rolesPool.push(action.roles[action.index] as Role);
    return {
      rolesPool: state.rolesPool,
      numbers: state.numbers.map((number, index) =>
        index === action.index ? number + 1 : number
      ),
    };
  } else {
    const index = state.rolesPool.indexOf(action.roles[action.index] as Role);
    state.rolesPool.splice(index, 1);
    return {
      rolesPool: state.rolesPool,
      numbers: state.numbers.map((number, index) =>
        index === action.index ? number - 1 : number
      ),
    };
  }
}
