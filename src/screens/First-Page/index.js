import React, { useEffect, useRef } from "react"
import FirstPage_description from "@/screens/appDescriptionScreen"
import Image from "next/image"
import FirstPage_cards from "@/components/First-Page-Cards"
import useData from "../../statics/useData"
import styles from "./FirstPage.module.scss"
import Link from "next/link"
import useFilter from "src/hooks/filter.hook"
import Services from "src/screens/services"

export const FirstPageContent = () => {
  const { location, category } = useFilter()
  const containerRef = useRef()

  return (
    <div className={styles.pageOne} ref={containerRef}>
      <div className={styles.categorysContainer}>
        <svg
          className={styles.svgWave_down}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#0099ff"
            opacity="0.1"
            d="M0,256L48,213.3C96,171,192,85,288,96C384,107,480,213,576,234.7C672,256,768,192,864,186.7C960,181,1056,235,1152,213.3C1248,192,1344,96,1392,48L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <FirstPage_description styles={styles} />
        <div className={styles.scroll_container}>
          <ul className={styles.category_ul}>
            {typeof window !== "undefined" &&
              useData().categorysItems.map((categoryItem) => {
                return (
                  <li key={categoryItem.id}>
                    <Link
                      href={`/products/${categoryItem.name.toLowerCase()}?search=`}
                    >
                      <div className={styles.imageContainer}>
                        {categoryItem.src}
                        <label className={styles.category_label}>
                          {categoryItem.name}
                        </label>
                      </div>
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>
        <FirstPage_cards />
      </div>
      <div className={styles.secoundImageCon}>
        {/* <Image
          src="/space.png"
          layout="fill"
          objectFit="cover"
          className={styles.secoundImageDiv}
        ></Image> */}
        <Services />
      </div>
    </div>
  )
}
