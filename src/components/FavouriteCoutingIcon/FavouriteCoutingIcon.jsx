import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavouriteContext/FavouriteProvider";

const FavouriteCoutingIcon = () => {
  const { favorites } = useFavorites(); // Access the favorites array
  const nevigate = useNavigate();
  return (
    <div
      onClick={() => nevigate("/favourite")}
      className="relative cursor-pointer"
    >
      {/* Show favorite count */}
      {favorites.length > 0 && (
        <div className="bg-accent absolute -top-2 left-3 rounded-4xl px-1 py-0.5 text-xs text-[9px] font-bold text-blue-800">
          {favorites.length}
        </div>
      )}

      {/* Heart icon */}
      {favorites.length > 0 ? <FaHeart color="blue" /> : <FaRegHeart />}
    </div>
  );
};

export default FavouriteCoutingIcon;
