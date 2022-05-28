import authReducer, { userState } from "./userReducer"
import filtersReducer, { filterState } from "./filtersReducer"
import errorReducer from "./errorReducer"
import productRrducer, { productState } from "./productsReducer"
import cartReducer, { cardState } from "./cartReducer"
import { combineReducers } from "redux"

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

const combineReducer = combineReducers(reducers)

export { combineReducer, initialState }
