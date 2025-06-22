import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { AuthContext } from "../../../context/AuthContext/AuthContext";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Button from "../../../components/ui/Button";

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
    <section>
      <div className="border bg-[#0C205A] p-8"></div>
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        <div className="container flex max-w-6xl flex-col overflow-hidden rounded-3xl border-1 border-gray-100 bg-white shadow-lg md:flex-row">
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
                <input
                  className="w-full rounded-xl border border-gray-300 p-3"
                  type="number"
                />
                <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
              </div>

              {/* Expiry and CVC */}
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    className="w-full rounded-xl border border-gray-300 p-3"
                    type="number"
                  />
                  <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                </div>
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    CVC
                  </label>
                  <input
                    className="w-full rounded-xl border border-gray-300 p-3"
                    type="number"
                  />
                  <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                variant="yellowGradient"
                className="w-full"
                disabled={processing || isLoading}
              >
                {processing || isLoading
                  ? "Processing..."
                  : "Register & Pay $20"}
              </Button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              You have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#19398A] hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
