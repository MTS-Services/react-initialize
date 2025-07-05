import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useFavorites } from "../../context/FavouriteContext/FavouriteProvider";

const FavouriteIcon = ({ itemId }) => {
  const { favorites, toggleFavorite } = useFavorites(); // Access favorites and toggle function
  const isFavorite = favorites.some((item) => item.id === itemId);
  const user = localStorage.getItem("userInfo");
  console.log("ss", user);
  const nevigate = useNavigate();
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        if (user) {
          toggleFavorite(itemId);
        } else {
          nevigate("/auth/login");
        }
      }}
    >
      {isFavorite ? <FaHeart color="blue" /> : <FaRegHeart />}
    </div>
  );
};

export default FavouriteIcon;
