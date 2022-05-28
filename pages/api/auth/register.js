import User from "@/models/userModel"
import { authenticateUser } from "src/utils/auth"
import bcrypt from "bcrypt"
import dbInit from "@/db/dbInit"

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, name } = req.body
    try {
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync())
      const fetchUser = await User.findOne({ username: email })
      if (fetchUser) {
        res
          .status(401)
          .send({ message: "User is already exist", type: "duplicate" })
      }
      const user = await new User({
        name,
        username: email,
        password: hashedPassword,
      })
      const newUser = await user.save()
      if (newUser) {
        await authenticateUser(res, newUser)
        res.status(200).send(newUser)
      } else {
        res.status(401).send({ message: "Invalid User Data.", type: "data" })
      }
    } catch (err) {
      res.status(401).send({ message: "Couldn`t register the user." })
    }

    // Rest of the API logic
  } else {
    res.setHeader("Allow", "POST")
    res.send("get")
  }
}

export default dbInit(handler)
