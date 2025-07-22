import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiClock,
  FiHeart,
  FiHome,
  FiInfo,
  FiLayers,
  FiMapPin,
  FiStar,
  FiTool,
} from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";
import { MdFilterList } from "react-icons/md";

import axios from "../../../utils/axiosInstance";
import clsx from "clsx";

import RecentProperty from "../../../components/common/RecentProperty";
import ShareButtons from "../../../components/common/ShareButtons";
import { isPaid } from "../../../features/auth/authUtils";
import Button from "../../../components/ui/Button";

import NotFounds from "../../../components/error/NotFounds";
import { useLanguage } from "../../../hook/useLanguage";
import Modal from "../../../components/ui/Modal";

const ifNotImg = "/image/random/fallback.jpg";

const SinglePropertyPage = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [recent, setRecent] = useState([]);

  const isPaidUser = isPaid();

  const details = { ...listing?.transferDetails, ...listing?.otherDetails };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // Fetch single listing
        const propertyList = await axios.get(`/properties/search/${id}`);

        setListing(propertyList.data.data.property);

        // Fetch recent listings (excluding current one)
        const recentRes = await axios.get(`/properties`);

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

  const handleClick = () => {
    if (!isPaidUser) {
      setIsOpen(true); // ✅ opens your existing modal
    }
  };

  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  if (isLoading) {
    return (
      <div className="inset-0 flex h-screen items-center justify-center bg-white">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-900 border-t-transparent" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="">
        <div className="bg-red-400 py-7.5" />
        <div className="h-[95vh] pt-54">
          <NotFounds
            message="We couldn't find any properties matching your criteria."
            buttonLink="/properties"
          />
        </div>
      </div>
    );
  }

  const price = listing?.price;

  const cleanedPrice =
    typeof price === "string"
      ? price.replace(/(per maand|per month)(?=.*\1)/, "").trim()
      : "";

  return (
    <section>
      <header
        className="relative h-[300px] bg-cover bg-center md:h-[400px]"
        style={{
          backgroundImage: `url(${listing.media?.[mainImage]?.url || ifNotImg})`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div>
            <h1 className="text-center text-2xl font-bold text-white drop-shadow-md md:text-4xl">
              {t("filters.top")}
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-0">
        {/* Back button */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center gap-2 text-yellow-600 hover:underline"
          >
            <FiArrowLeft /> Go Back
          </button>

          <ShareButtons />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between md:mb-4">
          <div>
            <h1 className="mb-2 text-lg font-bold md:text-3xl">
              {listing.title}
            </h1>

            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1 text-gray-400">
                <FiMapPin className="w-5 text-gray-400" />
                <span className="md:text-md text-xs text-gray-400">
                  {listing.location}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="">
                  <FiClock className="w-5 text-gray-400" />
                </span>
                <span className="md:text-md text-xs text-gray-400">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4 rounded-lg bg-yellow-50 p-2">
          <h2 className="text-xl font-bold text-green-800 md:text-2xl">
            {cleanedPrice}
          </h2>
        </div>

        {/* Image Gallery */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <img
              src={listing.media?.[mainImage]?.url || ifNotImg}
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
                      backgroundImage: `url(/image/fallback1.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-slate-50 opacity-80"></div>

                    {/* Lock content */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <span
                        onClick={handleClick}
                        className="cursor-pointer rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                      >
                        <FaLock size={18} className="text-gray-400" />
                      </span>

                      <p className="mt-2 text-center text-base font-medium text-gray-500">
                        {t("header.access")}
                      </p>

                      <Modal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        onConfirm={() => {
                          navigate("/auth/login");
                          setIsOpen(false);
                        }}
                        title="Login Required"
                        confirmText="Login"
                        cancelText="Cancel"
                      >
                        Please log in to add this property to your favorites.
                      </Modal>
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
            <h2 className="mb-4 text-xl font-bold">
              {t("singleProprty.desc")}
            </h2>
            <div className="mb-6 text-base/8 whitespace-pre-line text-gray-700">
              <div
                className={`overflow-hidden transition-all duration-300 ${expanded ? "" : "max-h-32"}`}
              >
                {listing.description || "No description available."}
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

            <h2 className="mb-4 text-xl font-bold">
              {t("singleProprty.feature")}
            </h2>
            <div className="mb-6 grid grid-cols-2 gap-4">
              {/* Surface Area */}
              <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <FiLayers className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Surface
                  </p>
                  <p className="text-md font-semibold text-gray-700">
                    {listing.features.surfaceAreaFloat || "No available"}
                  </p>
                </div>
              </div>

              {/* Rooms */}
              <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <FiHome className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Rooms
                  </p>
                  <p className="text-md font-semibold text-gray-700">
                    {listing.features.numberOfRoomsFloat || "No available"}
                  </p>
                </div>
              </div>

              {/* Interior Type */}
              <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <FiTool className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Interior
                  </p>
                  <p className="text-md font-semibold text-gray-700">
                    {listing.features.interiorType || "No available"}
                  </p>
                </div>
              </div>

              {/* Additional feature slot - customize as needed */}
              <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <FiStar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Feature
                  </p>
                  <p className="text-md font-semibold text-gray-700">Value</p>
                </div>
              </div>
            </div>
            <h2 className="mb-4 text-xl font-bold">
              {t("singleProprty.details")}
            </h2>
            <div className="mb-8 rounded-lg border border-gray-200">
              {Object.keys(details).length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {Object.entries(details).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-5 w-5 text-gray-400">
                          <MdFilterList />
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                          {formatLabel(key)}
                        </span>
                      </div>
                      <span className="text-right font-medium whitespace-pre-line text-gray-500">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <FiInfo className="mb-2 h-8 w-8 text-gray-300" />
                  <p className="text-gray-500">No details available</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Additional information will be shown here when available
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Card */}
          <div className="sticky top-20 h-fit rounded-lg bg-slate-50 p-6">
            <h3 className="mb-4 text-xl font-bold">
              {t("singleProprty.agent.title")}
            </h3>
            <hr className="mb-4 border border-gray-100" />
            {isPaidUser ? (
              <div className="space-y-4"></div>
            ) : (
              <div className="relative flex h-44 w-full flex-col items-center justify-center">
                {/* Centered lock icon */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <span
                    onClick={handleClick}
                    className="cursor-pointer rounded-full bg-slate-100 p-4 hover:bg-gray-200"
                  >
                    <FaLock size={18} className="text-gray-300" />
                  </span>
                  <p className="text-gray-400">{t("header.access")}</p>
                </div>
              </div>
            )}

            <div className="pt-4">
              {isPaidUser ? (
                <a
                  href={`${listing.url || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3CAAFA] to-[#1198fa] px-4 py-4 shadow transition-transform hover:scale-95 hover:from-[#1a8adb] hover:to-[#0278d9]"
                >
                  <BiLinkAlt size={20} className="text-gray-100" />
                  <span className="text-lg font-bold text-white">
                    {t("singleProprty.feature.contact")}
                  </span>
                </a>
              ) : (
                <Link to="/auth/register">
                  <Button
                    className="w-full rounded-lg"
                    variant="secondary"
                    size="lg"
                  >
                    {t("header.register")}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Recent Listings */}
        <div className="pt-10 md:py-20">
          <h3 className="mb-6 text-2xl font-bold">
            {t("singleProprty.similar")}
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
