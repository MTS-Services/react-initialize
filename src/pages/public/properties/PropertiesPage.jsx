import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiGrid, FiMapPin } from "react-icons/fi";
import CardSkeleton from "../../../components/common/Card-Skeleton";
import Pagination from "../../../components/common/Pagination";
import PropertiesCard from "../../../components/common/PropertiesCard";

import RangeSlider from "../../../components/common/RangeSlider";
import PropertyNoFound from "../../../components/error/NotFounds";
import { useLanguage } from "../../../hook/useLanguage";
import BASE_URL from "../../../config/api";

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });

  const { t } = useLanguage();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "", // Added minBedrooms
    maxBedrooms: "", // Added maxBedrooms
    minSurfaceArea: "", // Added minSurfaceArea
    maxSurfaceArea: "", // Added maxSurfaceArea
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
        location: filters.location,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        minBedrooms: filters.minBedrooms, // Pass minBedrooms
        maxBedrooms: filters.maxBedrooms, // Pass maxBedrooms
        minSurfaceArea: filters.minSurfaceArea, // Pass minSurfaceArea
        maxSurfaceArea: filters.maxSurfaceArea, // Pass maxSurfaceArea
      });

      // Remove empty parameters
      for (let [key, value] of params.entries()) {
        if (!value) {
          params.delete(key);
        }
      }

      const res = await axios.get(
        `${BASE_URL}/properties?${params.toString()}`,
      );
      // console.log("PR-", `${BASE_URL}/properties?${params.toString()}`);

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
        `${BASE_URL}/properties?location=${query}&limit=5`,
        {},
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

    if (value.trim() === "") {
      // Clear the location filter too
      setFilters((prev) => ({
        ...prev,
        location: "",
      }));
      fetchData(1); // Re-fetch without location
    }
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

  // range value check
  const handlePriceChange = ({ min, max }) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  };

  // Handle bedrooms filter change
  const handleBedroomsChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      minBedrooms: value,
      maxBedrooms: value === "5+" ? "" : value, // Set max for specific values, or empty for 5+
    }));
  };

  // Handle surface area filter change
  const handleSurfaceAreaChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="">
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

      <main className="mx-auto mt-10 max-w-7xl gap-12 px-5 md:px-8 lg:mb-10 lg:flex lg:px-0">
        {/* SIDEBAR */}
        <aside className="top-20 h-fit space-y-4 md:w-full lg:sticky lg:w-1/4">
          <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
            <FiGrid /> Filters
          </h2>

          <form
            onSubmit={handleFilterSubmit}
            className="grid grid-cols-1 space-y-4 md:grid-cols-2 md:gap-5 md:space-y-0 lg:grid-cols-1"
          >
            <div
              className="relative rounded-md p-6 shadow-sm"
              ref={suggestionsRef}
            >
              {locationInput && (
                <button
                  className="absolute top-[72px] right-8 rounded-full bg-gray-200 px-1 py-0.5 text-xs font-bold text-gray-600 hover:text-red-500"
                  onClick={() => {
                    setLocationInput("");
                    setFilters((prev) => ({ ...prev, location: "" }));
                    fetchData(1);
                  }}
                >
                  ✕
                </button>
              )}

              <label className="text-md mb-2 flex items-center gap-1.5 font-medium text-gray-500">
                <FiMapPin size={15} />
                {t("filters.search")}
              </label>
              <input
                type="text"
                name="location"
                value={locationInput}
                onChange={handleLocationChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder={t("filters.search")}
                className="mt-1 w-full rounded-md border border-gray-200 p-2"
                autoComplete="off"
              />

              {showSuggestions && (
                <ul className="absolute top-full left-0 z-10 max-h-60 w-full overflow-y-auto rounded-xl bg-white shadow-lg">
                  {isFetchingSuggestions ? (
                    <li className="p-2 text-center text-sm text-gray-500">
                      Loading...
                    </li>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="mx-2 my-2 flex cursor-pointer items-center gap-2 rounded-xl px-2 text-sm hover:bg-gray-100"
                        onClick={() => handleSuggestionSelect(suggestion)}
                      >
                        <FiMapPin /> {suggestion}
                      </li>
                    ))
                  ) : locationInput.trim().length >= 2 ? (
                    <li className="border border-gray-100 py-4 text-center text-sm text-gray-400">
                      No matching locations!
                    </li>
                  ) : null}
                </ul>
              )}
            </div>

            <div className="rounded-md p-6 shadow-sm">
              <h4 className="text-md text-gray-500">
                € {t("filters.range.title")}
              </h4>
              <hr className="my-2.5 text-gray-200" />
              <div className="mb-8 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    {t("filters.range.min")}
                  </label>
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="mt-1 w-full rounded-md border border-gray-200 p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    {t("filters.range.max")}
                  </label>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="10000"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="mt-1 w-full rounded-md border border-gray-200 p-2"
                  />
                </div>
              </div>

              {/* RANGE SLIDER */}
              <div className="">
                <RangeSlider
                  min={0}
                  max={1000}
                  step={10}
                  initialMin={filters.minPrice || 0}
                  initialMax={filters.maxPrice || 1000}
                  onChange={handlePriceChange}
                />
              </div>
            </div>

            <div className="rounded-md p-5 shadow">
              <label className="text-md block text-gray-500">
                ◪ {t("filters.rooms")}
              </label>
              <ul className="grid grid-cols-3 gap-2 pt-4">
                {["1", "2", "3", "4", "5+"].map((num, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer rounded-full border border-gray-200 p-2 text-center text-sm text-gray-500 hover:bg-gray-200 ${
                      (filters.minBedrooms === num && num !== "5+") ||
                      (num === "5+" && filters.minBedrooms === "5") // Highlight '5+' if minBedrooms is 5
                        ? "bg-gray-200 font-bold"
                        : ""
                    }`}
                    onClick={() => handleBedroomsChange(num)}
                  >
                    {num} {num === "5+" ? "" : "rooms"}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md p-5 shadow">
              <h4 className="text-md text-gray-500">
                {t("filters.suface.title")}
              </h4>
              <hr className="my-2.5 text-gray-200" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    {t("filters.suface.min")}
                  </label>
                  <input
                    type="number"
                    name="minSurfaceArea"
                    placeholder="e.g. 50"
                    value={filters.minSurfaceArea}
                    onChange={handleSurfaceAreaChange}
                    className="mt-1 w-full rounded-md border border-gray-200 p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    {t("filters.suface.max")}
                  </label>
                  <input
                    type="number"
                    name="maxSurfaceArea"
                    placeholder="e.g. 200"
                    value={filters.maxSurfaceArea}
                    onChange={handleSurfaceAreaChange}
                    className="mt-1 w-full rounded-md border border-gray-200 p-2"
                  />
                </div>
              </div>
            </div>
          </form>
        </aside>

        {/* MAIN CONTENT */}
        <article className="flex-1 pt-5 md:pt-8 lg:pt-0">
          {isLoading ? (
            renderSkeletonListings()
          ) : isError ? (
            <div className="py-10 text-center text-lg text-red-600">
              Error loading properties. Please try again.
            </div>
          ) : properties.length === 0 ? (
            <PropertyNoFound />
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
