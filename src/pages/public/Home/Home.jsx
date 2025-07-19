// ✅ Home.jsx (FULL CODE with enhancements)
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { TfiRulerAlt2 } from "react-icons/tfi";
import { LiaBedSolid } from "react-icons/lia";
import { FiMapPin, FiSearch } from "react-icons/fi";

import axios from "../../../utils/axiosInstance";

import Button from "../../../components/ui/Button";
import { useLanguage } from "../../../hook/useLanguage";
const ifNotImg = "/image/fallback.jpg";

const cities = [
  {
    name: "Amsterdam",
    props: "790+ Properties",
    img: "/hero/amsterdam.png",
    location: "Amsterdam",
  },
  {
    name: "Rotterdam",
    props: "238+ Properties",
    img: "/hero/rotterdam.png",
    location: "Rotterdam",
  },
  {
    name: "The Hague",
    props: "0 Properties",
    img: "/hero/Hague.png",
    location: "The Hague",
  },
  {
    name: "Utrecht",
    props: "122+ Properties",
    img: "/hero/eindhoven.png",
    location: "Utrecht",
  },
  {
    name: "Eindhoven",
    props: "84+ Properties",
    img: "/hero/utrech.png",
    location: "Eindhoven",
  },
  {
    name: "Maastricht",
    props: "27+ Properties",
    img: "/hero/maastricht.png",
    location: "Maastricht",
  },
  {
    name: "Groningen",
    props: "52+ Properties",
    img: "/hero/groningen.png",
    location: "Groningen",
  },
];

const howWorks = [
  {
    title: "Aanmelden",
    desc: "Maak in een paar minuten jouw account aan en start direct met zoeken.",
  },
  {
    title: "Woning zoeken",
    desc: "Vind jouw droomwoning in je favoriete stad met onze handige zoekfilters.",
  },
  {
    title: "Blijf op de hoogte",
    desc: "Nog niet gevonden wat je zocht? Je ontvangt dagelijks of wekelijks nieuwe huurwoningen in je inbox.",
  },
  {
    title: "Verhuizen maar",
    desc: "Reageer, plan een bezichtiging en begin vast met inpakken. Jouw nieuwe woning wacht op je!",
  },
];

