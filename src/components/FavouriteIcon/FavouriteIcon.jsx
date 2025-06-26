import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../../context/FavouriteContext/FavouriteProvider";

const FavouriteIcon = ({ itemId }) => {
  const { favorites, toggleFavorite } = useFavorites(); // Access favorites and toggle function

  const isFavorite = favorites ? favorites.includes(itemId) : false; // Safely check if itemId is in favorites list

  return (
    <div className="cursor-pointer" onClick={() => toggleFavorite(itemId)}>
      {isFavorite ? <FaHeart color="blue" /> : <FaRegHeart />}
    </div>
  );
};

export default FavouriteIcon;
