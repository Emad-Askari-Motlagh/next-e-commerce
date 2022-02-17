import React, { useEffect } from "react"
import styles from "./cart-item.module.scss"

export default function CartItem({
  id,
  size,
  count,
  onAdd,
  onRemove,
  image,
  price,
  text,
  loading,
  navigateToProduct,
  category,
}) {
  return (
    <div className={styles.container}>
      <img
        src={image}
        className={styles.image}
        loading="lazy"
        onClick={() => navigateToProduct(id, text, category)}
      />

      <div className={styles.textContainer}>
        <h4>{text || ""}</h4>
        <span>Size: {size || "-"}</span>
      </div>
      <span className={styles.price}>{price * count || "0"}$</span>
      <div className={styles.buttons}>
        <button onClick={() => onRemove(size, id)}> -</button>
        <span>{size || "0"}</span>
        <button onClick={() => onAdd(id, text, text, image, price, size)}>
          +
        </button>
      </div>
    </div>
  )
}
