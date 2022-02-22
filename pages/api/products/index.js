export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const product = await new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
        description: req.body.description,
        rating: req.body.rating,
        reviews: req.body.reviews,
      })

      const newProduct = await product.save()
      if (newProduct) {
        return res
          .status(201)
          .send({ message: "New Product Created", data: newProduct })
      }
      return res.status(500).send({ message: " Error in Creating Product." })
    } catch (err) {
      console.log(err)
    }

    // Rest of the API logic
  } else {
    res.setHeader("Allow", "POST")
    res.send("get")
  }
}
