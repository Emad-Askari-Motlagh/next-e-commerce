import React from "react";
import actionTypes from "../actionTypes";

export default function categoryActions() {}

export function setFilter(filters) {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.PRODUCTS_FILTERS,
      payload: {
        category: filters.category,
        location: filters.location,
      },
    });
  };
}
