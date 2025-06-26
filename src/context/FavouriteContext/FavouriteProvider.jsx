import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify"; // Importing toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Importing styles for toast
import { AuthContext } from "../AuthContext/AuthContext";
import { FavoriteContext } from "./FavouriteContext";

// Create the FavoriteProvider to wrap the app
export const FavoriteProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const URL = "https://apify-backend.onrender.com/api";
  const [isSyncing, setIsSyncing] = useState(false); // Flag to track if we are syncing with the DB

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    if (!user) {
      // If no user, load favorites from localStorage
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites);
      console.log("Loaded favorites from localStorage:", savedFavorites); // Debugging log
    }
  }, [user]);

  // Sync favorites with the database when the user logs in
  useEffect(() => {
    if (user && !isSyncing) {
      const syncFavorites = async () => {
        setIsSyncing(true);
        try {
          const savedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

          // Save the favorites to the database if any exist in localStorage
          if (savedFavorites.length > 0) {
            console.log("Syncing favorites with the database..."); // Debugging log
            const response = await fetch(`${URL}/favorites/addFavorite`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`, // Include the token in the Authorization header
              },
              body: JSON.stringify({
                userId: user.id,
                favorites: savedFavorites,
              }),
            });

            if (response.ok) {
              localStorage.removeItem("favorites"); // After syncing, clear localStorage
              console.log("Cleared favorites from localStorage"); // Debugging log

              const dbFavorites = await response.json();
              setFavorites(dbFavorites);
              toast.success("Favorites synced with the database!"); // Success toast
              console.log("Favorites synced from DB:", dbFavorites); // Debugging log
            } else {
              toast.error("Failed to sync favorites with the database!"); // Error toast
              console.error("Error syncing favorites with DB:", response); // Debugging log
            }
          }
        } catch (error) {
          console.error("Error syncing favorites with database:", error);
          toast.error("Error syncing favorites with the database!"); // Error toast
        } finally {
          setIsSyncing(false);
        }
      };

      syncFavorites();
    }
  }, [user, isSyncing]);

  // Function to get token from localStorage
  const getToken = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.data?.token;
  };

  // Function to toggle favorite (add/remove)
  const toggleFavorite = async (itemId) => {
    if (!user) {
      // If user is not logged in, store favorites in localStorage
      const updatedFavorites = [...favorites];
      const index = updatedFavorites.indexOf(itemId);
      if (index !== -1) {
        updatedFavorites.splice(index, 1); // Remove from favorites
        toast.info("Removed from favorites"); // Info toast
        console.log(
          `Property ID ${itemId} removed from localStorage favorites`,
        ); // Debugging log
      } else {
        updatedFavorites.push(itemId); // Add to favorites
        toast.success("Added to favorites"); // Success toast
        console.log(`Property ID ${itemId} added to localStorage favorites`); // Debugging log
      }

      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
    } else {
      // If user is logged in, save to database
      try {
        const response = await fetch(`${URL}/favorites/addFavorite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`, // Include the token in the Authorization header
          },
          body: JSON.stringify({ userId: user.id, propertyId: itemId }),
        });

        if (response.ok) {
          const updatedFavorites = [...favorites];
          const index = updatedFavorites.indexOf(itemId);
          if (index !== -1) {
            updatedFavorites.splice(index, 1); // Remove if already in the list
            toast.info("Removed from favorites"); // Info toast
            console.log(
              `Property ID ${itemId} removed from database favorites`,
            ); // Debugging log
          } else {
            updatedFavorites.push(itemId); // Add if not in the list
            toast.success("Added to favorites"); // Success toast
            console.log(`Property ID ${itemId} added to database favorites`); // Debugging log
          }
          setFavorites(updatedFavorites);
        } else {
          toast.error("Failed to update favorites in the database"); // Error toast
          console.error("Failed to update favorites:", response); // Debugging log
        }
      } catch (error) {
        console.error("Error updating favorites in the database:", error);
        toast.error("Error updating favorites"); // Error toast
      }
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

// Custom hook to use the FavoriteContext
export const useFavorites = () => useContext(FavoriteContext);
