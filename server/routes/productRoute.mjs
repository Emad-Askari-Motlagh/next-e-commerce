import productModel from "../models/productModel.js"
import isAuth from "../middlewares/authMiddleware.mjs"
import mongoose from "mongoose"
import historyModel from "../models/historyModel.js"

const Product = productModel
const History = historyModel

const productRoute = (server) => {
  server.post("/api/products/insertMany", async (req, res) => {
    console.log(req.body)
    Product.insertMany([
      {
        name: "emadi",
        price: 455,
        location: { type: "Point", coordinates: [-110.8571443, 32.4586858] },
      },
    ])
      .then(function () {
        console.log("Data inserted") // Success
      })
      .catch(function (error) {
        console.log(error) // Failure
      })
  })

  server.get("/api/search", async (req, res, next) => {
    try {
      const category = req.query.category
      const location = req.query.location
      const result = await Product.aggregate([
        req.query.searchKeyword
          ? {
              $search: {
                index: "default",
                compound: {
                  filter: [
                    {
                      autocomplete: {
                        query: req.query.searchKeyword,
                        path: "name",
                      },
                    },
                    {
                      geoWithin: {
                        circle: {
                          center: {
                            type: "Point",
                            coordinates: [
                              57.68306690451439, 12.007414892996962,
                            ],
                          },
                          radius: 100000,
                        },
                        path: "location",
                      },
                    },
                  ],
                },
              },
            }
          : {
              $search: {
                near: {
                  path: "location",
                  origin: {
                    type: "Point",
                    coordinates: [57.68306690451439, 12.007414892996962],
                  },
                  pivot: 200000000,
                },
              },
            },

        { $match: category ? { category } : {} },
        { $match: location ? { area: location } : {} },

        {
          $project: req.query.suggestion
            ? { _id: 1, name: 1 }
            : { _id: 1, name: 1, price: 1, desciption: 1, image: 1, category },
        },
      ])

      res.send(result)
    } catch (err) {
      res.status(500).send({ message: err.message })
      console.error(err)
    }
  })

  server.get("/api/products/saveHistorySuggestion", async (req, res) => {
    const id = mongoose.Types.ObjectId("60e3239ceeb8727899ad712c")
    const rr = await History.findOne({ _id: id })
    if (id) {
      if (req.query.searchKeyword) {
        if (rr.name.length > 15) {
          const rdr = await History.updateOne(
            { _id: id },
            { $pop: { name: -1 } }
          )
        }
        await History.updateOne(
          { _id: id },
          { $addToSet: { name: req.query.searchKeyword } },
          { upsert: true }
        )
        res.send(rr)
      } else {
        res.status(500).send({ message: "couldnt find the history" })
      }
    }
  })

  server.post("/api/products/:id/reviews", isAuth, async (req, res) => {
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
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length
      const updatedProduct = await product.save()
      res.status(201).send({
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        message: "Review saved successfully.",
      })
    } else {
      res.status(404).send({ message: "Product Not Found" })
    }
  })
  server.put("/api/products/:id", isAuth, async (req, res) => {
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
  })

  server.delete("/api/products/:id", isAuth, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id)
    if (deletedProduct) {
      await deletedProduct.remove()
      res.send({ message: "Product Deleted" })
    } else {
      res.send("Error in Deletion.")
    }
  })

  server.post("/api/products", async (req, res) => {
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
  })
}

export default productRoute
