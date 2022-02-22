import * as actionTypes from "@/store/actionTypes"
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

export const productState = { products: [], suggestionList: [], historys: [] }
export default function productReducer(state = productState, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    case PRODUCT_SUGGESTION_SUCCESS:
      return { ...state, loading: false, suggestionList: action.payload }
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_SEARCH_HISTORY:
      return { ...state, historys: action.payload }
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        success: true,
      }
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }

    case PRODUCT_SAVE_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      }
    case PRODUCT_SAVE_FAIL:
      return { ...state, loading: false, error: action.payload }

    case PRODUCT_REVIEW_SAVE_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_REVIEW_SAVE_SUCCESS:
      return { ...state, loading: false, review: action.payload, success: true }
    case PRODUCT_REVIEW_SAVE_FAIL:
      return { ...state, loading: false, errror: action.payload }
    case PRODUCT_REVIEW_SAVE_RESET:
      return {}

    default:
      return state
  }
}
