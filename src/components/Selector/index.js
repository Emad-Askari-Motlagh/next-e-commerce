import React, { createRef, useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./Selector.module.scss";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useDimensions from "../../hooks/Dimensions.hook";
import { useRouter } from "next/router";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Selector({ modalIsOpen, type, setVal, val,LeftIcon }) {
  const divRef = createRef();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dimensions = useDimensions();

  const dispatch = useDispatch();
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle && subtitle?.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div ref={divRef} id="root" className={styles.modalContainer}>
      <header style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ margin: "auto" }}>{`${type}`}</label>
        <button className={styles.modal_button} onClick={openModal}>
          {val === "none" ? `Select your ${type} ...` : val}
        </button>
      </header>

      <Modal
        htmlOpenClassName={styles.modal}
        style={{
          content: {
            width: dimensions.width > 700 ? "30vw" : "80vw",
            margin: "auto",
            textAlign: "center",
            borderRadius: "22px",
            backgroundColor: "rgba(89, 109, 114, 0.801)",
            height: "90%",
          },
          overlay: {
            backgroundColor: "rgba(89, 109, 114, 0.801)",
            WebkitBackdropFilter: "blur(2px)",
            backdropFilter: "blur(2px)",
            zIndex: 12,
          },
        }}
        bodyOpenClassName={styles.modal_body}
        ariaHideApp={false}
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <AiFillCloseCircle
          size={34}
          onClick={closeModal}
          style={{ position: "absolute", right: "12%" }}
        >
          close
        </AiFillCloseCircle>

        <Dropdown
          className={styles.modal_dropdown}
          onSelect={(value) => setVal(value)}
          style={{ margin: "auto", width: "65%" }}
        >
          <Dropdown.Toggle
            style={{ backgroundColor: "black" }}
            id="dropdown-basic"
          >
            {`Select ${type}...`}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="Home">Home</Dropdown.Item>
            <Dropdown.Item eventKey="Design">Design</Dropdown.Item>
            <Dropdown.Item eventKey="fordon">fordon</Dropdown.Item>
            <Dropdown.Item eventKey="all">Clear filter</Dropdown.Item>
          </Dropdown.Menu>
          <h3 className={styles.category_value}>{val}</h3>
        </Dropdown>
      </Modal>
    </div>
  );
}
