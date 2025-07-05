import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavouriteContext/FavouriteProvider";
import Modal from "../ui/Modal";
import { useState } from "react";

const FavouriteIcon = ({ itemId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((item) => item.id === itemId);
  const user = localStorage.getItem("userInfo");
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      toggleFavorite(itemId);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="cursor-pointer" onClick={handleClick}>
        {isFavorite ? (
          <FaHeart className="text-blue-500" size={18} />
        ) : (
          <FaRegHeart className="text-blue-500" size={18} />
        )}
      </div>

      {/* Conditionally render modal */}
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
    </>
  );
};

export default FavouriteIcon;
