import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  listProducts,
  getSuggestionList,
  getSearchHistory,
} from "@/actions/productsActions"
import { useRouter } from "next/router"

export default function useProduct() {
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");
  // const productDetails = useSelector((state) => state.productState);
  // const { product, loading, error } = productDetails;
  // const productReviewSave = useSelector((state) => state.productReviewSave);
  // const { success: productSaveSuccess } = productReviewSave;
  const [searchKeyword, setSearchKeyword] = useState("")
  const router = useRouter()
  // const { location, category } = useFilter()

  const { products, loading, suggestionList, historys } = useSelector(
    (state) => state.productState
  )
  const dispatch = useDispatch()
  // const { category, location } = router.query
  const { category, searchKeyword: query, location } = router.query

  useEffect(() => {
    dispatch(listProducts(category, query, location))
  }, [router.query])

  useEffect(() => {
    // dispatch(getSearchHistory(category, searchKeyword))
    if (searchKeyword && searchKeyword.length > 0)
      dispatch(getSuggestionList(category, searchKeyword, location))
  }, [searchKeyword])

  const submitHistory = (searchQuery) => {
    dispatch(listProducts(category, searchQuery, location))
  }

  return {
    products,
    loading,
    setSearchKeyword,
    suggestionList,
    historys,
    searchKeyword,
    submitHistory,
  }
}

export const getProductById = (id) => {
  const [gotenId, fetchId] = useState(null)
  const [products, setProductNamee] = useState([])
  useEffect(() => {
    if (gotenId) {
      getProducts()
    }
  }, [gotenId])

  async function getProducts() {
    try {
    } catch (err) {
      return err
    }
  }
  return { gotenProduct: products, fetchId }
}
