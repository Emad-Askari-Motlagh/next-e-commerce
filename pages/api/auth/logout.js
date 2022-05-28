function handler(req, res) {
  if (req.method === "POST") {
    return res.send("lll")
    // Rest of the API logic
  } else {
    res.setHeader("Allow", "POST")
    res.send("get")
  }
}

export default handler
