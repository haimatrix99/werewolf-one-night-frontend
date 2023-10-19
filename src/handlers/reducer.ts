type Action = {
  index: number;
  type: "plus" | "minus";
};

type State = {
  numbers: number[];
};

export function reducer(state: State, action: Action) {
  if (action.type === "plus") {
    return {
      numbers: state.numbers.map((number, index) =>
        index === action.index ? number + 1 : number
      ),
    };
  } else {
    return {
      numbers: state.numbers.map((number, index) =>
        index === action.index ? number - 1 : number
      ),
    };
  }
}
