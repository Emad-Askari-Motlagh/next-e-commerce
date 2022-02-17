// import cors from "cors";
// const stripe = import("stripe")(
//   "sk_test_51IS45kH9wzUe6pYJccixm8GgoOMRHmVE3uVpSUQu3p2ClfNPxYXe9TWnqjL7gZaeURIiJjlaYiNThJNPdRq4tvfA00UvevgtEv"
// );
// const Stripe = (server) => {
//   server.post("/payment/stripe", cors(), async (req, res) => {
//     const { id, amount } = req.body;
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "sek",
//       payment_method_types: ["card"],
//       statement_descriptor: "Custom descriptor",
//     });

//     // Rest of the API logic
//     return res.send(paymentIntent);
//   });
// };
// export default Stripe;
