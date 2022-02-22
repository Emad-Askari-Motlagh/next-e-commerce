import Cart from "src/models/cartModel"
import { Error } from "@material-ui/icons"
import Product from "src/models/productModel"
import mongoose from "mongoose"
import dbInit from "@/db/dbInit.js"

const handler = async (req, res) => {
  const method = req.method
  const { userId } = req.query

  switch (method) {
    case "GET":
      try {
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
          res.status(202).json({ cart, sum: sum[0].total })
        }
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
    case "DELETE":
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
    case "PUT":
  }
}

export default dbInit(handler)
