import { getUserAction } from "@/actions/authActions"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function useAuth() {
  const currentUser = useSelector((state) => state.userState?.currentUser)
  const signInError = useSelector((state) => state.userState?.signInError)
  const user = currentUser?.user
  const loading = currentUser?.loading

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserAction())
  }, [user])

  return {
    user,
    loading,
    userObject: currentUser,
    signInError,
  }
}
