import Head from "next/head"
import React, { useEffect, useLayoutEffect } from "react"
import HomeScreen from "@/screens/homeScreen"

const Home = (props) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <HomeScreen {...props}></HomeScreen>
    </>
  )
}
export default Home
