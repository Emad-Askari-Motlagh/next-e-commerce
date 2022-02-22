const mongoose = require("mongoose")

const historySchema = new mongoose.Schema({
  name: { type: Array },
})

module.exports =
  mongoose.models.History || mongoose.model("History", historySchema)
