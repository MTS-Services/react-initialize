import React from "react";
import { LiaBedSolid } from "react-icons/lia";
import { LuHeart } from "react-icons/lu";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

const RecentProperty = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/properties/${item.id}`)}
      className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
    >
      <img
        src={
          item.media?.[0]?.url ||
          "https://via.placeholder.com/400x300?text=No+Image"
        }
        alt={item.title}
        className="h-48 w-full object-cover"
      />
      {/* Details */}
      <div className="bg-white p-4">
        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-500">
            {item.title.slice(0, 20)}...
          </h3>
          <p className="text-sm text-neutral-400">{item.location}</p>
        </div>

        {/* Features */}
        <div className="mb-4 flex justify-between">
          <div className="text-center">
            <div className="flex justify-center">
              {/* Bed Icon */}
              <LiaBedSolid className="text-gray-400" />
            </div>
            <span className="text-sm text-neutral-400">
              {item.beds || "Beds"}
            </span>
          </div>

          <div className="text-center">
            <div className="flex justify-center">
              {/* Area Icon */}
              <TfiRulerAlt2 className="text-gray-400" />
            </div>
            <span className="font-dm-sans text-sm text-neutral-400">
              {item.size || "Area"}
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="border-opacity-40 flex items-center justify-between border-t border-neutral-200 pt-4">
          <div className="text-right">
            <h3 className="font-dm-sans text-base font-bold text-gray-600">
              {item.price.slice(0, 8)}
            </h3>
          </div>

          <button
            type="button"
            aria-label="Add to favorites"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200"
          >
            <LuHeart className="text-gray-400" />
          </button>
        </div>

        {/* CTA */}
        <a
          href="#"
          className="mt-4 block text-sm font-medium text-blue-700 hover:underline"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default RecentProperty;
