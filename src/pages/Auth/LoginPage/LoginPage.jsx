import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const { signInUser, isLoading, setIsLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setIsLoading(true);
      await signInUser(email, password);
      toast.success("User login successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-white via-blue-50 to-blue-100 px-6 py-12"
      style={{ fontFamily: "var(--font-secondary)" }}
    >
      <div className="container flex max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-lg md:flex-row">
        {/* Left: Image */}
        <div className="hidden p-12 md:block md:w-1/2">
          <img
            src="/login-image.png"
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right: Form */}
        <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-[#19398A]">
            Login to your account
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
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

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex max-h-12 w-full transform cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-700 ease-in-out hover:scale-105 hover:from-yellow-500 hover:to-yellow-600 disabled:cursor-not-allowed disabled:opacity-60 sm:px-8 sm:py-4 sm:text-sm md:px-10 md:py-5 md:text-base lg:px-8 lg:py-4 lg:text-lg"
            >
              <span className="text-base leading-loose font-semibold text-white">
                {isLoading ? "Logging in..." : "Start Searching"}
              </span>
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#19398A] hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
