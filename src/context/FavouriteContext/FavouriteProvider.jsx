import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FavoriteContext } from "./FavouriteContext.jsx";

export const FavoriteProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const URL = "http://localhost:3011/api";

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

  // ✅ Helper: get token from localStorage
  const getToken = () => {
    const parsedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    return parsedUserInfo?.data?.token;
  };

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
        const response = await fetch(`${URL}/favorites/getFavorites`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (response.ok) {
          const dbFavorites = await response.json();
          setFavorites(dbFavorites || []);
          console.log("Loaded favorites from DB:", dbFavorites);
        } else {
          toast.error("Failed to load favorites from the database!");
          console.error("Failed to load favorites from DB:", response);
        }
      } catch (error) {
        console.error("Error fetching favorites from DB:", error);
        toast.error("Network error while loading favorites!");
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
    const actionText = isAlreadyFavorite ? "removed from" : "added to";

    try {
      const response = await fetch(`${URL}/favorites/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ propertyId: itemId, userId: user.id }),
      });

      if (response.ok) {
        const fetchResponse = await fetch(`${URL}/favorites/getFavorites`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (fetchResponse.ok) {
          const dbFavorites = await fetchResponse.json();
          setFavorites(dbFavorites || []);
          toast.success(`Successfully ${actionText} favorites!`);
        } else {
          toast.error("Updated, but failed to refresh favorites.");
          console.error("Failed to refresh favorite status:", fetchResponse);
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData?.error || `Failed to ${actionText} favorites`);
        console.error(`Failed to ${actionText} favorites:`, response);
      }
    } catch (error) {
      console.error("Network error while toggling favorite:", error);
      toast.error("Network error! Please try again.");
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
