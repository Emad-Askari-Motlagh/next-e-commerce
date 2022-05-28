import actionTypes, * as types from "@/store/actionTypes"

export const userState = {
  user: {},
  createdUser: null,
  ifLogedIn: false,
  verified: false,
  currentUser: { user: null, loading: false },
  addressess: { data: [], loading: true },
  signInError: "",
}

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER:
      return { ...state, createdUser: action.payload }

    case actionTypes.SIGN_USER:
      return {
        ...state,
        currentUser: action.payload,
      }
    case actionTypes.GET_CURRENT_USER:
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
