import * as actionTypes from "@/store/actionTypes"
import axios from "axios"

const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_RESET,
  PRODUCT_SUGGESTION_SUCCESS,
  PRODUCT_SEARCH_HISTORY,
} = actionTypes.default

const listProducts =
  (category, searchKeyword, location) => async (dispatch, getState) => {
    const { userState } = getState()

    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const { data } = await axios.get(
        `${process.env.SERVER_LINK}/api/search?category=` +
          category +
          "&searchKeyword=" +
          searchKeyword +
          "&userId=" +
          userState.currentUser.id +
          "&location=" +
          location
      )
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
      return data
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
      console.log(error)
    }
  }

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product })
    const {
      userSignin: { userInfo },
    } = getState()
    if (!product._id) {
      const { data } = await Axios.post(
        `${process.env.SERVER_LINK}/api/products`,
        product,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      )
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data })
    } else {
      const { data } = await Axios.put(
        `${process.env.SERVER_LINK}/api/products/` + product._id,
        product,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      )
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data })
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message })
  }
}

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })
    const { data } = await axios.get(
      `${process.env.SERVER_LINK}/api/products/` + productId
    )
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message })
  }
}

const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState()
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId })
    const { data } = await axios.delete(
      `${process.env.SERVER_LINK}/api/products/` + productId,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    )
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true })
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message })
  }
}

const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState()
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review })
    const { data } = await axios.post(
      `${process.env.SERVER_LINK}/api/products/${productId}/reviews`,
      review,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data })
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message })
  }
}
const getSuggestionList =
  (category = "", searchKeyword = "", location = "") =>
  async (dispatch, getState) => {
    try {
      const { userState } = getState()

      const { data } = await axios.get(
        `${process.env.SERVER_LINK}/api/search?category=` +
          category +
          "&searchKeyword=" +
          searchKeyword +
          "&location=" +
          location +
          "&userId=" +
          userState.currentUser.id +
          "&suggestion=" +
          true
      )
      dispatch({ type: PRODUCT_SUGGESTION_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
    }
  }
const getSearchHistory =
  (category = "", searchKeyword = "", sortOrder = "") =>
  async (dispatch, getState) => {
    try {
      const { userState } = getState()

      const { data } = await axios.get(
        `${process.env.SERVER_LINK}/api/products/saveHistorySuggestion?category=` +
          category +
          "&searchKeyword=" +
          searchKeyword +
          "&sortOrder=" +
          sortOrder +
          "&userId=" +
          userState.currentUser.id
      )
      dispatch({ type: PRODUCT_SEARCH_HISTORY, payload: data })
    } catch (error) {
      console.log(error)
    }
  }
export {
  listProducts,
  detailsProduct,
  saveProduct,
  deleteProdcut,
  saveProductReview,
  getSuggestionList,
  getSearchHistory,
}
