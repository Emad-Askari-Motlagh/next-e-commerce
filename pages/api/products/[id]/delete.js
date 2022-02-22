export default function handler(req, res) {
  if (req.method === "POST") {
    const deletedProduct = await Product.findById(req.params.id)
    if (deletedProduct) {
      await deletedProduct.remove()
      res.send({ message: "Product Deleted" })
    } else {
      res.send("Error in Deletion.")
    }
    // Rest of the API logic
  } else {
    res.setHeader("Allow", "POST")
    res.send("get")
  }
}
