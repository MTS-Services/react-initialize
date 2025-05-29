import { useEffect, useState } from "react";
import { FiDollarSign, FiMapPin, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CityCard from "../../components/CityCard/CityCard";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("fakeData.json")
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);

  const handleSearch = () => {
    navigate(`/filter?city=${query}&min=${minPrice}&max=${maxPrice}`);
  };

  const topCities = Array.from(
    listings.reduce((acc, listing) => {
      acc.set(listing.city, (acc.get(listing.city) || 0) + 1);
      return acc;
    }, new Map())
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Hero Section with full-width BG and overlay */}
      <div
        className="relative h-[550px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1558036117-15d82a90b9b1)",
        }}
      >
        {/* Overlay with soft blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-white/5 to-black/70 z-10"></div>

        {/* Centered SearchBar */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="max-w-[1300px] mx-auto px-4">
            <div className=" p-6 rounded-lg shadow-xl ">
              <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
                <h1 className="text-5xl text-center font-bold text-white/90 leading-16">
                  Rent Your Property Easily In
                  <br /> <span className="text-[#F6BC09]">The Netherlands</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -top-14 z-20 h-full flex items-center justify-center">
        <div className="max-w-[1300px] mx-auto px-4">
          <div className="bg-white/95 p-6 rounded-lg shadow-xl backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
              <div className="relative w-full md:w-1/3">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search city..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-16 pl-10 pr-4 py-2 rounded-lg shadow-md bg-white focus:outline-none"
                />
              </div>
              <div className="relative w-full md:w-40">
                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full h-16 pl-10 pr-4 py-2 rounded-lg shadow-md bg-white focus:outline-none"
                />
              </div>
              <div className="relative w-full md:w-40">
                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full h-16 pl-10 pr-4 py-2 rounded-lg shadow-md bg-white focus:outline-none"
                />
              </div>
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                <FiSearch /> Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Cities Section */}
      <div className="max-w-[1200px] mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">Top Cities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topCities.map(([city, count], idx) => (
            <CityCard key={city} city={city} count={count} large={idx === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
