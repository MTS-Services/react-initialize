import React from "react";
import {
  FaBell,
  FaChevronCircleDown,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-100 shadow-sm">
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
            {/* User Profile */}
            <div className="p-4">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                <Link to="profile">
                  <FaUserCircle className="h-6 w-6 text-indigo-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
