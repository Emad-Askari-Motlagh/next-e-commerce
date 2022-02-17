import "../styles/globals.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from "react-redux"
import React from "react"
import { useRouter } from "next/router"
import Lottie from "react-lottie-player"
import styles from "../styles/Home.module.scss"
import lottieJson from "../public/spiner_lottie.json"
import { useStore } from "../src/store/store"
import Layout from "src/components/Primary-layout"
import { init } from "emailjs-com"

function myApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false)
  const store = useStore(pageProps.initialReduxState)
  const Router = useRouter()

  React.useEffect(() => {
    init("user_CEhllCTmXmnbP2vdGjvTD")

    const start = () => {
      console.log("start")
      setLoading(true)
    }

    const end = () => {
      console.log("findished")
      setLoading(false)
    }
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])
  return (
    //if  loading is false then we render whole app but before that spinner spining
    <Provider store={store}>
      {loading ? (
        <Layout>
          <div style={{ height: "100vh", width: "100vw" }}>
            <h3 className={styles.loading_h5}>Loading...</h3>

            <Lottie
              loop
              animationData={lottieJson}
              play
              style={{ width: 150, height: 150, margin: "auto" }}
            />
          </div>
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  )
}

export default myApp