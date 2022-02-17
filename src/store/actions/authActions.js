import { setRegisterError } from "./errorActions"
export default function authAction() {}
import { parseCookies, setCookie, destroyCookie } from "nookies"
import actionTypes from "../actionTypes"
import Router from "next/router"
import axios from "axios"
import jwt from "jsonwebtoken"
import * as Realm from "realm-web"

//set token in local storage
////get userAction action

export function getUserAction() {
  return async (dispatch) => {
    const { user } = parseCookies()
    if (user) {
      const parsedUser = jwt.decode(user, "MY_SECRET")
      dispatch({ type: actionTypes.SIGN_USER, payload: parsedUser })
    } else {
      dispatch({ type: actionTypes.SIGN_USER, payload: null })
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SIGN_USER, payload: null })
    destroyCookie(null, "user")
  }
}

export const setUser = (username, password, name) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.SERVER_LINK}/auth/register/`,
        {
          username,
          password,
          name,
        }
      )
      dispatch({ type: actionTypes.REGISTER_USER, payload: res })
    } catch (err) {
      console.log(err)
    }
  }
}

export const signUser = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${process.env.SERVER_LINK}/auth/login`, {
        username,
        password,
      })

      if (!res.data.err) {
        const user = await jwt.decode(res.data, "MY_SECRET")
        dispatch({ type: actionTypes.SIGN_USER, payload: user })
        await setCookie(null, "user", res.data, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        })
        globalThis.location = "/"
      } else {
        console.log("res.data.err")
        dispatch({
          type: actionTypes.SIGN_USER_ERROR,
          payload: res.data.err,
        })
      }
    } catch (err) {
      console.log(err, err?.message, err?.err, err?.data)
      dispatch({
        type: actionTypes.SIGN_USER_ERROR,
        payload: err,
      })
    }
  }
}

export function delet_user(id) {
  return async (dispatch, getState) => {
    await axios.post(`${process.env.SERVER_LINK}/auth/deleteUser`, { id })
    dispatch({ type: actionTypes.SIGN_USER, payload: null })
    destroyCookie(null, "user")
  }
}

export function googleAuth() {
  return async (dispatch) => {
    const app = new Realm.App({ id: "shopia-uosya" })
    const client_id =
      "1013923348052-pf7d34p14635fqr69dqjjeg832hq68kr.apps.googleusercontent.com"
    // Open the Google One Tap menu
    // Get the access token from a client application using the Google SDK

    // Log the user in to your app
    const credentials = Realm.Credentials.google(
      "http://localhost:3000/auth/login"
    )
    const user = await app.logIn(credentials)
    console.log(`Logged in with id: ${user.id}`)

    // Realm.handleAuthRedirect()
  }
}

export function facebookAuth() {
  return async (dispatch) => {}
}

export function updateUser({
  id,
  username,
  name,
  surname,
  phoneNumber,
  photo,
}) {
  return async (dispatch, getState) => {
    try {
      const userId = "60d39fd8fd2da5c623d61fcc"
      const res = await axios.post(
        `${process.env.SERVER_LINK}/auth/updateUser`,
        {
          id: userId,
          username,
          name,
          surname,
          phoneNumber,
          photo,
        }
      )
      // res && globalThis.location.reload();
    } catch (err) {
      console.log("error happend", err)
    }
  }
}

export function registerDatabase({ id, email, name, surname }) {}
export async function resetPassword(email) {}
export async function sendEmailVerification(userCredential) {}