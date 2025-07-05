import { FaHotel } from "react-icons/fa";
import { FiClock, FiLayers, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";
import Button from "../ui/Button";

// "https://via.placeholder.com/384x256?text=No+Image";

const PeropertiesCard = ({ item }) => {
  const {
    id,
    priceFloat,
    features: { surfaceAreaFloat, numberOfRoomsFloat },
    title,
    description,
    primaryImage,
    createdAt,
    location,
    price,
  } = item;

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div
      key={id}
      className="mb-4 w-full rounded-lg bg-white p-4 shadow-sm transition hover:shadow-lg sm:h-72 md:mb-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-lg sm:h-64 sm:w-96">
          <Link to={`/properties/${id}`}>
            <img
              src={primaryImage}
              alt={title}
              className="h-full w-full cursor-pointer object-cover"
            />
          </Link>

          <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border-t border-zinc-900/5 bg-white p-2 shadow">
            <div>
              <FavouriteIcon itemId={id} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-4">
            {/* Title and time */}
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
              <h3 className="text-lg font-semibold text-black capitalize sm:text-xl">
                {title.slice(9, 40)}...
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <FiClock size={15} />
                {formatRelativeTime(createdAt)}
              </div>
            </div>

            {/* Description */}
            <p className="line-clamp-2 text-sm text-gray-600 sm:line-clamp-3">
              {description.toLowerCase() || "No description available"}
            </p>

            <div>
              {/* Features */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1.5">
                  <FiLayers className="text-gray-400" />
                  <span className="text-xs text-gray-700">
                    {surfaceAreaFloat} m<sup>2</sup>
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1.5">
                  <FaHotel className="text-gray-400" />
                  <span className="text-xs text-gray-700">
                    {numberOfRoomsFloat}{" "}
                    {numberOfRoomsFloat > 1 ? "rooms" : "room"}
                  </span>
                </div>
              </div>

              {/* Location and price */}
              <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pt-0">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-1.5">
                  <FiMapPin className="text-gray-400" />
                  <span className="text-xs text-gray-700">
                    {location.slice(0, 30)}
                  </span>
                </div>

                <h3 className="py-2 text-lg font-bold text-gray-600 capitalize sm:text-xl">
                  ${priceFloat} {price.split(" ").at(-1)}
                </h3>
              </div>
            </div>
          </div>
          {/* Button */}
          <Link
            to={`/properties/${id}`}
            className="text-base font-medium text-white"
          >
            <Button size="lg" variant="yellowGradient" className="w-full">
              <span>Bekijk de woning</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PeropertiesCard;
