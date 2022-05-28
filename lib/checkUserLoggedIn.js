import { getCurrent } from "src/querys/querys";

export default (apolloClient) =>
  apolloClient
    .query({
      query: getCurrent,
    })
    .then(({ data }) => {
      // will return true if user is authenticated
      return { user: data.getCurrentUser, isAuthenticated: true };
    })
    .catch(() => {
      // Fail gracefully
      return { isAuthenticated: false };
    });
