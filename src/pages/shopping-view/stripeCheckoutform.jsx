import React, { useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ amount, address, customerEmail, deliveryOption, paymentMethod,shopId, items, onSuccess }) => {
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
      // 1. Create PaymentIntent
      const paymentIntentRes = await axios.post("http://localhost:8765/ORDERMICROSERVICE/api/orders/payment-intent", {
        totalAmount: amount,
        customerEmail,
        address,
        deliveryOption,
        paymentMethod,
        shopId,
        items
      });

      const clientSecret = paymentIntentRes.data.clientSecret;
      if (!clientSecret) throw new Error("No client secret returned");

      // 2. Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement }
      });

      if (error) {
        console.error("Payment error:", error);
        alert(error.message);
      } else if (paymentIntent.status === "succeeded") {
        // 3. Save order to backend
        await axios.post(`http://localhost:8765/ORDERMICROSERVICE/api/orders/place?paymentId=${paymentIntent.id}`, {
          totalAmount: amount,
          customerEmail,
          address,
          deliveryOption,
          paymentMethod,
          shopId,
          items
        });

        alert("Payment successful! Order placed.");
        onSuccess();
      } else {
        alert("Payment processing failed. Please try again.");
      }

    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
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
