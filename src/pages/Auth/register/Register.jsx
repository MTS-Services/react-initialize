import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";

import axios from "../../../utils/axiosInstance";
import { useLanguage } from "../../../hook/useLanguage";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { t } = useLanguage();

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

    try {
      // 1. Create Payment Intent
      // 2. Confirm Card Payment
      const users = {
        email: formData.email,
        name: formData.name,
        password: formData.password,
      };

      // 4. Create User
      const response = await axios.post(`/users/create`, users);

      const user = response.data;

      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("authToken", user.data.token);

      toast.success("login succses");

      setUserData(response.data.data.user);
      setSuccess(true);
      navigate("/properties");
    } catch (err) {
      setError(err.message);
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
              src="/image/random/register-image.png"
              alt="Register Visual"
              className="h-auto max-w-full object-contain"
            />
          </div>

          {/* Right Form Section */}
          <div className="flex w-full flex-col justify-center p-10 md:w-1/2">
            <h2 className="mb-6 text-2xl font-extrabold text-[#19398A] md:mb-10 md:text-center">
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

export default RegisterPage;
