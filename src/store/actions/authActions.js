import actionTypes from "../actionTypes"
import axios from "axios"
import * as Realm from "realm-web"

//set token in local storage
////get userAction action

export const getUserAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/auth/user`)
    dispatch({
      type: actionTypes.GET_CURRENT_USER,
      payload: { user: res?.data?.username, loading: false },
    })
    return res.data
  } catch (err) {
    console.log(err?.message)
    return err
  }
}

export const logOut = () => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      `${process.env.SERVER_LINK}/api/auth/deleteUser`
    )
    if (res.status === 200) {
      dispatch({ type: actionTypes.SIGN_USER, payload: null })
      dispatch({ type: actionTypes.GET_CURRENT_USER, payload: null })
      return res
    }
  } catch (err) {
    console.log("Error from action")
  }
}

export const setUser =
  (email, password, name) => async (dispatch, getState) => {
    try {
      const res = await axios.post(
        `${process.env.SERVER_LINK}/api/auth/register/`,
        {
          username: email,
          password,
          name,
        }
      )
      dispatch({ type: actionTypes.REGISTER_USER, payload: res })
      return res
    } catch (err) {
      console.log(err)
    }
  }

export const signUser = (username, password) => async (dispatch, getState) => {
  try {
    const res = await axios.post(`${process.env.SERVER_LINK}/api/auth/login`, {
      username,
      password,
    })
    if (res.status === 200) {
      dispatch({ type: actionTypes.SIGN_USER, payload: res.data })
      return res
    } else {
      return null
    }

    return res.data
  } catch (err) {
    console.log(err, err?.message, err?.err, err?.data)
    return err
  }
}

export const delet_user = () => async (dispatch, getState) => {
  return async (dispatch, getState) => {
    await axios.delete(`${process.env.SERVER_LINK}/api/auth/login`)
    dispatch({ type: actionTypes.SIGN_USER, payload: null })
    dispatch({ type: actionTypes.GET_CURRENT_USER, payload: null })
  }
}

// export function googleAuth() {
//   return async (dispatch) => {
//     const app = new Realm.App({ id: "shopia-uosya" })
//     const client_id =
//       "1013923348052-pf7d34p14635fqr69dqjjeg832hq68kr.apps.googleusercontent.com"
//     // Open the Google One Tap menu
//     // Get the access token from a client application using the Google SDK

//     // Log the user in to your app
//     const credentials = Realm.Credentials.google(
//       "http://localhost:3000/auth/login"
//     )
//     const user = await app.logIn(credentials)
//     console.log(`Logged in with id: ${user.id}`)

//     // Realm.handleAuthRedirect()
//   }
// }

// export function facebookAuth() {
//   return async (dispatch) => { }
// }

// export function updateUser({
//   id,
//   username,
//   name,
//   surname,
//   phoneNumber,
//   photo,
// }) {
//   return async (dispatch, getState) => {
//     try {
//       const userId = "60d39fd8fd2da5c623d61fcc"
//       const res = await axios.post(
//         `${process.env.SERVER_LINK}/auth/updateUser`,
//         {
//           id: userId,
//           username,
//           name,
//           surname,
//           phoneNumber,
//           photo,
//         }
//       )
//       // res && globalThis.location.reload();
//     } catch (err) {
//       console.log("error happend", err)
//     }
//   }
// }

// export function registerDatabase({ id, email, name, surname }) { }
// export async function resetPassword(email) { }
// export async function sendEmailVerification(userCredential) { }
