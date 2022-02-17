import React, { useState } from "react"
import styles from "./categorySuggestion.module.scss"
import HeartIcon from "@/icons/heart"
import Link from "next/link"
import HeartFilled from "@/icons/heart-filled"
import { useRouter } from "next/router"
import useAuth from "src/hooks/useAuth"

export default function categorySuggestion({
  name,
  id,
  price,
  category,
  image,
  ...props
}) {
  const [isFavorite, setFavorite] = useState()
  const { user } = useAuth()
  const router = useRouter()

  // const removeEvent = (id) => {
  //   removeFavorite(id);
  //   setFavorite(false);
  // };
  // const addEvent = (id) => {
  //   addFavorite(id);
  //   setFavorite(true);
  // };

  const goToProduct = (target) => {
    target?.localName !== "button" &&
      typeof window !== "undefined" &&
      router.push(`/product/${category}/${name}/${id}`)
  }

  return (
    <div
      className={styles.container}
      onClick={(e) => goToProduct(e.target)}
      {...props}
    >
      <button className={styles.favContainer}>
        {isFavorite ? (
          <HeartFilled width={16} height={16} />
        ) : (
          <HeartIcon width={16} height={16} />
        )}
      </button>
      <div className={styles.imageContainer}>
        {image && <img className={styles.image} src={image} loading="lazy" />}
      </div>
      <div className={styles.textContainer}>
        <h4>{name}</h4>
        {price ? (
          <div className={styles.priceContainer}>
            <div className={styles.discount}>
              {((price / price) * 100) | 0}%
            </div>
            <div className={styles.prices}>
              <span className={styles.priceText}>{price}$</span>
              <span className={styles.salePriceText}>{price}$</span>
            </div>
          </div>
        ) : (
          <span className={styles.price}>{price || 0}$</span>
        )}
      </div>
    </div>
  )
}
