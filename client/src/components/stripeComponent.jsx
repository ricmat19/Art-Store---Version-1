import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import PaymentC from "./payment";
import CheckoutC from "./checkout";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPEPUBLIC);

const StripeC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutC />
    </Elements>
  );
};

export default StripeC;
