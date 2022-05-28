import User from "src/models/userModel"
import jwt from "jsonwebtoken"
import nookies, { destroyCookie, setCookie } from "nookies"
import { serialize } from "cookie"
import { deleteCookie, storeCookie } from "lib/storeCookie"
import storeJwt from "lib/storeJwt"

// You should really not use the fallback and perhaps
// throw an error if this value is not set!
const cookieOptions = {
  httpOnly: true,
  maxAge: 2592000,
  path: "/",
  sameSite: "Strict",
  secure: process.env.NODE_ENV === "production",
}

export async function authenticateUser(res, user) {
  if (!user) return
  const token = jwt.sign({ id: user._id }, "MY_SECRET")
  //store the cookie object which include the id and expiration time for future uses
  await storeCookie({ token }, res, 300 * 300 * 300)
  return token
}

// This removes the auth cookie, effectively logging out
// the user.
export function clearUser(res) {
  deleteCookie("token", res)
  return "done"
}

// This gives back the user behind a given request
// either on API routes or getServerSideProps
export async function userFromRequest(req) {
  const { token } = req.cookies
  try {
    if (!token) return
    const data = jwt.verify(token, "MY_SECRET")
    if (!data) {
      return
    }

    const user = await User.findById(data.id)

    return user
  } catch (error) {
    console.log(error?.message)

    return
  }
}
