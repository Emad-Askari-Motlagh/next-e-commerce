import React, {
  forwardRef,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./modal.module.scss";

const Simple_modal = ({ body, label, onClick, className }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const inputRef = useRef();

  return (
    <>
      <div
        ref={inputRef}
        variant="primary"
        onClick={handleShow}
        className={className}
      >
        {label}
      </div>

      <Modal backdrop={true} show={show} onHide={handleClose}>
        <Modal.Body className={styles.modalBody}>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Simple_modal;
