import React, { useState, useEffect, useCallback, useRef } from "react"
import {
  Form,
  Button,
  InputGroup,
  Card,
  Alert,
  Fade,
  Badge,
  FormText,
} from "react-bootstrap"
import { useSelector } from "react-redux"
import { io } from "socket.io-client"
import styles from "./userMessage.module.scss"

export default function UserMessage() {
  const inputRef = useRef()
  const [message, setMessage] = useState()
  const { user } = useSelector((state) => state.userState)
  const [saved, setSaved] = useState(false)
  const [gotMessage, setGotMessage] = useState([])
  const [currentUser, setUser] = useState()
  var s = new Date(1504095567183).toLocaleDateString("en-US")

  let socket
  useEffect(() => {
    getMessages()
  }, [])
  useEffect(() => {
    socket = io("http://localhost:3000", {
      transport: ["websocket"],
      path: "/api/socket",
    })
    socket.on("connect", () => {
      console.log("here")
    })
    socket.on("on-text-change", (data) => {
      setMesssetGotMessageages((prev) => [...prev, data])
    })
  }, [])
  const save_on_db = async (e) => {
    e.preventDefault()

    // socket.emit("onTextChange", {
    //   text,
    //   from: socket.id,
    // })
  }
  const getMessages = async () => {}
  const buttonTriggers = ["Enter"]
  const keyPressed = (e) => {
    if (buttonTriggers.indexOf(e.key) >= 0) e.preventDefault()

    if (e.key === "Enter") broadcastButton.current.click()
  }
  return (
    <Card className={styles.main_container}>
      <div>
        {gotMessage.map((res) => {
          return (
            <Card className={styles.inner_container}>
              <Badge className={styles.userName}>{user?.split(".")[0]}</Badge>
              <Card
                className={[
                  styles.messages_container,
                  styles.message_share_container,
                ]}
                key={gotMessage.length * Math.random()}
              >
                {user?.split("@")[0] ? (
                  <div className={styles.messages_innerDiv}>
                    <div className={styles.innerDiv}>hi how are you today?</div>
                  </div>
                ) : (
                  <Badge>please log in...</Badge>
                )}
              </Card>
              <time
                style={{
                  float: "left",
                  fontSize: "0.8vw",
                  marginRight: "auto",
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                }}
              >
                {res.createdAt?.toDate().toDateString()}
              </time>
              <Card
                className={[
                  styles.messages_container1,
                  styles.message_share_container,
                ]}
                key={gotMessage.length * Math.random()}
              >
                <div className={styles.messages_innerDiv1}>
                  <h3 className={styles.innerDiv1}>'hi how are you today?</h3>
                </div>
              </Card>
              <time
                style={{
                  float: "left",
                  fontSize: "0.8vw",
                  marginRight: "auto",
                  position: "absolute",
                  left: 0,
                  top: 0,
                }}
              >
                {res.createdAt?.toDate().toDateString()}
              </time>
              <Badge className={styles.userName1}>
                {currentUser?.email.split(".")[0]}
              </Badge>
            </Card>
          )
        })}
      </div>

      <form
        onSubmit={(e) => save_on_db(e)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <textarea
          autoFocus
          rows="5"
          cols="33"
          type="text"
          multiple
          style={{
            borderRadius: "4px",
          }}
          placeholder="Enter text"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => keyPressed(e)}
          ref={inputRef}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Card>
  )
}
