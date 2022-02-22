import mongoose, { Schema } from "mongoose"
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

export default mongoose.models.User || mongoose.model("User", userSchema)
