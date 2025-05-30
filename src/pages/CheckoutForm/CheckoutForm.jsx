import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/payment/create-payment",
        {
          amount: 2000, // $20
        }
      );

      const result = await stripe.confirmCardPayment(res.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment succeeded!");
      }
    } catch (err) {
      setMessage("Payment failed: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <CardElement className="p-3 border border-gray-300 rounded" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {processing ? "Processing..." : "Pay $20"}
      </button>
      {message && <p className="text-sm mt-2 text-red-600">{message}</p>}
    </form>
  );
};

export default CheckoutForm;
