import React, { useContext } from "react";
import { FaHotel, FaRegHeart } from "react-icons/fa";
import { FiClock, FiLayers, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Button from "../ui/Button";

// "https://via.placeholder.com/384x256?text=No+Image";

const PeropertiesCard = ({ item }) => {
  const { id, title, description, primaryImage, surface, rooms, location } =
    item;

  const { user } = useContext(AuthContext);
  return (
    <div
      key={id}
      className="mb-6 w-full rounded-xl bg-white p-4 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12)] transition hover:shadow-md sm:h-72"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-lg sm:h-64 sm:w-96">
          <img
            src={primaryImage}
            alt={title}
            className="h-full w-full cursor-pointer object-cover"
          />

          <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border-t border-zinc-900/5 bg-white p-2 shadow">
            <div className="h-4 w-4 text-blue-800">
              <FaRegHeart />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-2">
            {/* Title and time */}
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
              <h3 className="text-lg font-semibold text-black capitalize sm:text-xl">
                {title.slice(9, 40)}...
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FiClock />
                4:50PM
              </div>
            </div>

            {/* Description */}
            <p className="line-clamp-2 text-sm text-gray-600 sm:line-clamp-3">
              {description || "No description available"}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1.5">
                <FiLayers className="text-gray-400" />
                <span className="text-xs text-gray-700">
                  {surface}m<sup>2</sup>
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1.5">
                <FaHotel className="text-gray-400" />
                <span className="text-xs text-gray-700">
                  {rooms} {rooms > 1 ? "rooms" : "room"}
                </span>
              </div>
            </div>

            {/* Location and price */}
            <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pt-0">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1.5">
                <FiMapPin className="text-gray-400" />
                <span className="text-xs text-gray-700">{location}</span>
              </div>
              {user ? (
                <h3 className="text-lg font-semibold text-gray-600 capitalize sm:text-xl">
                  € 10.05
                </h3>
              ) : (
                <p>loading...</p>
              )}
            </div>
          </div>

          {/* Button */}
          <Link
            to={`/properties/${id}`}
            className="text-base font-medium text-white"
          >
            <Button
              size="lg"
              variant="yellowGradient"
              className="max-h-12 w-full"
            >
              <span>Bekijk de woning</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PeropertiesCard;
