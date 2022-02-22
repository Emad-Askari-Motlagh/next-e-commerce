import React from "react"
import styles from "./header.module.scss"

function Navbar({ navbar, user, userLoading, children }) {
  return (
    <nav className={styles.navbar}>
      <span className={(styles.nav_item, styles.nav_firstdiv)}></span>
      {children}
    </nav>
  )
}

export default Navbar
