export default function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body)
    return res.send("lll")
    // Rest of the API logic
  } else {
    res.setHeader("Allow", "POST")
    res.send("get")
  }
}
