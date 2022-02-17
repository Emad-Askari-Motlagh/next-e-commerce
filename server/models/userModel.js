const mongoose = require("mongoose")
const { Schema } = require("mongoose")
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
    dropDups: true,
  },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  name: { type: String },
  surname: { type: String },
  photo: { type: String },
  card: { type: Schema.Types.Mixed },
})

module.exports = mongoose.models.User || mongoose.model("User", userSchema)
