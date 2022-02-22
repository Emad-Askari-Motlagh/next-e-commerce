export default function handler(req, res) {
  if (req.method === "POST") {
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
    // Rest of the API logic
  } else {
    res.setHeader("Allow", "POST")
    res.send("get")
  }
}
