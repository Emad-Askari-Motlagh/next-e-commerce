import User from "src/models/userModel"
import bcrypt from "bcrypt"
import { authenticateUser, clearUser } from "src/utils/auth"
import { deleteCookie } from "lib/storeCookie"
import dbInit from "@/db/dbInit"

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
        if (!existingUser) {
          res.status(401).send({
            err: `No account with this email found`,
          })
        }

        // return res.json({ msg: `No account with this email found` })
        const doesPasswordMatch = bcrypt.compareSync(
          password,
          existingUser.password
        )

        //if the passwords do not match
        if (doesPasswordMatch && existingUser) {
          // Set
          await authenticateUser(res, existingUser)
          res.end()
        } else {
          res.status(401).send({ message: err.message })
        }
      } catch (err) {
        res.status(401).send({ message: err.message })
      }

    case "DELETE":
      await deleteCookie("token", res)
  }
}
export default dbInit(handler)
