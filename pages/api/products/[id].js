import { NextPageContext } from "next"

export default function handler(req, res) {
  if (req.method === "POST") {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (product) {
      product.name = req.body.name
      product.price = req.body.price
      product.image = req.body.image
      product.brand = req.body.brand
      product.category = req.body.category
      product.countInStock = req.body.countInStock
      product.description = req.body.description
      const updatedProduct = await product.save()
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: "Product Updated", data: updatedProduct })
      }
    }
    return res.status(500).send({ message: " Error in Updating Product." })
    // Rest of the API logic
  } else {
    res.setHeader("Allow", "POST")
    res.send("get")
  }
}
