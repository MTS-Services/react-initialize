import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Importing toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Importing styles for toast
import CardSkeleton from "../../components/common/Card-Skeleton";
import FavouriteCard from "./FavouriteCard";

const URL = "https://apify-backend.onrender.com/api/favorites/getFavorites";

const FavouritePage = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetch property data
  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.data?.token;
      console.log("Your token", token);
      if (!token) {
        toast.error("User is not authenticated!");
        return;
      }

      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties(response.data);
      console.log("res", response);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Only run fetchData once when component mounts

  // Loading animation
  const renderSkeletonListings = () => {
    return Array(20) // Assuming max 20 skeletons for a default view
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
          <h1 className="text-center text-4xl font-bold text-white drop-shadow-md">
            Your Favourite
          </h1>
        </div>
      </header>

      <main className="mx-auto mt-10 max-w-7xl px-5 md:px-8 lg:px-0">
        <article className="flex-1 pt-5 md:pt-8 lg:pt-0">
          {/* Displaying Listings */}
          {isLoading ? (
            renderSkeletonListings() // Show loading skeleton
          ) : isError ? (
            <div className="py-10 text-center text-lg text-red-600">
              Error loading properties. Please try again.
            </div>
          ) : properties?.length === 0 ? (
            <div className="py-10 text-center text-lg text-gray-600">
              <p className="text-xl font-semibold text-gray-800">
                No Results Found
              </p>
              <p>We couldn't find any properties in your favorites.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-3">
              {/* Loop through the properties and display each card */}
              {properties?.map((item) => (
                <FavouriteCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </article>
      </main>
    </section>
  );
};

export default FavouritePage;
