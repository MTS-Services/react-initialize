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
      const paymentRes = await axios.post(
        "http://localhost:3000/api/payment/create-payment",
        {
          amount: 2000,
          metadata: {
            name: data.name,
            email: data.email,
          },
        },
      );

      const clientSecret = paymentRes.data.clientSecret;
      const cardElement = elements.getElement(CardNumberElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message);
        return;
      }

      if (paymentResult.paymentIntent.status === "succeeded") {
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

        toast.info(
          "Payment successful! Registration processing. You will receive confirmation soon.",
        );
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setProcessing(false);
      setIsLoading(false);
    }
  };

  return (
    <section
      className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-white via-blue-50 to-blue-100 px-6 py-12"
      style={{ fontFamily: "var(--font-secondary)" }}
    >
      <div className="container flex max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-lg md:flex-row">
        {/* Left Image Section */}
        <div className="hidden items-center justify-center p-8 md:flex md:w-1/2">
          <img
            src="/register-image.png"
            alt="Register Visual"
            className="h-auto max-w-full object-contain"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-[#19398A]">
            Register & Pay $20
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name required" })}
                className={`w-full rounded-xl border px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email required" })}
                className={`w-full rounded-xl border px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className={`w-full rounded-xl border px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Card Number */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Card Number
              </label>
              <div className="rounded-xl border border-gray-300 p-3">
                <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
              </div>
            </div>

            {/* Expiry and CVC */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Expiry Date
                </label>
                <div className="rounded-xl border border-gray-300 p-3">
                  <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </div>
              <div className="flex-1">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  CVC
                </label>
                <div className="rounded-xl border border-gray-300 p-3">
                  <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing || isLoading}
              className="inline-flex max-h-12 w-full transform cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-700 ease-in-out hover:scale-105 hover:from-yellow-500 hover:to-yellow-600 disabled:cursor-not-allowed disabled:opacity-60 sm:px-8 sm:py-4 sm:text-sm md:px-10 md:py-5 md:text-base lg:px-8 lg:py-4 lg:text-lg"
            >
              {processing || isLoading ? "Processing..." : "Register & Pay $20"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
