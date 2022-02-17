import { testKey } from "../../keys";
import Stripe from "stripe";
import Cors from "cors";
const stripe = new Stripe(testKey);
// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async (req, res) => {
  await runMiddleware(req, res, cors);
  if (req.method === "POST") {
    let { amount, id } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "sek",
      payment_method_types: ["card"],
      confirm: "true",
      id,
    });
    return res.send("lll");
    // Rest of the API logic
  } else {
    res.setHeader("Allow", "POST");
    res.send("get");
  }
};
