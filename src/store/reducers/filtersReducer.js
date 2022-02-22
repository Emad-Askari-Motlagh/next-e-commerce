import actionTypes from "@/store/actionTypes"
export const filterState = {
  filters: { location: "", category: "" },
}
const categoryAction = (state = filterState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCTS_FILTERS:
      return {
        ...state,
        filters: {
          category: action.payload.category,
          location: action.payload.location,
        },
      }

    default:
      return { ...state }
  }
}
export default categoryAction
