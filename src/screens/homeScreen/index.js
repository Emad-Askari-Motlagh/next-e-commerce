import Head from "next/head"
import React, { useEffect, useState } from "react"
import styles from "../../../styles/Home.module.scss"
import Layout from "src/components/Primary-layout"
import { FirstPageContent } from "@/screens/First-Page"

const Home = (props) => {
  return (
    <>
      <Layout>
        <div className={styles.container}>
          <main className={styles.containermain}>
            <FirstPageContent />
          </main>
        </div>
      </Layout>
    </>
  )
}

export default Home
