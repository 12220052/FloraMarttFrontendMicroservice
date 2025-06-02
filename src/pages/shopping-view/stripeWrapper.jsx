// StripeWrapper.jsx
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51RFdUeR8Jwbn2s9nNFjIzKZAwHxvXbsYJ58z0sdDX6ApPl1HtUV6Ib67Kycs2b5pPzjv8xHHof60BCENOvFxDvDc002Hl1fcxW");

const StripeWrapper = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeWrapper;
