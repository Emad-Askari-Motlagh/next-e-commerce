import "../models/userModel.js"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import * as Realm from "realm-web"
import jwt from "jsonwebtoken"

const authRoute = (server) => {
  // POST /register
  server.post("/auth/register", async (req, res) => {
    const { username, password, name } = req.body
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync())
    const fetchUser = await User.findOne({ username })
    if (fetchUser) {
      res.status(401).send({ message: "User is already exist" })
    }

    const user = new User({
      name,
      username,
      password: hashedPassword,
    })
    const newUser = await user.save()
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        username: newUser.username,
      })
    } else {
      res.status(401).send({ message: "Invalid User Data." })
    }
  })

  //Add a product to the card
  server.post("/api/products/addToCart/:userId", async (req, res) => {
    const userId = req.params.userId
    const product = req.body

    const user = await User.findOne({ _id: userId })
    if (user) {
      let qua = user.card?.[product.id]?.quantity ?? 0

      qua += 1
      await user.set({
        card: {
          ...user.card,
          [product.id]: {
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: qua,
            id: product.id,
          },
        },
      })

      await user.save()
      res.send("Added to the card")
    } else {
      res.status(404).send({ message: "Error happend" })
    }
  })

  server.put(
    "/api/products/plusToCard/:userId/:productId",
    async (req, res) => {
      const userId = req.params.userId
      const productId = req.params.productId
      const product = req.body
      try {
        const user = await User.findOne({ _id: userId })

        if (user) {
          let qua = user.card?.[productId]?.quantity ?? 0

          if (req.body.method === "plus") {
            qua += 1
            await user.updateOne({
              card: {
                ...user.card,
                [productId]: { ...user.card[productId], quantity: qua },
              },
            })
          } else {
            if (qua > 0) {
              // qua-=1
              // await user.updateOne({card:{...user.card,[productId]:{...user.card[productId],quantity:qua}}})

              await User.updateOne(
                { _id: "60e3239ceeb8727899ad712c" },
                { $unset: { card: "" } }
              )
            } else {
              const shouldRemove = user.card?.[productId]
              console.log(shouldRemove)
              await User.updateOne({ _id: userId }, { $unset: { __v: "" } })
              // user.set({...user.card,newCard})
            }
          }

          await user.save()
          res.send("Added to the card")
        } else {
          res.status(404).send({ message: "Error happend" })
        }
      } catch (err) {
        res.status(500).send({ message: err.message })
      }
    }
  )
  // POST /login
  server.post("/auth/login", async (req, res, next) => {
    try {
      const { username, password } = req.body
      console.log(req.body)
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
  })
  server.post("/auth/googlelogin", async (req, res, next) => {
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
  })

  //GET /logout
  server.get("/logout", function (req, res) {
    // no db interaction, no session, no nothing

    res.status(200).json({ message: "Logged out" })
  })

  //GET user idnformation
  server.get("/auth/fetchUser", function (req, res, next) {
    try {
      if (req.user && req.user) {
        User.findOne({ _id: req.user._id })
          .then((user) => {
            console.log("user details", user)
            user = user.publicFormat()
            res.json(user)
          })
          .catch((err) => next(err))
      } else {
        const err = new Error("Couldn't retrieve user id from token")
        return next(err)
      }
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  })

  //Delete user from db
  server.post("/auth/deleteUser", async (req, res, next) => {
    try {
      if (req.body.id) {
        const doc = await User.deleteOne({ _id: req.body.id })

        res.send("Deleted")
      } else {
        const err = new Error("Couldn't retrieve user id from token")
        return next(err)
      }
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  })
  //Change Password
  server.post("/auth/resetPassword", async (req, res, next) => {
    const { userId, token } = req.params
    const { password } = req.body
    try {
      const existingUser = await User.findOne({ _id: userId })

      //if no user found
      if (!existingUser)
        return res.json({ msg: `No account with this email found` })
      const payload = jwt.decode(token, "MY_SECRET")
      if (payload.userId === existingUser.id) {
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync())
        User.findOneAndUpdate({ _id: userId }, { password: hashedPassword })
        res.status(202).json("Password changed accepted")
      }
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  })
  //Update user on DB
  server.post("/auth/updateUser", async (req, res, next) => {
    const { id, username, name, surname, phoneNumber, photo } = req.body

    try {
      const existingUser = await User.findOne({
        _id: id,
      })

      //if no user found
      if (!existingUser) {
        return res.json({ msg: `No account with this email found` })
      }

      const rr = await User.findOneAndUpdate(
        { _id: id },
        { username, name, surname, phoneNumber, photo }
      )

      res.status(202).json("User profile has been updated")
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  })
  //Create admin user
  // router.get("/createadmin", async (req, res) => {
  //   try {
  //     const user = new User({
  //       name: "Basir",
  //       email: "admin@example.com",
  //       password: "1234",
  //       isAdmin: true,
  //     });
  //     const newUser = await user.save();
  //     res.send(newUser);
  //   } catch (error) {
  //     res.send({ message: error.message });
  //   }
  // });
}

export default authRoute
