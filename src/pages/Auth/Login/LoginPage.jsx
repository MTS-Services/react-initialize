import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/auth/authSlice"; // Import loginUser action
import Button from "../../../components/ui/Button";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get loading and error states from Redux store
  const { loading } = useSelector((state) => state.auth);

  // Local state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Clear any previous errors

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }
    try {
      // Dispatch loginUser action
      await dispatch(loginUser({ email, password })).unwrap();

      toast.success("User login successfully!");
      navigate("/properties");
    } catch (error) {
      toast.error(error.message || "Login failed!");
    }
  };

  return (
    <section>
      <div className="border bg-[#0C205A] p-8"></div>
      <div
        className="flex items-center justify-center py-4 md:px-0 md:py-0 lg:py-20"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-xl border-1 border-gray-100 bg-white shadow md:flex-row md:rounded">
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

            <form onSubmit={onSubmit} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on change
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state on change
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-sm text-red-500">{error}</p>}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                variant="yellowGradient"
                className="w-full"
              >
                {loading ? "Submitting..." : "Login"}
              </Button>
            </form>

            {/* Register Link */}
            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
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
