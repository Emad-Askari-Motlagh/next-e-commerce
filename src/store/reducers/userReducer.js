import { HYDRATE } from "next-redux-wrapper"
import actionTypes, * as types from "@/store/actionTypes"

const userReducer = (
  state = {
    user: null,
    createdUser: null,
    ifLogedIn: false,
    verified: false,
    currentUser: { user: null, loading: false },
    addressess: { data: [], loading: true },
    signInError: "",
  },
  action
) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER:
      return { ...state, createdUser: action.payload }

    case actionTypes.SIGN_USER:
      return {
        ...state,
        currentUser: action.payload,
      }
    case actionTypes.SIGN_USER_ERROR:
      return {
        ...state,
        signInError: action.payload,
      }
    case "TOKEN_ERROR":
      return {
        ...state,
        ifLogedIn: false,
        user: action.payload,
      }
    case "VERIFY_USER":
      return {
        ...state,
        verified: action.payload,
      }
    case "FETCH_USER":
      return {
        ...state,
        currentUser: action.payload,
      }
    case "GET_ADDRESSESS":
      return {
        ...state,
        addressess: action.payload,
      }
    default:
      return { ...state }
  }
}
export default userReducer
