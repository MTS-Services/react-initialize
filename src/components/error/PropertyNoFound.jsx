import React from "react";

const PropertyNoFound = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="rounded-full bg-gray-100 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-medium text-gray-700">No Properties Found</h3>
      <p className="max-w-md text-center text-gray-500">
        We couldn't find any properties matching your criteria. Try adjusting
        your filters or search in a different location.
      </p>
    </div>
  );
};

export default PropertyNoFound;
