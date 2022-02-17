import React, { useRef, useState, useEffect } from "react"
import styles from "./header.module.scss"
import Navbar from "../Navbar"
import NavItem from "../NavItem"
import DropdownMenu from "../DropdownMenu"
import {
  Home,
  Settings,
  MoreHorizontal,
  LogIn,
  LogOut,
  ShoppingBag,
  ShoppingCart,
} from "react-feather"

import useVisible from "src/hooks/useVisible"
import router, { useRouter } from "next/router"
import { useMediaQuery } from "react-responsive"
import useAuth from "src/hooks/useAuth"

export default function HeaderScreen(props) {
  const Router = useRouter()
  const { isVisible, setIsVisible, ref } = useVisible(false)
  const { user } = useAuth()

  return (
    <Navbar {...props} user={user}>
      <ul className={styles.items_cont}>
        <NavItem
          onClick={() => Router.push("/")}
          header_label="Hem"
          icon={<Home size={42} className={styles.icons} />}
        />
        <NavItem
          onClick={() => Router.push("/")}
          header_label={!user ? "Login" : "Basket"}
          icon={
            !user ? (
              <LogIn size={42} className={styles.icons} />
            ) : (
              <ShoppingCart size={42} className={styles.icons} />
            )
          }
        />
        <NavItem
          header_label="Mer"
          icon={
            <MoreHorizontal
              className={styles.icons}
              size={42}
              onClick={() =>
                !isVisible ? setIsVisible(true) : setIsVisible(false)
              }
            />
          }
        >
          <DropdownMenu
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            elementRef={ref}
          ></DropdownMenu>
        </NavItem>
      </ul>
    </Navbar>
  )
}
