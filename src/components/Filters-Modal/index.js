import React, { createRef, useState, useEffect } from "react"
import Modal from "react-modal"
import styles from "./Modal.module.scss"
import { Button, Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import useDimensions from "../../hooks/Dimensions.hook"
import { useRouter } from "next/router"
import { AiFillCloseCircle } from "react-icons/ai"
import { setFilter } from "@/actions/filtersActions"
import useFilter from "src/hooks/filter.hook"

export default function FiltersModal({ modalIsOpen, setIsOpen }) {
  const { setCookie } = useFilter()
  const divRef = createRef()
  const { filters } = useSelector((state) => state.filtersState)
  const [category, setCategory] = useState()
  const router = useRouter()
  const dimensions = useDimensions()
  const dispatch = useDispatch()
  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle && subtitle?.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false)
    setCookie(filters)
    if (router.pathname !== "/sell/Sell") {
      router.push(
        {
          query: {
            category: filters.category,
            searchKeyword: router.query.searchKeyword,
            location: filters.location,
          },
        },
        undefined,
        { shallow: true }
      )
    }
  }

  return (
    <div ref={divRef} id="root" className={styles.modalContainer}>
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
        isOpen={modalIsOpen}
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
          onSelect={(value) => {
            dispatch(setFilter({ ...filters, category: value }))
          }}
          style={{ margin: "auto", width: "65%" }}
        >
          <Dropdown.Toggle
            style={{ backgroundColor: "black" }}
            id="dropdown-basic"
          >
            Select Categorys...
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="Home">Home</Dropdown.Item>
            <Dropdown.Item eventKey="Design">Design</Dropdown.Item>
            <Dropdown.Item eventKey="fordon">fordon</Dropdown.Item>
            <Dropdown.Item eventKey="">Clear filter</Dropdown.Item>
          </Dropdown.Menu>
          <h3 className={styles.category_value}>{filters.category}</h3>
        </Dropdown>
        <Dropdown
          className={styles.modal_dropdown}
          onSelect={(value) => {
            dispatch(setFilter({ ...filters, location: value }))
          }}
          style={{ margin: "auto", width: "65%" }}
        >
          <Dropdown.Toggle
            style={{ backgroundColor: "black" }}
            id="dropdown-basic"
          >
            Select Location...
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="Gothenburg">Gothenburg</Dropdown.Item>
            <Dropdown.Item eventKey="Stockholm">Stockholm</Dropdown.Item>
            <Dropdown.Item eventKey="Malmo">Malmo</Dropdown.Item>
            <Dropdown.Item eventKey="">Clear filter</Dropdown.Item>
          </Dropdown.Menu>
          <h3 className={styles.category_value}>{filters.location}</h3>
        </Dropdown>
      </Modal>
    </div>
  )
}
