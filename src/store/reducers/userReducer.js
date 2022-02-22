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
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (action.type) {
        case actionTypes.REGISTER_USER:
          resolve({ ...state, createdUser: action.payload })

        case actionTypes.SIGN_USER:
          resolve({
            ...state,
            currentUser: action.payload,
          })
        case actionTypes.GET_CURRENT_USER:
          resolve({
            ...state,
            currentUser: action.payload,
          })
        case actionTypes.SIGN_USER_ERROR:
          resolve({
            ...state,
            signInError: action.payload,
          })
        case "TOKEN_ERROR":
          resolve({
            ...state,
            ifLogedIn: false,
          })

        case "GET_ADDRESSESS":
          resolve({
            ...state,
            addressess: action.payload,
          })
        default:
          resolve({ ...state })
      }
    }, 1000)
  })
}
export default userReducer
