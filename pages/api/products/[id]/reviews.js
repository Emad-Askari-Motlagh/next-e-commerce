

  export default function handler(req, res) {
    if (req.method === "POST") {
      const product = await Product.findById(req.params.id)
      if (product) {
        const review = {
          name: req.body.name,
          rating: Number(req.body.rating),
          comment: req.body.comment,
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating =
          product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length
        const updatedProduct = await product.save()
        res.status(201).send({
          data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
          message: "Review saved successfully.",
        })
      } else {
        res.status(404).send({ message: "Product Not Found" })
    } else {
      res.setHeader("Allow", "POST")
      res.send("get")
    }
  }

}
