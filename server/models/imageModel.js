// Step 3 - this is the code for ./models.js

const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ImgSchema = new Schema(
  {
    img: { type: String },
    name: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Image is a model which has a schema imageSchema

const Image = mongoose.model("Image", ImgSchema);
module.exports = Image;
