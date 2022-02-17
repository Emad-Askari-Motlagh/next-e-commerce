import React, { useState, useEffect } from "react"
import styles from "./Product.module.scss"
import HeartIcon from "src/components/icons/heart"
import HeartFilled from "@/components/icons/heart-filled"
import Gallerry from "@/components/Gallery"
import Button from "react-bootstrap/Button"
import axios from "axios"
import { IoMdDoneAll } from "react-icons/io"
import useAuth from "src/hooks/useAuth"
import { useCart } from "src/hooks/cart.hook"
import { CapitaliseFirstLetter } from "src/statics/staticFunctions"
import { Alert } from "react-bootstrap"

export default function Product({ product, id }) {
  const selectedProduct = product
  const price = selectedProduct?.price
  const text = selectedProduct?.name
  const productId = selectedProduct?.id
  const images = selectedProduct?.image
  const description = selectedProduct?.description
  const date = selectedProduct?.createdAt
  const location = selectedProduct?.location
  const [added, setAdded] = useState(false)
  const [isFavorite, setFavorite] = useState(false)
  const [addToCartError, setAddToCArtError] = useState()
  const [addedToCart, setAddedToCArt] = useState(false)
  const { userObject, user } = useAuth()
  const { getCardItems } = useCart(userObject.id)

  const removeEvent = (id) => {
    setFavorite(false)
  }
  const addEvent = (id) => {
    setFavorite(true)
  }
  const addToCart = async () => {
    setAddedToCArt(false)

    try {
      const res = await axios.post(
        `${process.env.SERVER_LINK}/api/card/addtoCard/${userObject.id}/${id}
        `,
        { quantity: 1 }
      )
      if (res.data) {
        setAddedToCArt(true)
        getCardItems()
      }
      setTimeout(() => {
        setAddedToCArt(false)
      }, 2000)
    } catch (error) {
      setAddToCArtError(error.reponce?.data)
    }
  }
  const favoriteEvent = () => {
    user
      ? isFavorite
        ? removeEvent(id)
        : addEvent(id)
      : router.push("/auth/login")
  }

  return (
    <main className={styles.main}>
      <div className={styles.photosContainer}>
        <div className={styles.carouselContainer}>
          {images && <Gallerry images={images} loading="lazy" small={true} />}
        </div>

        <hr />
      </div>
      <div className={styles.productInfos}>
        <div className={styles.header}>
          <h1 className={styles.productTitle}>
            {CapitaliseFirstLetter(text) || ""}
          </h1>
        </div>
        <span className={styles.priceText}>{price || 0}$</span>
        <div className={styles.saleContainer}>
          <span className={styles.saleText}>{price || 0}$</span>
          <span className={styles.savedText}>
            {"(You will be saved " + (price - price) + "$!)"}
          </span>
        </div>
        <hr />
        <div className={styles.sizes}>
          <h4 className={styles.sizesText}>Sizes</h4>
        </div>
        <hr />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={styles.buttons}>
            <Button style={{ margin: 0 }} onClick={addToCart}>
              Add to Cart
            </Button>
            <button className={styles.favButton} onClick={favoriteEvent}>
              {isFavorite ? (
                <HeartFilled width={24} height={24} />
              ) : (
                <HeartIcon width={24} height={24} />
              )}
            </button>
          </div>
          {addedToCart && (
            <Alert
              show={() =>
                setTimeout(() => {
                  return false
                }, 2000)
              }
              variant="success"
            >
              Added to basket
              <IoMdDoneAll />
            </Alert>
          )}
        </div>

        <hr />
        <div className={styles.infoContainer}>
          <h4 className={styles.sizesText}>Product Information</h4>
          <p className={styles.infoText}>{"information"}</p>
        </div>
        <Button style={{ margin: 0 }} onClick={addToCart}>
          Contact the seller
        </Button>
      </div>
    </main>
  )
}
