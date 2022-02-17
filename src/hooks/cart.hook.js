import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import useAuth from "./useAuth"
import { setBasketCookie } from "src/store/actions/cartActions"
import { useRouter } from "next/router"

const useCart = (id) => {
  const { itemsOnCart = 0 } = useSelector((state) => state?.cartState)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  async function getCardItems() {
    setLoading(true)
    try {
      const res = await axios.get(
        `${process.env.SERVER_LINK}/api/card/getItems/${id}`
      )
      const rr = []
      res.data?.cart?.items?.map((item) => {
        item.product.quantity = item.quantity
        rr.push(item.product)
      })
      setData([...rr])
      setLoading(false)
      dispatch(setBasketCookie(res.data.sum))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (id) {
      getCardItems()
    }
  }, [id])

  const add = async (id, productId) => {
    try {
      await axios.put(
        `${process.env.SERVER_LINK}/api/card/plusorminus/${id}/${productId}`,
        { method: "plus" }
      )

      getCardItems()
    } catch (error) {
      console.log("error happpend")
    }
  }

  const minus = async (id, productId) => {
    try {
      await axios.put(
        `${process.env.SERVER_LINK}/api/card/plusorminus/${id}/${productId}`,
        { method: "minus" }
      )
      getCardItems()
    } catch (error) {
      console.log("error happpend")
    }
  }

  return {
    data,
    error,
    addToCart: add,
    removeFromCart: minus,
    itemsOnCart,
    getCardItems,
    loading,
  }
}

export { useCart }
