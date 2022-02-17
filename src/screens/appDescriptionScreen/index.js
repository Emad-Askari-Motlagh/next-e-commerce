import React, { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./Description.module.scss"

export default function FirstPage_description() {
  return (
    <div className={styles.descript}>
      <h3 className={styles.header}>Ecommerce Service</h3>
      <h5 className={styles.description}>
        We help you to get or sell what you want
      </h5>
    </div>
  )
}
