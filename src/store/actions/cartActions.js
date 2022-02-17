import { setCookie } from "nookies"
import * as actionsTypes from "src/store/actionTypes"

export function setBasketCookie(cartItems) {
  return async (dispatch) => {
    try {
      await setCookie(null, "basketItems", cartItems, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      })
      dispatch({
        type: actionsTypes.default.BASKET_ITEM_COUNT,
        payload: cartItems,
      })
    } catch (error) {
      dispatch({
        type: actionsTypes.default.BASKET_ITEM_COUNT_ERROR,
        payload: "Couldnt  ount the items",
      })
    }
  }
}
