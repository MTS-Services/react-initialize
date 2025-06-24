import React from "react";

const PaymentSuccsess = ({ userData }) => {
  const { email, paymentId, ispaid } = userData;

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-green-300 bg-green-100 p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold text-green-800">
          Registration Successful!
        </h2>
        <div className="space-y-2 text-sm text-green-900 md:text-base">
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold">Payment ID:</span> {paymentId}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {ispaid ? (
              <span className="font-medium text-green-700">Paid</span>
            ) : (
              <span className="font-medium text-red-600">Not Paid</span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccsess;
