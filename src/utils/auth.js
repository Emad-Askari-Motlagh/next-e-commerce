import User from "src/models/userModel"
import jwt from "jsonwebtoken"
import nookies, { destroyCookie, setCookie } from "nookies"
import { serialize } from "cookie"

// You should really not use the fallback and perhaps
// throw an error if this value is not set!
const cookieOptions = {
  httpOnly: true,
  maxAge: 2592000,
  path: "/",
  sameSite: "Strict",
  secure: process.env.NODE_ENV === "production",
}

export function authenticateUser(res, user) {
  if (!user) return

  const token = jwt.sign({ email: user.email, id: user._id }, "MY_SECRET", {
    expiresIn: "1d",
  })
  nookies.set({ res }, "token", token, cookieOptions)
  console.log("new token", token)
  // res?.cookie("token", token, { httpOnly: true })
  res.setHeader("Set-Cookie", serialize("token", token, cookieOptions))

  return token
}

// This removes the auth cookie, effectively logging out
// the user.
export function clearUser(res) {
  res.setHeader(
    "Set-Cookie",
    serialize("token", null, {
      httpOnly: true,
      maxAge: -1,
      path: "/",
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    })
  )

  return "done"
}

// This gives back the user behind a given request
// either on API routes or getServerSideProps
export async function userFromRequest(req) {
  const { token } = req.cookies

  try {
    if (!token) return undefined
    const data = jwt.verify(token, "MY_SECRET")
    if (!data) {
      return undefined
    }
    const user = await User.findById(data.id)
    return user
  } catch (error) {
    console.log(error?.message)

    return undefined
  }
}
