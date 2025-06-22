import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";

function LoginPage() {
  const { signInUser, isLoading, setIsLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  const { handleSubmit } = useForm();

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
    <section>
      <div className="border bg-[#0C205A] p-8"></div>
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        <div className="container flex max-w-6xl flex-col overflow-hidden rounded-3xl border-1 border-gray-100 bg-white shadow-lg md:flex-row">
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                />
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
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-800 placeholder-gray-400 transition focus:ring-2 focus:ring-[#19398A] focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                variant="yellowGradient"
                className="w-full"
              >
                {isLoading ? "submiting..." : "Login"}
              </Button>
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
      </div>
    </section>
  );
}

export default LoginPage;
