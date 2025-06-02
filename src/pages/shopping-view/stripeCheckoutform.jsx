// CheckoutForm.jsx
import React, { useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ amount, address, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      // 1. Create PaymentIntent by calling backend
      const response = await axios.post(
        "http://localhost:8765/ORDERMICROSERVICE/api/orders",
        {
          amount,
          shipping: { address },
        }
      );

      const clientSecret = response.data.clientSecret;

      if (!clientSecret) {
        throw new Error("No client secret received from backend");
      }

      // 2. Get card details and confirm payment
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (error) {
        console.error("Payment failed:", error);
        alert(error.message);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        onSuccess();
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#333",
              "::placeholder": { color: "#aaa" },
            },
          },
        }}
        className="border rounded p-3 bg-white"
      />
      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full bg-[#F5B3AD] text-[#81504D] py-2 px-4 rounded hover:bg-[#f7c2bd]"
      >
        {loading ? "Processing..." : `Pay Nu. ${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
