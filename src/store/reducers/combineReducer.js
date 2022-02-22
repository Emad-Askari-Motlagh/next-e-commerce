import authReducer, { userState } from "./userReducer"
import filtersReducer, { filterState } from "./filtersReducer"
import errorReducer from "./errorReducer"
import productRrducer, { productState } from "./productsReducer"
import cartReducer, { cardState } from "./cartReducer"

const reducers = {
  userState: authReducer,
  filtersState: filtersReducer,
  errorState: errorReducer,
  productState: productRrducer,
  cartState: cartReducer,
}

const initialState = {
  userState: { ...userState },
  filterState: { ...filterState },
  productState: { ...productState },
  cardState: { ...cardState },
}

const combineReducers = () => {
  return (state, action) => {
    return Object.keys(reducers).reduce((acc, prop) => {
      return {
        ...acc,
        ...reducers[prop]({ [prop]: acc[prop] }, action),
      }
    }, state)
  }
}

export { combineReducers, initialState }
