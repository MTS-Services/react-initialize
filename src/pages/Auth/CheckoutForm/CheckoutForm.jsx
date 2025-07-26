import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import Button from "../../../components/ui/Button";

import axios from "../../../utils/axiosInstance";
import { useLanguage } from "../../../hook/useLanguage";
import { isPaid } from "../../../features/auth/authUtils";

const CheckoutForm = () => {
  const { t } = useLanguage();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const isPaidUsers = isPaid();

  let User = null;

  if (isPaidUsers) {
    const userInfo = localStorage.getItem("userInfo");
    const parsedUser = JSON.parse(userInfo);
    User = parsedUser.data;
  }
  console.log(User);
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
              email: User.email,
            },
          },
        });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
      console.log(paymentIntent);
      // 4. Create User
      if (paymentIntent) {
        const response = await axios.patch(`/users/${User.id}`, {
          amount: paymentIntent.amount,
          paymentId: paymentIntent.id,
        });

        const user = response.data;

        console.log(user.data);

        localStorage.setItem(
          "userInfo",
          JSON.stringify({ data: { ...User, ispaid: true } }),
        );

        // localStorage.setItem("userInfo", JSON.stringify(user.data));

        if (!user) {
          throw new Error("Payment verification failed on server");
        }

        if (user) {
          // Update localStorage with the fresh user info
          // localStorage.setItem("userInfo", JSON.stringify(user.data));

          setSuccess(true);
          navigate("/auth/payment-success", {
            state: { userData: user },
          });
        }
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
      <div className="border bg-[#082e63] pt-18" />
      <div
        className="flex items-center justify-center lg:py-26"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        <div className="container flex max-w-7xl flex-col overflow-hidden rounded-xl border-1 border-gray-100 bg-white shadow-sm md:flex-row">
          {/* Left Image Section */}
          <div className="hidden items-center justify-center p-8 md:flex md:w-1/2">
            <img
              src="/image/random/pay.png"
              alt="Register Visual"
              className="h-auto max-w-full object-contain"
            />
          </div>

          {/* Right Form Section */}
          <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
            <h2 className="mb-6 text-2xl font-extrabold text-[#19398A] md:mb-10 md:text-center">
              {t("auth.payment")}
            </h2>
            <form onSubmit={handleSubmit} className="">
              {/* Name Field */}

              {/* Email Field */}

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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
