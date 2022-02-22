import User from "src/models/userModel"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dbInit from "src/utils/db/dbInit"
import { authenticateUser, clearUser } from "src/utils/auth"
import nookies, { destroyCookie, setCookie } from "nookies"

const handler = async (req, res) => {
  const method = "POST"
  switch (method) {
    case "POST":
      try {
        const { username, password } = req.body
        //find a user from the database with your emailFromLoginForm
        const existingUser = await User.findOne({
          username,
        })

        //if no user found
        if (!existingUser) res.send({ err: `No account with this email found` })
        // return res.json({ msg: `No account with this email found` })
        const doesPasswordMatch = bcrypt.compareSync(
          password,
          existingUser.password
        )
        //if the passwords do not match
        if (doesPasswordMatch && existingUser) {
          // Set
          authenticateUser(res, existingUser)
        } else {
          res.send({ message: err.message })
        }
      } catch (err) {
        res.send({ message: err.message })
      }

    case "DELETE":
      destroyCookie({ res }, "token")
      res.end()
  }
}
export default dbInit(handler)
