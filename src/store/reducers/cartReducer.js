import actionTypes from "@/store/actionTypes"
export const cardState = {
  itemsOnCart: null,
}
const cartReducer = (state = cardState, action) => {
  switch (action?.type) {
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
