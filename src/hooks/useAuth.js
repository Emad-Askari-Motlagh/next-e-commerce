import {
  getUserAction,
  delet_user,
  logOut,
  signUser,
} from "@/actions/authActions"
import React, { useEffect, useReducer, createContext, useContext } from "react"
import { useRouter } from "next/router"
import { object, func } from "prop-types"
import { combineReducers, initialState } from "@/store/reducers/combineReducer"
import actionTypes from "@/store/actionTypes"
import axios from "axios"
import userReducer, { userState } from "@/store/reducers/userReducer"
import useAsyncReducer from "./useAsyncReducer"
export const authContext = createContext()

export function AuthProvider({ children }) {
  const [state, dispatch] = useAsyncReducer(userReducer, userState)

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

export function useProvideAuth(props) {
  const router = useRouter()
  const { state, dispatch } = useAuth()
  const currentUser = state?.currentUser

  useEffect(async () => {
    let res
    if (!currentUser?.user) {
      try {
        res = await axios.get(`http://localhost:3000/api/auth/user`)

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
    return res
  }, [])

  async function logOutUser() {
    dispatch(logOut())
  }

  async function signUser(username, password) {
    try {
      const res = await axios.post(
        `${process.env.SERVER_LINK}/api/auth/login`,
        {
          username,
          password,
        }
      )

      return res.data
    } catch (err) {
      console.log(err, err?.message, err?.err, err?.data)
      dispatch({ type: actionTypes.GET_CURRENT_USER, res, payload: null })
    }
  }

  return {
    user: currentUser,
    userObject: { user: "currentUser" },
    signInError: "error",
    logOutUser,
    dispatch,
    signUser,
  }
}
