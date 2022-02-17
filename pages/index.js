import Head from "next/head"
import React, { useEffect } from "react"
import HomeScreen from "@/screens/homeScreen/index.js"

const Home = (props) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <HomeScreen {...props} />
    </>
  )
}
export default Home
