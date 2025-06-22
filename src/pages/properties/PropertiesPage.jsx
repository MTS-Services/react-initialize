import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FiGrid, FiMapPin } from "react-icons/fi";
import PropertiesCard from "../../components/common/PropertiesCard";
import Pagination from "../../components/common/Pagination";
import CardSkeleton from "../../components/common/Card-Skeleton";
import { FaListUl } from "react-icons/fa";
import Button from "../../components/ui/Button";

const URL = "http://localhost:3000/api";

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });

  const [locationInput, setLocationInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  // Fetch property data
  const fetchData = async (page = 1) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const params = new URLSearchParams({
        limit: pagination.itemsPerPage,
        page: page,
        ...filters,
      });

      const res = await axios.get(`${URL}/properties?${params.toString()}`);

      setProperties(res.data.properties);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch location suggestions with debounce
  const fetchSuggestions = async (query) => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsFetchingSuggestions(true);
    try {
      const res = await axios.get(
        `${URL}/properties?location=${query}&limit=5`,
      );
      const uniqueLocations = [
        ...new Set(res.data.properties.map((p) => p.location)),
      ].filter(Boolean); // Remove empty/null locations
      setSuggestions(uniqueLocations);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  useEffect(() => {
    fetchData();
  }, [filters]);

  // Handle click outside suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle page input change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchData(newPage);
    }
  };

  // handle filter input change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // handle filter submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchData(1);
  };

  // handle location input change
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    debouncedFetchSuggestions(value);
  };

  // handle suggetion select input change
  const handleSuggestionSelect = (suggestion) => {
    setFilters((prev) => ({
      ...prev,
      location: suggestion,
    }));
    setLocationInput(suggestion);
    setShowSuggestions(false);
    fetchData(1); // Immediately fetch results with selected location
  };

  // Loading animation
  const renderSkeletonListings = () => {
    return Array(pagination.itemsPerPage)
      .fill(0)
      .map((_, index) => <CardSkeleton key={index} />);
  };

  return (
    <section>
      <header
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1599423300746-b62533397364)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div>
            <h1 className="text-center text-4xl font-bold text-white drop-shadow-md">
              Explore Rental Property in Netherlands
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-6 max-w-7xl gap-12 md:flex lg:mb-10">
        {/* SIDEBAR */}
        <aside className="sticky top-20 h-fit space-y-4 md:w-1/4">
          <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
            <FiGrid /> Filters
          </h2>
          <hr className="text-gray-200" />
          <form onSubmit={handleFilterSubmit} className="space-y-4">
            <div className="relative" ref={suggestionsRef}>
              <label className="block text-sm font-medium text-gray-700">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600">
                  <FiMapPin /> Location
                </div>
              </label>
              <input
                type="text"
                name="location"
                value={locationInput}
                onChange={handleLocationChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="e.g. Amsterdam, Rotterdam"
                className="mt-1 w-full rounded-md border border-gray-200 p-2"
                autoComplete="off"
              />
              {isFetchingSuggestions && (
                <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-md border border-gray-200 bg-white p-2 text-center text-sm text-gray-500">
                  Loading suggestions...
                </div>
              )}

              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="flex cursor-pointer items-center gap-2 rounded-2xl p-1.5 text-sm hover:bg-gray-100"
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      <FiMapPin /> {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  $ Min Price
                </label>
                <input
                  type="number"
                  name="minPrice"
                  placeholder="$"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="mt-1 w-full rounded-md border border-gray-200 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  $ Max Price
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="$"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="mt-1 w-full rounded-md border border-gray-200 p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bedrooms
              </label>
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="mt-1 w-full rounded-md border border-gray-200 p-2"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <Button
              variant="yellowGradient"
              size="lg"
              type="submit"
              className="w-full"
            >
              Apply Filters
            </Button>
          </form>
        </aside>

        {/* MAIN CONTENT (remain the same as your original code) */}
        <article className="flex-1">
          {/* Controls: Sort + View Toggle */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-md">
            {/* Sort options */}
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <label htmlFor="sort" className="whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort"
                className="cursor-pointer rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">Default</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>

            {/* View toggle buttons */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <label htmlFor="sort" className="whitespace-nowrap">
                  Per-page:
                </label>
                <select
                  id="sort"
                  className="cursor-pointer rounded-md border border-gray-200 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>

              <div>
                <button className="rounded-md p-2 text-gray-600 hover:bg-gray-200">
                  <FaListUl />
                </button>
                <button className="rounded-md p-2 text-gray-400 hover:bg-gray-200">
                  <FiGrid />
                </button>
              </div>
            </div>
          </div>

          <hr className="text-gray-200" />

          <div className="py-4">
            <p>Rental Show ({pagination.totalItems}) </p>
          </div>

          {isLoading ? (
            renderSkeletonListings()
          ) : isError ? (
            <div className="py-10 text-center text-lg text-red-600">
              Error loading properties. Please try again.
            </div>
          ) : properties.length === 0 ? (
            <div className="py-10 text-center text-lg text-gray-600">
              Properties not found!
            </div>
          ) : (
            <div className="">
              {properties.map((item) => (
                <PropertiesCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {pagination.totalPages > 1 && (
            <footer className="flex justify-center py-12">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </footer>
          )}
        </article>
      </main>
    </section>
  );
};

export default PropertyListPage;
