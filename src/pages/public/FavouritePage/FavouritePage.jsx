import "react-toastify/dist/ReactToastify.css";
import { useFavorites } from "../../../context/FavouriteContext/FavouriteProvider.jsx";
import FavouriteCard from "./FavouriteCard";

const FavouritePage = () => {
  const { favorites } = useFavorites();

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
          {favorites.length === 0 ? (
            <div className="py-10 text-center text-lg text-gray-600">
              <p className="text-xl font-semibold text-gray-800">
                No Results Found
              </p>
              <p>We couldn't find any properties in your favorites.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favorites?.map((item) => (
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
