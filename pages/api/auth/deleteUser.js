import nookies, { destroyCookie, setCookie, parseCookies } from "nookies"
import { clearUser } from "src/utils/auth"

const handler = async (req, res) => {
  // const method = ctx.req.method

  if (req.method === "POST") {
    res.send("post")
  } else {
    try {
      clearUser(res)
      res.send("")
    } catch (err) {
      console.log(err?.message)
      res.send("somethig happend")
    }
  }
}
export default handler
