import { useReducer } from "react";

export const useReducerWithMiddleware = (reducer, initialState, middleware) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const thunkDispatch = action => {
    if (typeof action === "function") {
      return action(thunkDispatch, state)
    }

    return middleware(dispatch(action))
  };
    return [state, thunkDispatch];
};