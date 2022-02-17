import { initializeStore } from "@/store/store";
import React from "react";
import AddressScreen from "@/screens/adressScreen";
import nookies from "nookies";

export default function index({ mydata }) {
  return <AddressScreen mydata={mydata} />;
}

// export async function getServerSideProps(ctx) {
//   try {
//     const cookies = nookies.get(ctx);
//     const reduxStore = initializeStore();
//     const { dispatch } = reduxStore;
//     await dispatch(getAddress(cookies.userCookie));
//     return { props: { mydata: reduxStore.getState().userState.addressess } };
//   } catch (err) {
//     // ctx.res.writeHead(302, { Location: "/login" });
//     // ctx.res.end();
//     return { props: {} };
//   }
// }
