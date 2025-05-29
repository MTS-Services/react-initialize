import { useEffect, useState } from "react";
import {
  FiDollarSign,
  FiGrid,
  FiHome,
  FiMapPin,
  FiSliders,
} from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactSlider from "react-slider";

export default function FilterPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [rooms, setRooms] = useState("");
  const [surface, setSurface] = useState("");

  useEffect(() => {
    fetch("fakeData.json")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [location, minPrice, maxPrice, rooms, surface]);

  const handleLocationInput = (value) => {
    setLocation(value);
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }
    const citySet = [...new Set(listings.map((l) => l.city))];
    const matches = citySet.filter((c) =>
      c.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleCitySelect = (city) => {
    setLocation(city);
    setSuggestions([]);
  };

  const applyFilters = () => {
    setFiltered(
      listings.filter((l) => {
        const locMatch =
          !location || l.city.toLowerCase().includes(location.toLowerCase());
        const priceMatch = l.price >= minPrice && l.price <= maxPrice;
        const roomMatch = !rooms || l.rooms === parseInt(rooms);
        const surfaceMatch = !surface || l.surface >= parseInt(surface);
        return locMatch && priceMatch && roomMatch && surfaceMatch;
      })
    );
  };

  const handleListingClick = (id) => {
    navigate(`/listings/${id}`);
  };

  const uniqueRooms = [...new Set(listings.map((l) => l.rooms))].sort(
    (a, b) => a - b
  );

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
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

      {/* Main Container */}
      <div className="max-w-[1300px] mx-auto flex mt-6 px-4">
        {/* Sidebar */}
        <div className="w-1/4 space-y-4 p-4">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <FiGrid /> Filters
          </h2>

          {/* Location Filter */}
          <div className="bg-white rounded-lg shadow-sm p-3 relative">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600">
              <FiMapPin />
              Location
            </div>
            <input
              type="text"
              placeholder="Enter city"
              value={location}
              onChange={(e) => handleLocationInput(e.target.value)}
              className="w-full p-2 rounded bg-gray-50 border border-gray-200 text-sm focus:outline-none"
            />
            {location.trim() !== "" && (
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

          {/* Price Range */}
          <div className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600">
              <FiDollarSign />
              Price Range
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
            <div className="mt-2 mb-4">
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
          </div>

          {/* Room Filter */}
          <div className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600">
              <FiHome />
              Rooms
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
              <FiSliders />
              Min Surface (m²)
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

        {/* Listings Section */}
        <div className="w-3/4 p-4 grid gap-6">
          {filtered.map((listing) => (
            <div
              key={listing.id}
              onClick={() => handleListingClick(listing.id)}
              className="flex bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer"
            >
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-blue-700">
                    {listing.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{listing.location}</p>
                  <p className="text-sm mt-1">{listing.description}</p>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <span>{listing.surface} m² · </span>
                  <span>{listing.rooms} rooms</span>
                  <div className="text-blue-600 font-bold text-lg mt-1">
                    ${listing.price}
                  </div>
                </div>
              </div>
              <div className="w-1/3 h-auto">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
