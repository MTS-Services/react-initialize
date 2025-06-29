import React, { useState } from "react";

import { FaBell, FaChartArea, FaFolder, FaUber, FaUser } from "react-icons/fa";

// Reusable components
const Card = ({ title, value, icon: Icon, trend, trendColor }) => (
  <div className="rounded-lg bg-white p-6 shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
      </div>
      <div className={`rounded-full p-3 ${trendColor} bg-opacity-10`}>
        <Icon className={`h-6 w-6 ${trendColor}`} />
      </div>
    </div>
    {trend && (
      <p className={`mt-2 text-sm ${trendColor}`}>
        <span className="font-medium">{trend.value}</span> {trend.label}
      </p>
    )}
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      trend: { value: "+12%", label: "from last month" },
      icon: FaChartArea,
      trendColor: "text-green-500",
    },
    {
      title: "New Users",
      value: "2,345",
      trend: { value: "+18%", label: "from last month" },
      icon: FaUber,
      trendColor: "text-blue-500",
    },
    {
      title: "Active Projects",
      value: "12",
      trend: { value: "+2", label: "since last week" },
      icon: FaFolder,
      trendColor: "text-purple-500",
    },
    {
      title: "Pending Tasks",
      value: "15",
      trend: { value: "-3", label: "since last week" },
      icon: FaBell,
      trendColor: "text-red-500",
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Overview</h2>

        {/* Stats cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              trendColor={stat.trendColor}
            />
          ))}
        </div>

        {/* Charts section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Revenue</h3>
              <div className="flex space-x-2">
                <button className="rounded-md bg-indigo-50 px-3 py-1 text-sm text-indigo-600">
                  Monthly
                </button>
                <button className="rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100">
                  Yearly
                </button>
              </div>
            </div>
            <div className="flex h-64 items-center justify-center rounded-md bg-gray-50 text-gray-400">
              Chart placeholder
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                    <FaUser className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      New user registered
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent projects table */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Projects
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {[1, 2, 3, 4].map((item) => (
                  <tr key={item}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Project {item}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((avatar) => (
                          <div
                            key={avatar}
                            className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"
                          ></div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-indigo-600"
                          style={{ width: `${item * 25}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      May {15 + item}, 2023
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
