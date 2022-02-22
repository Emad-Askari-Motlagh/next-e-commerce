import React, { useEffect, useState } from "react"
import styles from "./header.module.scss"

export default function NavItem(props) {
  return (
    <li
      className={styles.nav_item}
      onClick={props.onClick}
      onPointerLeave={props.onPointerLeave}
    >
      {props.icon}
      <h3>{props.header_label}</h3>
    </li>
  )
}
