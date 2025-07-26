import React from "react";
import { getCurrentUser } from "../../../features/auth/authUtils";

const userData = {
  name: "Alex Johnson",
  role: "Premium Member",
  avatar: "/profile.jpg",
  membership: {
    tier: "Gold",
    since: "January 2023",
    status: "Active",
    renewalDate: "January 15, 2024",
    properties: 3,
    paymentMethod: "Visa •••• 4242",
  },
  contact: {
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    emergencyContact: "+1 (555) 987-6543",
  },
  subscriptionPlans: [
    {
      id: 1,
      name: "Basic",
      price: "$9.99/month",
      features: ["3 property listings", "Basic analytics", "Email support"],
      current: false,
    },
    {
      id: 2,
      name: "Gold",
      price: "$29.99/month",
      features: [
        "10 property listings",
        "Advanced analytics",
        "Priority support",
        "Document storage",
      ],
      current: true,
    },
    {
      id: 3,
      name: "Platinum",
      price: "$49.99/month",
      features: [
        "Unlimited listings",
        "Premium analytics",
        "24/7 support",
        "Legal assistance",
      ],
      current: false,
    },
  ],
  paymentHistory: [
    {
      id: 1,
      date: "Dec 15, 2023",
      amount: "$29.99",
      method: "Visa •••• 4242",
      status: "Completed",
    },
  ],
};

const UserProfile = () => {
  const user = getCurrentUser();
  const paid = user?.data?.ispaid;
  const userName = user?.data?.name?.en;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with tier-based color */}
      <div className="bg-[#0C205A] pt-18" />

      {/* Profile header */}

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Membership Card */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Membership Details
                </h3>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Payment Status
                    </p>

                    {paid ? (
                      <p className="font-semibold text-green-600">
                        {userData.membership.status}
                      </p>
                    ) : (
                      <p className="font-semibold text-red-600">Unpaid</p>
                    )}
                  </div>

                  {paid ? (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Payment Method
                      </p>
                      <p className="text-sm text-gray-900">
                        {userData.membership.paymentMethod}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            {/* Payment History */}
            {paid ? (
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Payment History
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Method
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Receipt</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {userData.paymentHistory.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                            {payment.date}
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                            $10
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                            {payment.method}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                            <a
                              href="#"
                              className="text-amber-600 hover:text-amber-900"
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Profile Information
                </h3>
              </div>

              <div className="px-6 py-4">
                <div className="flex items-center">
                  <img
                    className="h-14 w-14 rounded-full border-2 border-white object-contain shadow-sm"
                    src="/image/random/profile.jpg"
                    alt="Profile"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {userName}
                    </h2>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{user?.data?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">
                      {userData.contact.phone}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
