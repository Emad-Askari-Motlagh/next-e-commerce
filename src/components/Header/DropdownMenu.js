import React, { useState, useEffect, useRef } from "react"
import styles from "./header.module.scss"
import { FiSettings } from "react-icons/fi"
import { BiPhoneCall } from "react-icons/bi"
import router, { useRouter } from "next/router"
import { IoIosArrowDropright } from "react-icons/io"
import { FcAbout } from "react-icons/fc"
import { RiContactsLine } from "react-icons/ri"
import Simple_modal from "../helper_modals/Simple_modal"

export default function DropdownMenu({ isVisible, setIsVisible, elementRef }) {
  return (
    <div
      className={styles.dropdown}
      style={{
        width: isVisible ? "30vw" : "0px",
        borderWidth: isVisible ? "2px" : "0",
      }}
      ref={isVisible ? elementRef : null}
    >
      <IoIosArrowDropright
        className={styles.upArrow}
        size={32}
        onClick={() => {
          setIsVisible(false)
        }}
      />
      <div className={styles.dropdown_container}>
        <DropDownItem
          leftIcon={<FcAbout color="white" />}
          rightIcon={<FiSettings color="tomato" />}
          endPoint="/om"
        >
          <a rel="noopener" href={"/om"} className={styles.menu_item}>
            Om oss
          </a>
        </DropDownItem>
        <DropDownItem
          leftIcon={<BiPhoneCall color="white" />}
          rightIcon={<FiSettings color="tomato" />}
        >
          <Simple_modal
            className={styles.menu_item}
            label="kontakt nummer"
            body={"Kontakt nummer : 0730565960"}
          />
        </DropDownItem>

        <DropDownItem
          leftIcon={<RiContactsLine color="white" />}
          rightIcon={<FiSettings color="tomato" />}
        >
          <a rel="noopener" href={"/kontakt"} className={styles.menu_item}>
            Skriva till oss
          </a>
        </DropDownItem>
      </div>
    </div>
  )
}

function DropDownItem(props) {
  return (
    <div className={styles.menu_item}>
      <span className={styles.icon_button}>{props.leftIcon}</span>
      {props.children}
      <div className={styles.icon_right}> {props.rightIcon}</div>
    </div>
  )
}
