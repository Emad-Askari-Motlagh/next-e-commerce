import authRoute from "./routes/userRoute.mjs"
import productRoute from "./routes/productRoute.mjs"
import fileRoute from "./routes/fileRoute.mjs"
import CardRoute from "./routes/cartRoutes.mjs"
import express from "express"
import next from "next"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = process.env.PORT || 4000
const app = next({ dev })
const handle = app.getRequestHandler()
dotenv.config()
// import swishRoute from "./swish_route.mjs";
// import stripeRoute from "./stripe_route.mjs";
import dbInit from "../db/dbInit.mjs"
import cardRoute from "./routes/cartRoutes.mjs"

app
  .prepare()
  .then(() => {
    dbInit().then((res) => {
      console.log("connected to mongo")
    })

    const server = express()
    var options = {
      dotfiles: "ignore",
      etag: false,
      extensions: ["htm", "html"],
      index: false,
      maxAge: "1d",
      redirect: false,
      setHeaders: function (res, path, stat) {
        res.set("x-timestamp", Date.now())
      },
    }

    server.use(cors())
    server.set("view engine", "ejs")
    server.use(express.static("public", options))
    server.use(express.static("uploads"))
    server.use(express.json({ limit: "50mb" }))
    server.use(
      express.urlencoded({
        extended: false,
        limit: "20mb",
        parameterLimit: 1000000,
      })
    )

    server.use(cookieParser())

    // swishRoute(server);
    // stripeRoute(server);
    authRoute(server)
    cardRoute(server)
    productRoute(server)
    fileRoute(server)

    server.get("*", (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log("> Ready on http://localhost:" + port)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
//https://www.foodieexpress.se
