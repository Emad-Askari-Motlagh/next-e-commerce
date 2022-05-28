import dbInit from "@/db/dbInit"

function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body
    try {
      const app = new Realm.App({ id: "alliancecodes-xmurd" })

      // Redirect Uri : <AppDomain>/redirect
      const RedirectUri = "http://localhost:4000/auth/login"
      const credentials = Realm.Credentials.google(RedirectUri)
      const user = await app.logIn(credentials)

      console.log("signed in successfully with id:" + user.id)

      //find a user from the database with your emailFromLoginForm
      const existingUser = await User.findOne({ username })

      //if no user found
      if (!existingUser)
        return res.json({ err: `No account with this email found` })
      // return res.json({ msg: `No account with this email found` })
      const doesPasswordMatch = bcrypt.compareSync(
        password,
        existingUser.password
      )
      //if the passwords do not match
      if (doesPasswordMatch && existingUser) {
        const token = await jwt.sign(
          {
            user: existingUser.username,
            id: existingUser._id,
            name: existingUser.name,
          },
          "MY_SECRET"
        )
        res.status(202).send(token)
      } else {
        // throw new Error(`Invalid Email or Password`)
        return res.json({ err: `Invalid Email or Password` })
      }
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.send("get")
  }
}

export default dbInit(handler)
