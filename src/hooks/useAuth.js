import { getUserAction, signUser, logOut } from "@/actions/authActions"
import React, { useEffect, useReducer, createContext, useContext } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

export const authContext = createContext()

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  return (
    <authContext.Provider value={{ dispatch }}>{children}</authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

export function useProvideAuth(props) {
  const router = useRouter()
  const { dispatch } = useAuth()
  const { currentUser } = useSelector((state) => state.userState)

  useEffect(() => {
    async function fetchTheUser() {
      await dispatch(getUserAction())
    }
    fetchTheUser()
  }, [])

  async function logOutUser() {
    try {
      await dispatch(logOut())
      router.reload()
    } catch (err) {
      console.log(err)
    }
  }

  async function signInUser(username, password) {
    await dispatch(signUser(username, password))
  }

  return {
    user: currentUser,
    userObject: { user: "currentUser" },
    signInError: "error",
    logOutUser,
    signUser: (user, pass) => signInUser(user, pass),
  }
}
