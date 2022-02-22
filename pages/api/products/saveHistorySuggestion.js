export default function handler(req, res) {
  if (req.method === "POST") {
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

    // Rest of the API logic
  } else {
    res.setHeader("Allow", "POST")
    res.send("get")
  }
}