function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);

  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    minSurfaceArea: "",
    maxSurfaceArea: "",
  });
  const [properties, setProperties] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  // Fetch location suggestions with debounce
  const fetchSuggestions = async (query) => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsFetchingSuggestions(true);

    try {
      const res = await axios.get(`/properties?location=${query}&limit=50`);

      const uniqueLocations = [
        ...new Set(res.data.properties.map((p) => p.location)),
      ].filter(Boolean);

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

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    [],
  );

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/properties?limit=4");
        setProperties(res.data.properties);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Handle location input change
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    debouncedFetchSuggestions(value);

    if (value.trim() === "") {
      setFilters((prev) => ({ ...prev, location: "" }));
    }
  };

  // Handle suggestion select
  const handleSuggestionSelect = (suggestion) => {
    setFilters((prev) => ({ ...prev, location: suggestion }));
    setLocationInput(suggestion);
    setShowSuggestions(false);
  };

  // Handle search submission
  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    // Add all filters to query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    navigate(`/properties?${queryParams.toString()}`);
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Clear location input
  const clearLocationInput = () => {
    setLocationInput("");
    setFilters((prev) => ({ ...prev, location: "" }));
  };

  const eindhoven = cities.find((c) => c.name === "Eindhoven");
  const leftCities = cities.slice(0, 4);
  const rightCities = cities.slice(5);

  const getCitySearchUrl = (cityName) => {
    const params = new URLSearchParams();
    params.append("location", cityName);
    return `/properties?${params.toString()}`;
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative inset-0 h-96 bg-cover bg-center md:h-[550px]"
        style={{
          backgroundImage: "url(/home/nl-property-hero.jpg)",
        }}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 to-black/60"></div>
        <div className="relative z-20 flex h-full items-center justify-center">
          <div className="mx-auto max-w-7xl px-4">
            <div className="rounded-lg p-6 shadow-xl">
              <h3 className="md:text-md text-center text-sm text-white lg:text-xl">
                {t("home.hero.subTitle")}
              </h3>
              <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
                <h1 className="text-center text-2xl leading-tight text-white/90 md:text-4xl lg:text-6xl">
                  {t("home.hero.title1")}
                  <br />
                  <span className="block text-[#3CAAFA]">
                    {t("home.hero.title2")}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="relative -top-15 z-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center gap-3 bg-white p-6 md:mx-4 md:flex-row md:rounded-lg md:p-6 md:shadow-lg lg:p-8">
            {/* Location Search */}
            <div className="relative w-full" ref={suggestionsRef}>
              <div className="relative">
                <input
                  type="text"
                  aria-label={t("filters.search")}
                  value={locationInput}
                  onChange={handleLocationChange}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder={t("filters.search")}
                  className="h-16 w-full rounded-lg border border-gray-200 py-2 pr-4 pl-8 shadow focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  autoComplete="off"
                />
                <FiMapPin className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                {locationInput && (
                  <button
                    type="button"
                    aria-label="Clear location input"
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-gray-200 px-1.5 py-0.5 text-sm font-bold text-gray-600 hover:text-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none"
                    onClick={clearLocationInput}
                  >
                    ✕
                  </button>
                )}
              </div>

              {showSuggestions && (
                <ul className="absolute top-full left-0 z-10 mt-0.5 max-h-60 w-full overflow-y-auto rounded-lg bg-white text-sm shadow">
                  {isFetchingSuggestions ? (
                    <li className="p-3 text-center text-gray-500">
                      Loading...
                    </li>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="flex cursor-pointer items-center gap-2 px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => handleSuggestionSelect(suggestion)}
                        role="option"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleSuggestionSelect(suggestion);
                          }
                        }}
                      >
                        <FiMapPin size={14} />
                        {suggestion.slice(8, 100)}
                      </li>
                    ))
                  ) : locationInput.trim().length >= 2 ? (
                    <li className="p-3 text-center text-gray-400">
                      No matching locations!
                    </li>
                  ) : null}
                </ul>
              )}
            </div>

            {/* Min Price */}
            <div className="w-full">
              <input
                type="number"
                aria-label={t("home.hero.search.min")}
                placeholder={`€ ${t("home.hero.search.min")}`}
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="h-16 w-full rounded-lg border border-gray-200 py-2 pr-4 pl-4 shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
                min={0}
              />
            </div>

            {/* Max Price */}
            <div className="w-full">
              <input
                type="number"
                aria-label={t("home.hero.search.max")}
                placeholder={`€ ${t("home.hero.search.max")}`}
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="h-16 w-full rounded-lg border border-gray-200 py-2 pr-4 pl-4 shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
                min={0}
              />
            </div>

            {/* Search Button */}
            <div className="w-full">
              <Button
                variant="yellowGradient"
                size="lg"
                onClick={handleSearch}
                className="mt-1 flex h-16 w-full items-center justify-center gap-2"
                type="button"
              >
                <FiSearch />
                {t("home.hero.search.button")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* POPOLER SECTION */}
      <section className="px-4 md:px-6 lg:pt-10">
        <div className="mb-12">
          <h2 className="text-center text-2xl md:text-4xl">
            {t("home.PopularCity.title")}
          </h2>
          <p className="text-center">{t("home.PopularCity.desc")}</p>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:flex-wrap lg:flex-row">
          {/* Left: 2x2 Grid */}
          <div className="grid flex-1 grid-cols-2 gap-4">
            {leftCities.map((city, i) => (
              <Link to={getCitySearchUrl(city.location)} key={i}>
                <div className="group relative h-64 overflow-hidden rounded">
                  <img
                    className="h-full w-full object-cover"
                    src={city.img}
                    alt={city.name}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900 via-gray-900/40 p-3">
                    <h3 className="text-white">{city.name}</h3>
                    <p className="text-sm text-white">{city.props}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Center: Eindhoven */}
          <div className="max-w-full flex-1 md:max-w-7xl">
            <Link to={getCitySearchUrl(eindhoven.location)}>
              <div className="group relative h-full overflow-hidden rounded">
                <img
                  src={eindhoven.img}
                  className="md:h-96 md:w-full md:object-cover lg:h-full lg:w-full"
                  alt={eindhoven.name}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900 via-gray-900/40 p-4">
                  <h3 className="text-xl font-semibold text-white">
                    {eindhoven.name}
                  </h3>
                  <p className="text-sm text-white">{eindhoven.props}</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Right: 2 boxes side-by-side, never stacked */}
          <div className="grid max-w-full flex-1 grid-cols-2 gap-4 md:max-w-7xl md:grid-cols-2 lg:grid-cols-1">
            {rightCities.map((city, i) => (
              <Link to={getCitySearchUrl(city.location)} key={i}>
                <div className="group relative h-64 w-full overflow-hidden rounded">
                  <img
                    src={city.img}
                    className="h-full w-full object-cover"
                    alt={city.name}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900 via-gray-900/40 p-3">
                    <h3 className="text-lg font-semibold text-white">
                      {city.name}
                    </h3>
                    <p className="text-sm text-white">{city.props}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT-US SECTION */}
      <section className="w-full bg-white px-4 py-10 md:px-6 md:py-12 lg:py-26">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text Section */}
          <div>
            <h3 className="mb-2 text-[#0278d9]">{t("home.about.subTitle")}</h3>
            <h2 className="mb-6 text-2xl md:text-4xl">
              {t("home.about.title")}
            </h2>
            <p className="mb-6">
              {t("home.about.desc1")}
              <br />
              <br />
              {t("home.about.desc2")}
            </p>
            <Link to="/about">
              <Button variant="yellowGradient" size="lg" className="">
                {t("home.about.button")}
              </Button>
            </Link>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <img
                src="/about/about-1.jpg"
                alt="Decor 1"
                className="h-auto w-full rounded-lg"
              />
              <img
                src="/about/about-2.jpg"
                alt="Decor 2"
                className="mt-4 h-auto w-full rounded-lg object-cover"
              />
            </div>

            <div>
              <img
                src="/about/about-3.jpg"
                alt="Decor 3"
                className="h-auto w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RECENT SECTION */}
      <section className="w-full bg-slate-50 px-4 py-10 md:px-6 md:py-12 lg:py-26">
        {/* Decorative background images */}

        {/* Main content */}
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mx-auto mb-6 max-w-2xl text-center md:mb-12">
            <h2 className="mb-3 text-2xl md:text-4xl">
              {t("home.recent.title")}
            </h2>
            <p className="leading-normal">{t("home.recent.desc")}</p>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:p-0">
            {properties.map((property) => (
              <div
                key={property.id}
                className="overflow-hidden rounded-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                {/* Image & Tags */}
                <div className="relative h-44">
                  <Link
                    to={`/properties/${property.id}`}
                    className="cursor-pointer"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src={
                        property.primaryImage === "No image available"
                          ? ifNotImg
                          : property.primaryImage
                      }
                      alt="Property"
                    />
                  </Link>
                  <div className="absolute top-4 right-4 left-4 flex justify-between">
                    <h4 className="rounded bg-blue-500/90 px-2.5 py-2 text-xs text-white shadow">
                      FEATURED
                    </h4>
                    <h4 className="rounded bg-cyan-950/90 px-2.5 py-2 text-xs text-white shadow">
                      FOR SALE
                    </h4>
                  </div>
                </div>

                {/* Details */}
                <div className="bg-white p-6">
                  <div className="mb-4">
                    <h3 className="font-dm-sans mb-1 text-sm font-semibold text-cyan-950">
                      {property.title}
                    </h3>
                    <p className="font-dm-sans text-sm text-neutral-400">
                      {property.address}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6 flex justify-between">
                    <div className="text-center">
                      <div className="mb-1 flex justify-center">
                        {/* Bed Icon */}
                        <LiaBedSolid />
                      </div>
                      <span className="font-dm-sans text-sm text-neutral-400">
                        {property.features.numberOfRoomsFloat} Beds
                      </span>
                    </div>

                    <div className="text-center">
                      <div className="mb-1 flex justify-center">
                        {/* Area Icon */}
                        <TfiRulerAlt2 />
                      </div>
                      <span className="font-dm-sans text-sm text-neutral-400">
                        {property.features.numberOfRoomsFloat}
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="border-opacity-40 flex items-center justify-between border-t border-neutral-400 pt-4">
                    <div className="text-left">
                      <div className="text-sm text-neutral-400 line-through">
                        {property.price}
                      </div>
                      <p className="text-cyan-950">{property.price}</p>
                    </div>

                    {/* CTA */}
                    <div>
                      <Link
                        to={`/properties/${property.id}`}
                        className="mt-4 block cursor-pointer text-sm font-medium text-blue-700 hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Works Section */}
      <section className="relative w-full overflow-hidden bg-[linear-gradient(90deg,_#FFFEEB,_#E9F6FF)] px-4 py-10 md:px-6 md:py-10 lg:py-26">
        {/* Decorative Rotated Images */}
        <img
          className="absolute top-0 -left-[464px] h-64 w-[928px] rotate-90"
          src="/png-wing-2.png"
          alt="decor-top"
        />
        <img
          className="absolute -right-[404px] bottom-0 h-64 w-[928px] -rotate-90"
          src="/png-wing-2.png"
          alt="decor-bottom"
        />
        <img
          className="absolute top-0 left-1/2 h-[654px] w-[875px] -translate-x-1/2 object-contain"
          src="/png-wing-2.png"
          alt="main-illustration"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 lg:p-0">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h2 className="capitalize">{t("home.work.title")}</h2>
            <p className="font-inter text-base font-normal text-black">
              {t("home.work.desc")}
            </p>
          </div>

          {/* Steps */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howWorks.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-4 rounded-lg bg-white px-6 py-8 shadow-sm"
              >
                <h3 className="rounded bg-[#0278d9] px-4 py-2 text-2xl text-white">
                  {idx + 1}
                </h3>
                <div className="space-y-2 text-center">
                  <h3 className="font-lato text-xl font-semibold text-black capitalize">
                    {step.title}
                  </h3>
                  <p className="">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
