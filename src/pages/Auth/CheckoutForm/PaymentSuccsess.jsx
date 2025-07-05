import React from "react";
import { useLocation, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const user = userData.data;
  console.log(location);
  return (
    <section>
      <div className="border bg-[#0C205A] p-8" />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
        {/* Main card */}
        <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white/90 shadow-md">
          {/* Decorative wave */}
          <div className="h-4 bg-gradient-to-r from-blue-400 to-blue-600">
            <div className="" />
          </div>

          {/* Checkmark circle */}
          <div className="mt-8 mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow">
              <svg className="h-16 w-16 text-white" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-800">
              Payment Complete!
            </h2>
            <p className="mb-6 text-blue-600">
              Your transaction was successful
            </p>

            <div className="mb-6 rounded-xl bg-blue-50 p-6 text-left">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-bold text-gray-800">
                  ${user?.amount / 100 || "129.99"}
                </span>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium text-gray-700">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-mono text-sm text-blue-600">
                  {user?.paymentId || "PAY-XXXXXXX"}
                </span>
              </div>
            </div>

            {/* Navigation Button */}
            <Link
              to="/properties"
              className="block w-full rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 py-3 text-center font-medium text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              Find Property
            </Link>

            <p className="mt-4 text-xs text-gray-400">
              A receipt has been sent to your email
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
