import dbInit from "src/utils/db/dbInit"
import { userFromRequest } from "src/utils/auth"

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Rest of the API logic
  } else {
    try {
      const user = await userFromRequest(req)
      res.send(user)
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }
}
export default dbInit(handler)
