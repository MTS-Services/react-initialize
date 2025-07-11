import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import Button from "../../../components/ui/Button";

import axios from "../../../utils/axiosInstance";
import { useLanguage } from "../../../hook/useLanguage";

const CheckoutForm = () => {
  const { t } = useLanguage();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      // 1. Create Payment Intent
      const {
        data: { clientSecret },
      } = await axios.post(`/stripe/create-payment`, {
        amount: 1000,
        currency: "usd",
      });

      // 2. Confirm Card Payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: formData.name,
              email: formData.email,
            },
          },
        });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // 3. Verify Payment Status
      if (paymentIntent.status === "succeeded") {
        // 4. Create User
        const response = await axios.post(`/users/create`, {
          email: formData.email,
          name: formData.name,
          amount: paymentIntent.amount,
          password: formData.password,
          paymentId: paymentIntent.id,
        });

        const user = response.data;

        if (!user) {
          throw new Error("Payment verification failed on server");
        }

        // ✅ Store in localStorage
        localStorage.setItem("userInfo", JSON.stringify(user));

        localStorage.setItem("authToken", user.data.token);

        setUserData(response.data.data.user);
        setSuccess(true);

        navigate("/auth/payment-success", {
          state: { userData: user },
        });
      }
    } catch (err) {
      setError(err.message);
      console.error("Payment processing error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="border bg-[#0C205A] p-8" />
      <div
        className="flex items-center justify-center lg:py-20"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        <div className="container flex max-w-7xl flex-col overflow-hidden rounded-xl border-1 border-gray-100 bg-white shadow-sm md:flex-row">
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
              {t("auth.register.title")}
            </h2>
            <form onSubmit={handleSubmit} className="">
              {/* Name Field */}
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-semibold text-gray-700"
                  htmlFor="name"
                >
                  {t("auth.register.name")}
                </label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  {t("auth.common.email")}
                </label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  {t("auth.common.pass")}
                </label>
                <input
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Card Details */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  {t("auth.register.card")}
                </label>
                <div className="rounded-md border border-gray-300 p-3">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                variant="yellowGradient"
                className={`w-full focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                  loading
                    ? "cursor-not-allowed bg-blue-400"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    Processing...
                  </span>
                ) : (
                  <>{t("auth.register.button")}</>
                )}
              </Button>

              <p className="mt-6 text-center text-gray-600">
                {t("auth.register.footer")}{" "}
                <Link
                  to="/auth/login"
                  className="font-semibold text-blue-500 hover:underline"
                >
                  {t("header.login")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
