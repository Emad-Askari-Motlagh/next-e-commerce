import Link from "next/link"
import route from "next/router"
import { FiArrowRight, FiArrowLeft } from "react-icons/fi"
import styles from "./Cards.module.scss"
import { motion } from "framer-motion"
import usedimesions from "src/hooks/Dimensions.hook"
import Lottie from "react-lottie-player"
import { useRef } from "react"
import shopLottie from "../../../public/shop.json"
import sellLottie from "../../../public/sell.json"

export default function firstPage_cards() {
  const { width, height } = usedimesions()
  const divRef = useRef()

  const lottieStyles = {
    width: width > 700 ? "15vw" : "25vw",
    height: width > 700 ? "15vw" : "25vw",
    position: "relative",
    top: width > 700 ? "1em" : "0.2em",
    overflow: "hidden",
    borderRadius: "240px",
    padding: "10%",
  }
  return (
    <div className={styles.sellshop_div} ref={divRef}>
      <Link href="/sell/Sell">
        <motion.div
          // onClick={() => typeof window !== undefined && route.push("/shop/Shop")}
          className={styles.sellshop_div_cards}
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <label className={styles.labels}>
            <FiArrowLeft /> SELL
          </label>

          <Lottie loop animationData={sellLottie} play style={lottieStyles} />
        </motion.div>
      </Link>
      <Link href="products?category=&searchKeyword&location=">
        <motion.div
          // onClick={() => typeof window !== undefined && route.push("/sell/Sell")}
          className={styles.sellshop_div_cards}
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <label className={styles.labels} style={{ right: 0 }}>
            SHOP <FiArrowRight />
          </label>
          <Lottie loop animationData={shopLottie} play style={lottieStyles} />
        </motion.div>
      </Link>
    </div>
  )
}
