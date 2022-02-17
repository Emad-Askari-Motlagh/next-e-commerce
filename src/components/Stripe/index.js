import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { stripeApiKey } from "../../../keys";
import Chekout from "./Chek";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(stripeApiKey);

const Card = () => {
  return (
    <Elements stripe={stripePromise}>
      <Chekout />
    </Elements>
  );
};
export default Card;
