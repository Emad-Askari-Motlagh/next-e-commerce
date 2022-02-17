import CartModel from "../models/cartModel.js"
import { Error } from "@material-ui/icons"
const Cart = CartModel
import productModel from "../models/productModel.js"
import mongoose from "mongoose"
const Product = productModel

const cardRoute = (server) => {
  server.post("/api/card/addtoCard/:userId/:productId", async (req, res) => {
    const user = req.params.userId
    const item = {
      product: req.params.productId,
      quantity: req.body.quantity,
    }
    try {
      const foundCart = await Cart.findOne({ user })

      if (foundCart) {
        let products = foundCart.items.map((item) => item.product + "")
        if (products.includes(item.product)) {
          await Cart.findOneAndUpdate(
            {
              user: user,
              items: {
                $elemMatch: { product: item.product },
              },
            },
            {
              $inc: { "items.$.quantity": item.quantity },
            }
          ).exec()
          res.send("done")
        } else {
          foundCart.items.push(item)
          await foundCart.save()
          res.send("done")
        }
      } else {
        await Cart.create({
          user: user,
          items: [item],
        })
        res.send("done")
      }
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  })

  server.put("/api/card/plusorminus/:userId/:productId", async (req, res) => {
    const user = await req.params.userId
    const product = await req.params.productId
    try {
      const method = req.body.method
      const foundCart = await Cart.findOne({ user: user })

      if (foundCart) {
        await Cart.findOneAndUpdate(
          {
            user: user,
            items: {
              $elemMatch: { product: product },
            },
          },
          {
            $inc: {
              "items.$.quantity": method === "plus" ? +1 : -1,
            },
          }
        )

        const sum = await Cart.aggregate([
          {
            $match: {
              "items.quantity": {
                $gt: 1,
              },
            },
          },
          {
            $count: "passing_scores",
          },
        ])

        await Cart.findOneAndUpdate(
          {
            user,
          },
          {
            $pull: {
              items: {
                quantity: { $lte: 0 },
              },
            },
          }
        )

        await foundCart.save()
        //.find( { "instock": { $elemMatch: { qty: { $gt: 10, $lte: 20 } } } } )

        res.send("done")
      } else {
        res.send("couldnt find the card")
      }
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  })

  server.get("/api/card/getItems/:userId", async (req, res, next) => {
    try {
      const userId = req.params.userId

      if (userId) {
        const cart = await Cart.findOne({
          user: userId,
        }).populate("items.product")
        if (!cart) {
          throw new Error("Couldnt find the cart")
        }
        const sum = await Cart.aggregate([
          {
            $match: {
              user: mongoose.Types.ObjectId(userId),
            },
          },
          {
            $unwind: {
              path: "$items",
            },
          },
          {
            $group: {
              _id: userId,
              total: {
                $sum: "$items.quantity",
              },
            },
          },
        ])
        res.send({ cart, sum: sum[0].total })
      }
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  })

  server.delete(
    "/api/cadddrd/addtoCard/:userId/:productId",
    async (req, res, next) => {
      try {
        const product = await Cart.findByIdAndRemove(req.query.id)
        if (!product) {
          throw new Error("Couldnt find the product")
        }
        await product.save()
        res.status(200).end()
      } catch (error) {
        res.status(500).send({ message: err.message })
      }
    }
  )
}
export default cardRoute
