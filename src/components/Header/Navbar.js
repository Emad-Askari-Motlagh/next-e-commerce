import React from "react"
import styles from "./header.module.scss"
import WebsiteName from "./WebsiteName"
import router from "next/router"
import { User } from "react-feather"
import * as Realm from "realm-web"

function Navbar({ navbar, user, userLoading, children }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_nav}>
        <span className={(styles.nav_item, styles.nav_firstdiv)}>
          <WebsiteName />
        </span>
        <Show_create_account_label user={user} />
        {children}
      </div>
    </nav>
  )
}

function Show_create_account_label({ navbar, user, userLoading }) {
  async function clicky() {
    // const app = new Realm.App({ id: "shopia-uosya" })
    // // Redirect Uri : <AppDomain>/redirect
    // const RedirectUri = "https://rent-app-emad.herokuapp.com/auth/login"
    // const credentials = Realm.Credentials.google(RedirectUri)
    // const user = await app.logIn(credentials)
  }
  var format = /[-@_.]/

  function trimUserName() {
    if (user?.match(format)) {
      const emi = user && user?.split(format)[0]
      const firstLetter = emi.charAt(0).toUpperCase()
      return emi.replace(emi.charAt(0), firstLetter)
    } else {
      return user
    }
  }

  return (
    <div className={styles.user} onClick={clicky}>
      <User className={styles.user_icons} />
      <span className={styles.showuser}>{trimUserName()}</span>
    </div>
  )
}

export default Navbar
