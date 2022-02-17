import React, { useEffect } from "react"
import { Modal, Button } from "react-bootstrap"

export default function ImageSelector(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <img style={{ width: "100%", height: "100%" }} src={props.src}></img>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
