import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function FilterPage() {
  const [params] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("fakeData.json")
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);

  useEffect(() => {
    const city = params.get("city")?.toLowerCase();
    const min = parseInt(params.get("min")) || 0;
    const max = parseInt(params.get("max")) || Infinity;

    setFiltered(
      listings.filter(
        (l) =>
          (!city || l.city.toLowerCase().includes(city)) &&
          l.price >= min &&
          l.price <= max
      )
    );
  }, [listings, params]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Filters */}
      <div className="w-1/4 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        {/* More filters can be added here */}
      </div>

      {/* Listing Results */}
      <div className="w-3/4 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((listing) => (
          <div
            key={listing.id}
            className="border rounded overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{listing.title}</h3>
              <p className="text-sm text-gray-600">
                {listing.location} - {listing.foundTimeAgo}
              </p>
              <p className="text-blue-600 font-semibold">${listing.price}</p>
              <p className="text-sm mt-1">{listing.description}</p>
              <p className="text-sm text-gray-500">
                {listing.surface} m² · {listing.rooms} rooms
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
