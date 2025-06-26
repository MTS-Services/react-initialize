import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiHeart,
  FiShare2,
  FiMapPin,
  FiLayers,
  FiHome,
  FiClock,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import { FaLock } from "react-icons/fa";

import Button from "../../components/ui/Button";
import axios from "axios";
import clsx from "clsx";

import { isPaid } from "../../features/auth/authUtils";
import RecentProperty from "../../components/common/RecentProperty";

const URL = "https://mts-ecommerce-backend.onrender.com/api/v1";

const SinglePropertyPage = () => {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [recent, setRecent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);

  const isPaidUser = isPaid();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // Fetch single listing
        const listingRes = await axios.get(`${URL}/properties/${id}`);
        console.log(listingRes.data.data.property);
        setListing(listingRes.data.data.property);

        // Fetch recent listings (excluding current one)
        const recentRes = await axios.get(`${URL}/properties`);

        const filteredRecent = recentRes.data.properties
          .filter((item) => item.id !== parseInt(id))
          .slice(0, 4);
        setRecent(filteredRecent);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="inset-0 flex h-screen items-center justify-center bg-white">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-900 border-t-transparent"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="mx-auto flex h-screen max-w-7xl items-center justify-center p-10 text-center">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Listing not found</h2>

          <Button variant="yellowGradient" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const formatDescription = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.trim().startsWith("- ")) {
        return (
          <li key={i} className="ml-4 list-disc">
            {line.substring(2)}
          </li>
        );
      }
      return (
        <p key={i} className="mb-3">
          {line}
        </p>
      );
    });
  };

  return (
    <section>
      <header className="relative h-96 w-full">
        {/* Background Image */}
        <img
          src="/howworks.jpg"
          alt="House"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60" />
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-0">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex cursor-pointer items-center gap-2 text-yellow-600 hover:underline"
        >
          <FiArrowLeft /> Go Back
        </button>

        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold md:text-3xl">
              {listing.title}
            </h1>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <FiMapPin />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm text-gray-400">
                  <FiClock />
                  {new Date(listing.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="cursor-pointer rounded-full p-2 hover:bg-gray-100">
              <FiHeart className="text-gray-600" />
            </button>
            <button className="cursor-pointer rounded-full bg-gray-100 p-2 hover:bg-gray-200">
              <FiShare2 className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6 rounded-lg bg-yellow-50 p-4">
          <h2 className="text-2xl font-bold text-green-800">{listing.price}</h2>
        </div>

        {/* Image Gallery */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <img
              src={
                listing.media?.[mainImage]?.url ||
                "https://via.placeholder.com/800x500?text=No+Image"
              }
              alt={listing.title}
              className="h-96 w-full rounded-lg object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {isPaidUser
              ? listing.media?.slice(0, 4).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setMainImage(idx)}
                    className="cursor-pointer"
                  >
                    <img
                      src={img.url}
                      alt={`Gallery ${idx}`}
                      className={`h-44 w-full rounded-lg object-cover ring ring-gray-200 ${
                        mainImage === idx ? "ring-2 ring-gray-200" : ""
                      }`}
                    />
                  </div>
                ))
              : listing.media?.slice(0, 4).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative flex h-[20vh] w-full items-center justify-center overflow-hidden rounded-lg shadow"
                    style={{
                      backgroundImage: `url(${img.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 backdrop-blur"></div>

                    {/* Lock content */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <Link
                        to="/register"
                        className="cursor-pointer rounded-full border border-slate-400 p-2 hover:bg-gray-500"
                      >
                        <FaLock size={18} className="text-gray-200" />
                      </Link>
                      <p className="mt-2 text-center text-base font-medium text-gray-100">
                        Access Required
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Details */}
          <div
            className={clsx(
              isPaidUser
                ? "overflow-hidden md:col-span-2"
                : "h-96 overflow-hidden blur-sm md:col-span-2",
            )}
          >
            <h2 className="mb-4 text-xl font-bold">Description</h2>
            <div className="mb-6 text-base/8 whitespace-pre-line text-gray-700">
              {/* {listing.description || "No description available."} */}

              <div
                className={`overflow-hidden transition-all duration-300 ${expanded ? "" : "max-h-32"}`}
              >
                {formatDescription(listing.description) ||
                  "No description available."}
              </div>
              {
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-2 text-right font-medium text-blue-600 hover:underline"
                >
                  {expanded ? "- Read less" : "+ Read more"}
                </button>
              }
            </div>

            <h2 className="mb-4 text-xl font-bold">Features</h2>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 shadow-sm">
                <FiLayers className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Surface</p>
                  <p className="font-medium">{listing.surface} m²</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 shadow-sm">
                <FiHome className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Rooms</p>
                  <p className="font-medium">{listing.rooms}</p>
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-2">
              {Object.entries(listing.otherDetails || {}).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col rounded-lg bg-blue-50 p-4 shadow-sm"
                  >
                    <span className="text-lg text-gray-600 capitalize">
                      - {key.replace(/_/g, " ")}
                    </span>
                    <span className="font-medium whitespace-pre-line text-gray-500">
                      - {value}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Contact Card */}
          <div className="sticky top-20 h-fit rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-xl font-bold">Contact Agent</h3>
            <hr className="mb-4 border border-gray-100" />
            {isPaidUser ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <span className="font-bold text-yellow-800">
                      {listing.agent?.name?.charAt(0) || "A"}
                    </span>
                  </div>
                  <div>
                    <h4>{listing.agent?.name || "Agent Name"}</h4>
                    <p className="text-sm text-gray-600">Real Estate Agent</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={`tel:${listing.agent?.phone || ""}`}
                    className="flex items-center gap-2 rounded-lg bg-white p-3 hover:bg-gray-100"
                  >
                    <FiPhone className="text-gray-600" />
                    <span>
                      {listing.agent?.phone || "Phone number not available"}
                    </span>
                  </a>

                  <a
                    href={`mailto:${listing.agent?.email || ""}`}
                    className="flex items-center gap-2 rounded-lg bg-white p-3 hover:bg-gray-100"
                  >
                    <FiMail className="text-gray-600" />
                    <span>{listing.agent?.email || "Email not available"}</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="relative flex h-44 w-full flex-col items-center justify-center">
                {/* Centered lock icon */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <Link
                    to="/register"
                    className="cursor-pointer rounded-full bg-slate-100 p-4 hover:bg-gray-200"
                  >
                    <FaLock size={18} className="text-gray-300" />
                  </Link>
                  <p className="text-gray-400">Access Required</p>
                </div>
              </div>
            )}

            <div className="pt-4">
              {isPaidUser ? (
                <Button
                  className="w-full rounded-lg"
                  variant="yellowGradient"
                  size="lg"
                >
                  Schedule a Visit
                </Button>
              ) : (
                <Link to="/register">
                  <Button
                    className="w-full rounded-lg"
                    variant="secondary"
                    size="lg"
                  >
                    Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Recent Listings */}
        <div className="py-20">
          <h3 className="mb-6 text-2xl font-bold">Similar Properties</h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {recent.map((item) => (
              <RecentProperty item={item} key={item.id} />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};

export default SinglePropertyPage;
