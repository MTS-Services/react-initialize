import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FavoriteContext } from "./FavouriteContext.jsx";
import BASE_URL from "../../config/api.js";
import axios from "../../utils/axiosInstance.js";

export const FavoriteProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Check and set user on mount + listen to logout from other tabs
  useEffect(() => {
    const parsedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(parsedUserInfo?.data || null);

    const handleStorageChange = () => {
      const updatedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!updatedUserInfo) {
        setUser(null);
        setFavorites([]);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ Helper: check login before actions
  const checkLogin = () => {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    if (!info?.data?.token) {
      setUser(null);
      setFavorites([]);
      navigate("/auth/login");
      return false;
    }
    return true;
  };

  // ✅ Fetch favorites from DB once user is known
  useEffect(() => {
    const fetchFavoritesFromDB = async () => {
      if (!user) {
        setIsLoading(false);
        setFavorites([]);
        return;
      }

      try {
        const { data } = await axios.get(`/favorites/getFavorites`);
        setFavorites(data || []);
      } catch (error) {
        console.error("Error fetching favorites from DB:", error);
        toast.error("Failed to load favorites from the database!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoritesFromDB();
  }, [user]);

  // ✅ Toggle favorite (add/remove) with notifications
  const toggleFavorite = async (itemId) => {
    if (!checkLogin()) return;

    const isAlreadyFavorite = favorites.some((item) => item.id === itemId);
    const endpoint = isAlreadyFavorite ? "removeFavorite" : "addFavorite";
    const actionText = isAlreadyFavorite ? "removed item" : "item added";

    try {
      // Step 1: Toggle favorite (add/remove)
      await axios.post(`/favorites/${endpoint}`, {
        propertyId: itemId,
        userId: user.id,
      });

      // Step 2: Refresh favorites
      const { data } = await axios.get(`/favorites/getFavorites`);
      setFavorites(data || []);
      toast.success(`${actionText}!`);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || `Failed to ${actionText} favorites`;
      toast.error(errorMessage);
      console.error(`Error toggling favorite:`, error);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, isLoading, setFavorites, setUser }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
};
