export const addFilters = (products, params, filters, text) => {
  const filterKeys = Object.keys(filters);
  const filterValues = Object.values(filters);
  const filterdPdoducts = products.filter((item, index, newArray) => {
    return filterKeys.every((key, i, arr) => {
      if (item.text.includes(text) && item[key].includes(params[key])) {
        return true;
      } else if (params[key].includes("all") && item.text.includes(text)) {
        return true;
      } else if (item[key].includes(params[key]) && !text) {
        return true;
      } else if (params[key].includes("all") && !text) {
        return true;
      }
    });
  });
  return filterdPdoducts;
};
