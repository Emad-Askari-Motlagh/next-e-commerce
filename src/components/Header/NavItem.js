import React, { useEffect, useState } from "react"
import styles from "./header.module.scss"
import Link from "next/link"
import { useMediaQuery } from "react-responsive"
import { useRouter } from "next/router"

export default function NavItem(props) {
  return (
    <li
      className={styles.nav_item}
      onClick={props.onClick}
      onPointerLeave={props.onPointerLeave}
    >
      {props.children}

      {props.icon}
      <h3>{props.header_label}</h3>
    </li>
  )
}
