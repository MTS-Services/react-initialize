import "react-toastify/dist/ReactToastify.css";
import { useFavorites } from "../../../context/FavouriteContext/FavouriteProvider.jsx";
import FavouriteCard from "./FavouriteCard";
import FavouriteNoFound from "../../../components/error/NotFounds.jsx";
import { FiHeart } from "react-icons/fi";

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
            My Favourites
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 md:px-8 lg:px-0 lg:py-20">
        <article className="flex-1 pt-5 md:pt-8 lg:pt-0">
          {favorites.length === 0 ? (
            <FavouriteNoFound
              icon={<FiHeart className="h-6 w-6 text-gray-500" />}
              title="No Favorites Here!"
              message="Looks like you haven’t saved anything yet."
              buttonText="Browse Properties"
              buttonLink="/properties"
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
