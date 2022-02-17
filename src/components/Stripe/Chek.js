import React, { useEffect, useState, useCallback, useMemo } from "react";
import { stripeApiKey, testKey } from "../../../keys";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import axios from "axios";
import style from "./Emi.module.scss";
import { Alert, Button } from "react-bootstrap";
import { useCart } from "src/hooks/cart.hook";
import { useAddresses } from "src/hooks/address.hook";
import useAuth from "src/hooks/useAuth";

const Address = () => {
  const { data: addresses, loading } = useAddresses();

  return (
    <div className={style.address_container}>
      <label>Address</label>

      {/* {addresses &&
        Object.entries(first).map((ress, index, array) => {
          console.log(ress[1]);
        })} */}
    </div>
  );
};

export default function stripe({ amount }) {
  // const stripe = useStripe();
  // const elements = useElements();
  // const stripePromise = loadStripe(stripeApiKey);
  // const [success, setSuccess] = useState(false);
  // const [error, setError] = useState(null);
  // const { data } = useCart();
  // const { user, loading } = useAuth();
  // const aa = [1, 1, 2, 5];

  // const handleSubmit = async (event) => {
  //   // Block native form submission.
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const cardElement = elements.getElement(CardElement);

  //   // Use your card Element with other Stripe.js APIs
  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: cardElement,
  //   });

  //   if (error) {
  //     console.log("[error]", error);
  //     setError(error.message);
  //   } else {
  //     try {
  //       const { id } = paymentMethod;
  //       const response = axios.post("/payment/stripe", {
  //         amount: 1000,
  //         id,
  //       });

  //       console.log((await response).data);
  //     } catch (err) {
  //       console.log("Error", err.message);
  //       setError(err.message);
  //     }
  //   }
  // };
  // function hasDuplicates(array) {
  //   return new Set(array).size !== array.length;
  // }
  // const cartLength =
  //   (data && Object.keys(data).reduce((a, b) => a + data[b].length, 0)) || 0;
  // const cartItems =
  //   cartLength > 0 && data
  //     ? Object.keys(data)
  //         .map((item) => {
  //           return data[item].map((obj) => {
  //             return {
  //               text: obj.text,
  //               size: data[item].length,
  //               image: obj.image,
  //               price: obj.price,
  //               id: item,
  //               count: data[item].length,
  //             };
  //           });
  //         })
  //         .flat(1)
  //     : [];

  // //filter objects with same id and put theme in array
  // const cartItemsArray = [
  //   ...new Set(
  //     cartItems.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
  //   ),
  // ].map((item) => {
  //   return { ...item };
  // });

  // const sum = cartItemsArray.reduce((acc, item) => {
  //   return (acc += item.price);
  // }, []);

  return (
    <div className={style.container}>
      {/* <div className={style.innerContainer}>
        <Button variant="back" className="w-auto m-2 pl-lg-1 pr-lg-1 w-2 ">
          Back
        </Button>
        <form className={style.stripeForm}>
          <motion.label
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="title has-text-weight-bold is-1 is-size-2-mobile is-spaced"
            style={{ fontSize: "2vw" }}
            layoutId="title"
          >
            Payment...
          </motion.label>
          {user && (
            <div className={style.price_container}>
              <label>Price</label>
              <p>{`${sum} kr`} </p>
            </div>
          )}
          <Address />
          <motion.label
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              fontSize: "1em",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
            layoutId="title"
          >
            Card specifications
          </motion.label>
          <CardElement
            options={{
              iconStyle: "solid",

              style: {
                base: {
                  iconColor: "pink",
                  color: "green",
                  fontWeight: 400,
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                  fontSize: "4vw",
                  fontSmoothing: "antialiased",
                  width: "100%",

                  "::placeholder": {
                    color: "grey",
                  },
                  ":-webkit-autofill": {
                    color: "red",
                  },
                },
                invalid: {
                  iconColor: "#FFC7EE",
                  color: "#FFC7EE",
                },
              },
            }}
          ></CardElement>

          <button type="submit">Pay</button>
        </form>

        {error && (
          <Alert style={{ margin: "auto", maxWidth: "40vw" }} variant="danger">
            {error}
          </Alert>
        )}
      </div> */}
    </div>
  );
}
