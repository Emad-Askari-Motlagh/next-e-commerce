import React, { useRef, useState, useEffect, useReducer } from "react"
import styles from "./header.module.scss"
import Navbar from "./Navbar"
import NavItem from "./NavItem"
import DropdownMenu from "./DropdownMenu"
import {
  Home,
  Settings,
  MoreHorizontal,
  LogIn,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  User,
} from "react-feather"

import useVisible from "src/hooks/useVisible"
import router, { useRouter } from "next/router"
import { useMediaQuery } from "react-responsive"
import { useProvideAuth, useAuth, useDispatch } from "src/hooks/useAuth"
import WebsiteName from "./WebsiteName"

export default function HeaderScreen(props) {
  const Router = useRouter()
  const { isVisible, setIsVisible, ref } = useVisible(false)
  const { user, logOutUser } = useProvideAuth()

  return (
    <Navbar {...props}>
      <WebsiteName />
      <Show_create_account_label user={user} />

      <ul className={styles.items_cont}>
        <NavItem
          onClick={() => Router.push("/")}
          header_label="Hem"
          icon={<Home className={styles.navItemIcon} />}
        />
        <NavItem
          onClick={() => Router.push("/auth/login")}
          header_label={!user.user ? "Login" : "Basket"}
          icon={
            !user?.user ? (
              <LogIn className={styles.navItemIcon} />
            ) : (
              <ShoppingCart className={styles.navItemIcon} />
            )
          }
        />
        <NavItem
          header_label="Mer"
          icon={
            <MoreHorizontal
              className={styles.navItemIcon}
              onClick={() =>
                !isVisible ? setIsVisible(true) : setIsVisible(false)
              }
            />
          }
        ></NavItem>
      </ul>

      <DropdownMenu
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        elementRef={ref}
        logOut={logOutUser}
      ></DropdownMenu>
    </Navbar>
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

  // function trimUserName() {
  //   if (user?.username?.match(format)) {
  //     const emi = user && user?.split(format)[0]
  //     const firstLetter = emi.charAt(0).toUpperCase()
  //     return emi.replace(emi.charAt(0), firstLetter)
  //   } else {
  //     return user
  //   }
  // }

  return (
    <div className={styles.user} onClick={clicky}>
      <User className={styles.user_icons} />
      <span className={styles.showuser}>{user && user?.user}</span>
    </div>
  )
}
