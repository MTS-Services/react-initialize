import { useContext, useEffect, useState } from "react";
import {
  FiDollarSign,
  FiGrid,
  FiHome,
  FiMapPin,
  FiSliders,
} from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactSlider from "react-slider";
import { AuthContext } from "../../context/AuthContext/AuthContext";

// ✅ Clean numeric price parser
const cleanPrice = (priceStr) => {
  if (!priceStr) return 0;
  const raw = priceStr.replace(/[^\d.,]/g, "").replace(",", ".");
  const normalized = raw.replace(/\.(?=.*\.)/, "").replace(",", ".");
  return parseFloat(normalized);
};

export default function FilterPage() {
  const { user } = useContext(AuthContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [rooms, setRooms] = useState("");
  const [surface, setSurface] = useState("");

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedListings = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetch("http://localhost:3000/api/properties/properties")
      .then((res) => res.json())
      .then((data) => {
        const processedListings = data.data.properties.map((l) => ({
          ...l,
          numericPrice: cleanPrice(l.price),
        }));

        setListings(processedListings);

        const city = params.get("address") || "";
        const min = parseInt(params.get("min")) || 0;
        const max = parseInt(params.get("max")) || 10000;

        setLocation(city);
        setMinPrice(min);
        setMaxPrice(max);

        const filteredData = processedListings.filter((l) => {
          const locMatch =
            !city || l.location.toLowerCase().includes(city.toLowerCase());
          const priceMatch = l.numericPrice >= min && l.numericPrice <= max;
          return locMatch && priceMatch;
        });

        setFiltered(filteredData);
      });
  }, [params]);

  useEffect(() => {
    applyFilters();
  }, [location, minPrice, maxPrice, rooms, surface]);

  const handleLocationInput = (value) => {
    setLocation(value);
    setShowSuggestions(true);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }
    const citySet = [...new Set(listings.map((l) => l.location))];
    const matches = citySet.filter((c) =>
      c.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleCitySelect = (location) => {
    setLocation(location);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const applyFilters = () => {
    const filteredData = listings.filter((l) => {
      const locMatch =
        !location || l.location.toLowerCase().includes(location.toLowerCase());
      const priceMatch =
        l.numericPrice >= minPrice && l.numericPrice <= maxPrice;
      const roomMatch = !rooms || l.rooms === parseInt(rooms);
      const surfaceMatch = !surface || l.surface >= parseInt(surface);
      return locMatch && priceMatch && roomMatch && surfaceMatch;
    });

    setFiltered(filteredData);
    setCurrentPage(1); // reset pagination
  };

  const handleListingClick = (id) => {
    navigate(`/listings/${id}`);
  };

  const uniqueRooms = [...new Set(listings.map((l) => l.rooms))].sort(
    (a, b) => a - b
  );

  return (
    <div className="w-full min-h-screen">
      <div
        className="h-[300px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1599423300746-b62533397364)",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold drop-shadow-md">
            Explore Rental Listings in Netherlands
          </h1>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto flex mt-6 px-4">
        {/* Sidebar Filters */}
        <div className="w-1/4 space-y-4 p-4">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <FiGrid /> Filters
          </h2>

          {/* Location Filter */}
          <div className="bg-white rounded-lg shadow-sm p-3 relative">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600">
              <FiMapPin /> Location
            </div>
            <input
              type="text"
              placeholder="Enter city"
              value={location}
              onChange={(e) => handleLocationInput(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className="w-full p-2 rounded bg-gray-50 border border-gray-200 text-sm"
            />
            {showSuggestions && location.trim() !== "" && (
              <ul className="absolute z-10 top-[100%] left-0 w-full mt-1 bg-white border rounded shadow max-h-40 overflow-y-auto text-sm">
                {suggestions.length > 0 ? (
                  suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => handleCitySelect(s)}
                    >
                      {s}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No listings found</li>
                )}
              </ul>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600">
              <FiDollarSign /> Price Range
            </div>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice - 100))
                }
                className="w-1/2 p-2 rounded bg-gray-50 border border-gray-200 text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice + 100))
                }
                className="w-1/2 p-2 rounded bg-gray-50 border border-gray-200 text-sm"
              />
            </div>
            <ReactSlider
              className="w-full h-2 bg-gray-200 rounded"
              thumbClassName="h-4 w-4 rounded-full bg-blue-600 cursor-pointer"
              trackClassName="bg-blue-500 h-2 rounded"
              min={0}
              max={10000}
              step={100}
              value={[minPrice, maxPrice]}
              onChange={([min, max]) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              withTracks={true}
              pearling
              minDistance={100}
            />
          </div>

          {/* Rooms Filter */}
          <div className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600">
              <FiHome /> Rooms
            </div>
            <div className="flex flex-wrap gap-2">
              {uniqueRooms.map((r) => (
                <label
                  key={r}
                  className={`cursor-pointer text-sm px-3 py-1 rounded-full border ${
                    rooms == r
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    value={r}
                    checked={rooms == r}
                    onChange={(e) => setRooms(e.target.value)}
                    className="hidden"
                  />
                  {r} Room{r > 1 && "s"}
                </label>
              ))}
            </div>
          </div>

          {/* Surface Filter */}
          <div className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600">
              <FiSliders /> Min Surface (m²)
            </div>
            <input
              type="number"
              placeholder="e.g. 50"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              className="w-full p-2 rounded bg-gray-50 border border-gray-200 text-sm"
            />
          </div>
        </div>

        {/* Listings + Pagination */}
        <div className="w-3/4 p-4 grid gap-6">
          {paginatedListings.map((listing) => (
            <div
              key={listing.id}
              onClick={() => handleListingClick(listing.id)}
              className="flex bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer"
            >
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div className="flex flex-col gap-1 flex-grow">
                  <h3 className="text-lg font-bold text-blue-700">
                    {listing.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{listing.location}</p>
                  <p className="text-sm mt-1 line-clamp-5 max-h-[6.5rem] overflow-hidden">
                    {listing.description}
                  </p>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  <span>{listing.surface} m² · </span>
                  <span>{listing.rooms} rooms</span>
                  <div className="text-blue-600 font-bold text-lg mt-1">
                    {user ? (
                      `€${listing.numericPrice}`
                    ) : (
                      <Skeleton height={24} />
                    )}
                  </div>
                </div>
              </div>
              <div className="w-1/3 h-[270px]">
                <img
                  src={listing?.media?.[0]?.url || ""}
                  alt={listing?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}

          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded border ${
                      pageNum === currentPage
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border-blue-600"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
