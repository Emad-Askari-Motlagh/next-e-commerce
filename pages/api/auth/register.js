export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password, name } = req.body
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync())
    const fetchUser = await User.findOne({ username })
    if (fetchUser) {
      res.status(401).send({ message: "User is already exist" })
    }

    const user = new User({
      name,
      username,
      password: hashedPassword,
    })
    const newUser = await user.save()
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        username: newUser.username,
      })
    } else {
      res.status(401).send({ message: "Invalid User Data." })
    }
    return res.send("lll")
    // Rest of the API logic
  } else {
    res.setHeader("Allow", "POST")
    res.send("get")
  }
}
