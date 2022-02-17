import actionTypes from "@/store/actionTypes";
const initialState = {
  errorMessage: null,
  signupError: null,
  uploadError: null,
  addressError: null,
};
const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        signupError: action.payload,
      };
    case actionTypes.UPLOAD_ERROR:
      return {
        ...state,
        uploadError: action.payload,
      };
    case actionTypes.ADDRESS_ERROR:
      return {
        ...state,
        addressError: action.payload,
      };
    default:
      return { ...state };
  }
};
export default errorReducer;
