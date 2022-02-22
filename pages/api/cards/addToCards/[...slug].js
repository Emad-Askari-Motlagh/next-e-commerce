import initDb from "src/utils/db"

const handler = async (req, res) => {
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
}
export default initDb(handler)
