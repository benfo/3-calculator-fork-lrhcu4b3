
const operators = {
  "+": (a = 0, b = 0) => a + b,
  "-": (a = 0, b = 0) => a - b,
  x: (a = 0, b = 0) => a * b,
  "/": (a = 0, b = 0) => a / b,
};

const isStrNumber = (value) => /([\d\.]+)/.test(value);

export function calc(state, value) {
  let last = state.pop() || "";
  switch (value) {
    case "=":
      state = [...state, last];
      let total = state.reduce((total, value, index) => {
        if (isStrNumber(value)) {
          let prev = state[index - 1];
          value = Number(value);
          return operators[prev] ? operators[prev](total, value) : value;
        }
        return total;
      }, 0);
      return [total];
    case "C":
      return [];
    case "CE":
      return state;
    case "+-":
      return [...state, last * -1];
    default:
      return [
        ...state,
        ...(isStrNumber(last) && isStrNumber(value)
          ? [last + value]
          : [last, value]),
      ];
  }
}