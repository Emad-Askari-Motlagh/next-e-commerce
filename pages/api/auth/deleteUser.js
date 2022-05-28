import { deleteCookie } from "lib/storeCookie"

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    // Rest of the API logic
    try {
      await deleteCookie("token", res)
      res.statues(200).send("done")
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  } else {
    res.end()
  }
}
export default handler
