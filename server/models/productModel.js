const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
const prodctSchema = new mongoose.Schema({
  name: { type: String, required: true, text: true },
  image: { type: String },
  price: { type: Number, default: 0, required: true },
  category: { type: String },
  description: { type: String },
  rating: { type: Number, default: 0 },
  reviews: { type: String },
  location: {
    type: {
      type: String,
      required: true,
      default: "Point",
    },
    coordinates: [Number],
  },
})

module.exports =
  mongoose.models.Product || mongoose.model("Product", prodctSchema)
