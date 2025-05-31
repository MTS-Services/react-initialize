import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": { color: "#aab7c4" },
      fontFamily: "Roboto, sans-serif",
      padding: "10px 14px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const RegisterPage = () => {
  const { createUser, setIsLoading, isLoading } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [processing, setProcessing] = useState(false);

  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet.");
      return;
    }

    setProcessing(true);
    setIsLoading(true);

    try {
      // 1. Create Payment Intent
      const paymentRes = await axios.post(
        "http://localhost:3000/api/payment/create-payment",
        {
          amount: 2000,
          metadata: {
            name: data.name,
            email: data.email,
          },
        }
      );
      const clientSecret = paymentRes.data.clientSecret;

      // 2. Confirm Card Payment
      const cardElement = elements.getElement(CardNumberElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message);
        setProcessing(false);
        setIsLoading(false);
        return;
      }

      if (paymentResult.paymentIntent.status === "succeeded") {
        // 3. Register user in your system
        const res = await createUser(data.email, data.password);

        const uid = res?.user?.uid || res?.localId;
        const email = res?.user?.email;

        if (!uid) {
          toast.error("User creation failed: No UID returned.");
          return;
        }

        await axios.post("http://localhost:3000/api/users/create", {
          name: data.name,
          email,
          uid,
          paymentDate: new Date().toISOString(),
          amount: paymentResult.paymentIntent.amount,
          transactionId: paymentResult.paymentIntent.id,
        });

        // 4. Inform user that registration will complete shortly
        toast.info(
          "Payment successful! Registration processing. You will receive confirmation soon."
        );

        // 5. Optionally redirect or show status page
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setProcessing(false);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-8 rounded shadow space-y-6"
    >
      {/* Name */}
      <div>
        <label className="block mb-1 font-semibold">Full Name</label>
        <input
          {...register("name", { required: "Name required" })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          type="text"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input
          {...register("email", { required: "Email required" })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          type="email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block mb-1 font-semibold">Password</label>
        <input
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          type="password"
        />
        {errors.password && (
          <p className="text-red-500">
            {errors.password.message || "Minimum 6 characters"}
          </p>
        )}
      </div>

      {/* Card Number */}
      <div>
        <label className="block mb-1 font-semibold">Card Number</label>
        <div className="border border-gray-300 rounded p-3 mb-4">
          <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      {/* Expiry & CVC Row */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Expiry Date</label>
          <div className="border border-gray-300 rounded p-3">
            <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-semibold">CVC</label>
          <div className="border border-gray-300 rounded p-3">
            <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={processing || isLoading}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
      >
        {processing || isLoading ? "Processing..." : "Register & Pay $20"}
      </button>
    </form>
  );
};

export default RegisterPage;
