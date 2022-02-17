import Head from "next/head"
import styles from "./basket.module.scss"
import Layout from "src/components/Primary-layout"
import CartItem from "@/components/Basket-Item"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ErrorPage from "../../../pages/404"
import useAuth from "src/hooks/useAuth"
import { useCart } from "src/hooks/cart.hook"

export default function basket() {
  const { userObject } = useAuth()

  const {
    addToCart,
    removeFromCart,
    data,
    loading,
    itemsOnCart = 0,
  } = useCart(userObject?.id)

  const router = useRouter()

  function navigateToProduct(id, name, category) {
    router.push(`/product/${category}/${name}/${id}`)
  }
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Shopia Basket</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>My Cart</h1>
            <h4>You have {itemsOnCart} items in your cart</h4>
          </div>
          {data.length ? (
            data.map((item, index) => {
              return (
                <CartItem
                  key={"index"}
                  id={item._id}
                  size={item.quantity}
                  count={item.quantity}
                  onAdd={() => addToCart(userObject.id, item._id)}
                  onRemove={() => removeFromCart(userObject.id, item._id)}
                  gotenProduct={data}
                  image={item.image}
                  price={item.price}
                  text={item.name}
                  loading={loading}
                  navigateToProduct={navigateToProduct}
                  category={item.category}
                />
              )
            })
          ) : !loading ? (
            <h4>Obs! No items on cart</h4>
          ) : (
            <div>Loading...</div>
          )}
          <button
            className={styles.payment_button}
            onClick={() =>
              typeof window !== undefined && router.push("/payment")
            }
          >
            Go to chekout
          </button>
        </main>
      </div>
    </Layout>
  )
}
