const io = require("socket.io")(server, { cors: { origin: "*" } })

const SocketHandler = (req, res) => {
  // events will go here...
  io.on("connection", (socket) => {
    console.log("New User connected")

    socket.on("onTextChange", (data) => {
      // console.log(`Message from client: ${data.text}, whoose id is: ${data.from}`);
      io.emit("on-text-change", data)
    })

    socket.on("disconnect", () => {
      console.log("User disconnected")
    })
  })
}

export default SocketHandler
