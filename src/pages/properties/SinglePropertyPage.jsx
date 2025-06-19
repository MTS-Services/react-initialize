import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { LiaBedSolid } from "react-icons/lia";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { LuHeart } from "react-icons/lu";
import Button from "../../components/ui/Button";
import axios from "axios";

const url = "http://localhost:3000/api";

const SinglePropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [recent, setRecent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // Fetch single listing
        const listingRes = await axios.get(`${url}/properties/${id}`);

        setListing(listingRes.data.data.property);

        // Fetch recent listings (excluding current one)
        const recentRes = await axios.get(`${url}/properties`);

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

  return (
    <section>
      <div className="relative h-96 w-full">
        {/* Background Image */}
        <img
          src="/howworks.jpg"
          alt="House"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60" />
      </div>
      <div className="mx-auto max-w-7xl py-10">
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
          <p className="text-2xl font-bold text-blue-800">{listing.price}</p>
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
            {listing.media?.slice(0, 4).map((img, idx) => (
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
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Details */}
          <div className="md:col-span-2">
            <h2 className="mb-4 text-xl font-bold">Description</h2>
            <p className="mb-6 whitespace-pre-line text-gray-700">
              {listing.description || "No description available."}
            </p>

            <h2 className="mb-4 text-xl font-bold">Features</h2>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
                <FiLayers className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Surface</p>
                  <p className="font-medium">{listing.surface} m²</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
                <FiHome className="text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Rooms</p>
                  <p className="font-medium">{listing.rooms}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="sticky top-20 h-fit rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-xl font-bold">Contact Agent</h3>
            <hr className="mb-4 border border-gray-100" />
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <span className="font-bold text-yellow-800">
                    {listing.agent?.name?.charAt(0) || "A"}
                  </span>
                </div>
                <div>
                  <p className="font-medium">
                    {listing.agent?.name || "Agent Name"}
                  </p>
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

              <Button
                className="w-full rounded-lg"
                variant="yellowGradient"
                size="lg"
              >
                Schedule a Visit
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Listings */}
        <div className="py-20">
          <h3 className="mb-6 text-2xl font-bold">Similar Properties</h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {recent.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/properties/${item.id}`)}
                className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                <img
                  src={
                    item.media?.[0]?.url ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
                {/* Details */}
                <div className="bg-white p-6">
                  <div className="mb-4">
                    <h3 className="font-dm-sans mb-1 text-sm font-semibold text-cyan-950">
                      {item.title.slice(0, 30)}...
                    </h3>
                    <p className="font-dm-sans text-sm text-neutral-400">
                      {item.address}
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
                        {item.beds} Beds
                      </span>
                    </div>

                    <div className="text-center">
                      <div className="mb-1 flex justify-center">
                        {/* Area Icon */}
                        <TfiRulerAlt2 />
                      </div>
                      <span className="font-dm-sans text-sm text-neutral-400">
                        {item.size} Area
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="border-opacity-40 flex items-center justify-between border-t border-neutral-400 pt-4">
                    <div className="text-right">
                      <div className="font-dm-sans text-sm font-semibold text-cyan-950">
                        {item.price}
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label="Add to favorites"
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-50 hover:bg-red-100"
                    >
                      <LuHeart />
                    </button>
                  </div>

                  {/* CTA */}
                  <a
                    href="#"
                    className="mt-4 block text-sm font-medium text-blue-700 hover:underline"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinglePropertyPage;
