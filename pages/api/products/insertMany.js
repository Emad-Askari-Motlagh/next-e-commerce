export default function handler(req, res) {
  if (req.method === "POST") {
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
    return res.send("lll")
    // Rest of the API logic
  } else {
    res.setHeader("Allow", "POST")
    res.send("get")
  }
}
