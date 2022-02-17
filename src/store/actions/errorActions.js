import actionTypes from "../actionTypes";

export const setTokenError = (input) => {
  return (dispatch) => {
    dispatch({
      type: "TOKEN_ERROR",
      payload: input,
    });
  };
};
export const setLoginError = (input) => {
  return (dispatch) => {
    dispatch({
      type: "LOGIN_ERROR",
      payload: input,
    });
  };
};

export const setRegisterError = (input) => {
  return (dispatch) => {
    dispatch({
      type: "REGISTER_ERROR",
      payload: input,
    });
  };
};
export const setUploadError = (input) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPLOAD_ERROR,
      payload: input,
    });
  };
};
