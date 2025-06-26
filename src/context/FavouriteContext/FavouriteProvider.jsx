import { useContext, useEffect, useState } from "react";
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
    }
  }, [user]);

  // Sync favorites with the database when the user logs in
  useEffect(() => {
    if (user && !isSyncing) {
      // If the user is logged in, sync favorites with the database
      const syncFavorites = async () => {
        setIsSyncing(true);
        try {
          const savedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

          // Save the favorites to the database if any exist in localStorage
          if (savedFavorites.length > 0) {
            await fetch(`${URL}/favorites/addFavorite`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user.id,
                favorites: savedFavorites,
              }),
            });

            // After syncing, clear localStorage and load from the database
            localStorage.removeItem("favorites");

            // Fetch the favorites from the DB after syncing
            const response = await fetch(
              `${URL}/favorites/getFavorites/${user.id}`,
            );
            const dbFavorites = await response.json();
            setFavorites(dbFavorites);
          }
        } catch (error) {
          console.error("Error syncing favorites with database:", error);
        } finally {
          setIsSyncing(false);
        }
      };

      syncFavorites();
    }
  }, [user, isSyncing]);

  // Function to toggle favorite
  const toggleFavorite = async (itemId) => {
    if (!user) {
      // If user is not logged in, store favorites in localStorage
      const updatedFavorites = [...favorites];
      const index = updatedFavorites.indexOf(itemId);
      if (index !== -1) {
        // Remove from favorites
        updatedFavorites.splice(index, 1);
      } else {
        // Add to favorites
        updatedFavorites.push(itemId);
      }

      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
    } else {
      // If user is logged in, save to database
      try {
        await fetch(`${URL}/favorites/addFavorite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id, propertyId: itemId }),
        });

        // Add or remove from the current favorites state
        const updatedFavorites = [...favorites];
        const index = updatedFavorites.indexOf(itemId);
        if (index !== -1) {
          updatedFavorites.splice(index, 1); // Remove if already in the list
        } else {
          updatedFavorites.push(itemId); // Add if not in the list
        }
        setFavorites(updatedFavorites);
      } catch (error) {
        console.error("Error updating favorites in the database:", error);
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
