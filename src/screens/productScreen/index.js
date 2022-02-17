import { useState, useEffect } from "react"
import Head from "next/head"
import styles from "./product.module.scss"
import Layout from "src/components/Primary-layout"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import Lottie from "react-lottie-player"
import lottieJson from "@/public/spiner_lottie.json"
import dynamic from "next/dynamic"
import useAuth from "src/hooks/useAuth"
import ProductCard from "@/components/productCard"
import { FiArrowLeft } from "react-icons/fi"
import Categorys from "src/components/categorySuggestion"
import useProduct from "src/hooks/product.hook"

export default function Product({ product, id }) {
  const router = useRouter()
  const selectedProduct = JSON.parse(product)
  const { user, userObject } = useAuth()
  const sizes = [22, 42]
  const [userlocation, setLocation] = useState()
  const dispatch = useDispatch()
  const images = selectedProduct?.image
  const [selectedSize, setSelectedSize] = useState()
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const { currentUser } = useSelector((state) => state.userState)
  const { products } = useProduct()

  // const DynamicMap = dynamic(() => import("src/components/Map"), {
  //   loading: () => <p>Loading...</p>,
  //   ssr: false,
  // });
  // const { data: cartData, addToCart } = useCart(userObject?.id);

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        {selectedProduct?.name ? (
          <div>
            <Button
              style={{ zIndex: 50 }}
              className="btn btn-default h-4 w-30 btn-dark float-md-left position-absolute pr-md-4 m-xl-2 btn-outline-primary"
              onClick={() => router.back()}
            >
              <FiArrowLeft />
              Backs
            </Button>
            {product ? (
              <ProductCard product={selectedProduct} id={id} />
            ) : (
              <span>nothinggg...</span>
            )}
          </div>
        ) : (
          <div>
            <h3>Loading</h3>
            <Lottie
              loop
              animationData={lottieJson}
              play
              style={{ width: 150, height: 150, margin: "auto" }}
            />
          </div>
        )}
        {/* <DynamicMap
          longitude={userLocation.longitude}
          latitude={userLocation.latitude}
        /> */}
        {products?.length &&
          products.map((product) => {
            return (
              <Categorys
                key={product._id}
                id={product._id}
                name={product?.name}
                image={product?.image}
                price={product.price}
                category={product.category}
              />
            )
          })}
      </div>
    </Layout>
  )
}
