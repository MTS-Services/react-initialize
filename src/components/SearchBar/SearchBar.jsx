import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/filter?city=${query}&min=${minPrice}&max=${maxPrice}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center">
      <input
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3"
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="p-2 border rounded w-full md:w-1/4"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="p-2 border rounded w-full md:w-1/4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
}
