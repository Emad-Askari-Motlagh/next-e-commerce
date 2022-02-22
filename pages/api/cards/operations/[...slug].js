import dbInit from "@/db/dbInit"

const handler = async (req, res) => {
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
}
export default dbInit(handler)
