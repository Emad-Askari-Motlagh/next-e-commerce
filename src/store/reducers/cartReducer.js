import actionTypes from "@/store/actionTypes"
const initialState = {
  itemsOnCart: null,
}
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BASKET_ITEM_COUNT:
      return {
        ...state,
        itemsOnCart: action.payload,
      }

    default:
      return { ...state }
  }
}
export default cartReducer
