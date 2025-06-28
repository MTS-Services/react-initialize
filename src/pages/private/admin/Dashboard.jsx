import React, { useState } from "react";

import { FiMenu } from "react-icons/fi";
import {
  FaBell,
  FaCalendar,
  FaCamera,
  FaChartArea,
  FaChevronCircleDown,
  FaCog,
  FaFolder,
  FaHome,
  FaSearch,
  FaUber,
  FaUser,
} from "react-icons/fa";

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

const SidebarItem = ({ icon: Icon, label, active }) => (
  <li>
    <a
      href="#"
      className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium ${active ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"}`}
    >
      <Icon
        className={`mr-3 h-5 w-5 ${active ? "text-indigo-500" : "text-gray-400"}`}
      />
      {label}
    </a>
  </li>
);

// Main Dashboard Component
const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("Dashboard");

  const navItems = [
    { icon: FaHome, label: "Dashboard" },
    { icon: FaUser, label: "Team" },
    { icon: FaFolder, label: "Projects" },
    { icon: FaCalendar, label: "Calendar" },
    { icon: FaCamera, label: "Reports" },
    { icon: FaCog, label: "Settings" },
  ];

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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="bg-white shadow-sm lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-500 hover:text-gray-600"
          >
            {mobileMenuOpen ? <FiMenu /> : <FiMenu />}
          </button>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-64 flex-col border-r border-gray-200 bg-white">
            <div className="flex h-16 items-center border-b border-gray-200 px-6">
              <h1 className="text-xl font-bold text-gray-800">Acme Inc</h1>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="px-4 py-6">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <SidebarItem
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      active={activeNavItem === item.label}
                      onClick={() => setActiveNavItem(item.label)}
                    />
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="bg-opacity-75 fixed inset-0 bg-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
            <div className="relative flex w-72 max-w-xs flex-col bg-white">
              <div className="flex h-16 items-center border-b border-gray-200 px-6">
                <h1 className="text-xl font-bold text-gray-800">Acme Inc</h1>
              </div>
              <div className="flex-1 overflow-y-auto">
                <nav className="px-4 py-6">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <SidebarItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        active={activeNavItem === item.label}
                        onClick={() => {
                          setActiveNavItem(item.label);
                          setMobileMenuOpen(false);
                        }}
                      />
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {/* Top navigation */}
          <div className="bg-white shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="hidden lg:block">
                    <div className="relative max-w-xs">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <FaSearch className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    <FaBell className="h-6 w-6" />
                  </button>
                  <div className="relative ml-3">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 font-medium text-white">
                        JD
                      </div>
                      <FaChevronCircleDown className="ml-2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Overview
              </h2>

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
                    <h3 className="text-lg font-medium text-gray-900">
                      Revenue
                    </h3>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
