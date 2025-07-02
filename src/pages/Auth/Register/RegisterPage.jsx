import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../../components/ui/Button";

const InputStyle =
  "w-full rounded-xl border px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none";

const RegisterPage = () => {
  const [processing, setProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // User info
    name: "",
    email: "",
    password: "",
    // Payment info
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    // Basic validation for user info
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all user information fields");
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    // Basic validation for payment info
    if (
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv ||
      !formData.nameOnCard
    ) {
      toast.error("Please fill all payment information fields");
      setProcessing(false);
      return;
    }

    // Log complete form data to console
    console.log("Complete registration data:", {
      user: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      payment: {
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        nameOnCard: formData.nameOnCard,
      },
    });

    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      toast.success("Registration complete!");
    }, 1000);
  };

  return (
    <section>
      <div className="border bg-[#0C205A] p-8"></div>
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
              {step === 1 ? "Register" : "Payment Information"}
            </h2>

            <form
              onSubmit={step === 1 ? nextStep : handleSubmit}
              noValidate
              className="space-y-6"
            >
              {step === 1 ? (
                <>
                  {/* User Information Step */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={InputStyle}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={InputStyle}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={InputStyle}
                      placeholder="••••••••"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Payment Information Step */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className={InputStyle}
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className={InputStyle}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className={InputStyle}
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleChange}
                      className={InputStyle}
                      placeholder="John Doe"
                    />
                  </div>
                </>
              )}

              <Button
                type="submit"
                size="lg"
                variant="yellowGradient"
                className="w-full"
                disabled={processing || isLoading}
              >
                {processing || isLoading
                  ? "Processing..."
                  : step === 1
                    ? "Continue"
                    : "Pay $20"}
              </Button>

              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-center text-sm font-semibold text-[#19398A] hover:underline"
                >
                  ← Back to
                </button>
              )}
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
