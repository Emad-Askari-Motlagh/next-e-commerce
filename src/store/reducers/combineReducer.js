import authReducer from "./userReducer"
import { combineReducers } from "redux"
import filtersReducer from "./filtersReducer"
import errorReducer from "./errorReducer"
import productRrducer from "./productsReducer"
import cartReducer from "./cartReducer"

const combineReducer = combineReducers({
  userState: authReducer,
  filtersState: filtersReducer,
  errorState: errorReducer,
  productState: productRrducer,
  cartState: cartReducer,
})
export default combineReducer
