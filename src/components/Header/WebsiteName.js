import { useRouter } from "next/router"
import React from "react"
import styles from "./header.module.scss"

export default function WebsiteName() {
  const Router = useRouter()
  return (
    <div className={styles.logo_container}>
      <img src={"./AllianceLogo.png"} className={styles.h1_classname}></img>
      <label>SHOPIA</label>
    </div>
  )
}
