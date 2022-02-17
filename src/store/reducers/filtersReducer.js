import actionTypes from "@/store/actionTypes"

const categoryAction = (
  state = {
    filters: { location: "", category: "" },
  },
  action
) => {
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
