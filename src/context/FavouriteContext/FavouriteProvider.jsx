import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify"; // নোটিফিকেশনের জন্য টোস্ট ইম্পোর্ট করা হচ্ছে
import "react-toastify/dist/ReactToastify.css"; // টোস্টের স্টাইল ইম্পোর্ট করা হচ্ছে
import { FavoriteContext } from "./FavouriteContext.jsx"; // FavoriteContext একটি আলাদা ফাইল থেকে ইম্পোর্ট করা হচ্ছে

// FavoriteProvider অ্যাপটিকে মোড়ানোর জন্য
export const FavoriteProvider = ({ children }) => {
  // localStorage থেকে ইউজার ইনফো লোড করা হচ্ছে
  const user = JSON.parse(localStorage.getItem("userInfo")) || null;
  // console.log("ইউজার - ", user);
  // "https://apify-backend.onrender.com/api"
  const [favorites, setFavorites] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false); // ট্র্যাক করার জন্য ফ্ল্যাগ যে আমরা DB এর সাথে সিঙ্ক করছি কিনা
  // প্রাথমিক সিঙ্ক একবার হয়েছে কিনা তা ট্র্যাক করার জন্য নতুন ফ্ল্যাগ
  const [hasAttemptedInitialSync, setHasAttemptedInitialSync] = useState(false);

  // কম্পোনেন্ট মাউন্ট হলে localStorage থেকে ফেভারিট লোড করা হচ্ছে (যদি ইউজার লগইন না থাকে)
  useEffect(() => {
    if (!user) {
      // যদি কোনো ইউজার না থাকে, localStorage থেকে ফেভারিট লোড করা হচ্ছে
      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites);
      // console.log("localStorage থেকে লোড করা ফেভারিটস:", savedFavorites); // ডিবাগিং লগ
    }
  }, [user]); // user পরিবর্তনের সাথে সাথে useEffect রান হবে

  // ইউজার লগইন করলে ডেটাবেসের সাথে ফেভারিট সিঙ্ক করা হচ্ছে
  useEffect(() => {
    // user বিদ্যমান থাকলে এবং প্রাথমিক সিঙ্ক চেষ্টা করা না হয়ে থাকলে সিঙ্ক শুরু করা হবে
    if (user && !hasAttemptedInitialSync) {
      const syncFavorites = async () => {
        setIsSyncing(true); // সিঙ্ক শুরু হয়েছে চিহ্নিত করা হচ্ছে
        try {
          const savedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

          // localStorage-এ কোনো ফেভারিট বিদ্যমান থাকলে সেগুলোকে ডেটাবেসে সংরক্ষণ করা হচ্ছে
          if (savedFavorites.length > 0) {
            console.log("ডেটাবেসের সাথে ফেভারিট সিঙ্ক করা হচ্ছে..."); // ডিবাগিং লগ
            const response = await fetch(`${URL}/favorites/addFavorite`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`, // অথরাইজেশন হেডারে টোকেন অন্তর্ভুক্ত করা হচ্ছে
              },
              body: JSON.stringify({
                userId: user.data.id,
                favorites: savedFavorites, // localStorage থেকে সব ফেভারিট একসাথে পাঠানো হচ্ছে
              }),
            });

            if (response.ok) {
              localStorage.removeItem("favorites"); // সিঙ্ক করার পর localStorage পরিষ্কার করা হচ্ছে

              const dbFavorites = await response.json();
              setFavorites(dbFavorites); // ডেটাবেস থেকে প্রাপ্ত ফেভারিট দিয়ে স্টেট আপডেট করা হচ্ছে
              toast.success("ফেভারিটস ডেটাবেসের সাথে সিঙ্ক করা হয়েছে!"); // সাফল্যের টোস্ট
            } else {
              // সার্ভার ত্রুটি বা অন্যান্য ব্যর্থতার জন্য টোস্ট
              toast.error(
                "ডেটাবেসের সাথে ফেভারিট সিঙ্ক করতে ব্যর্থ! অনুগ্রহ করে আবার চেষ্টা করুন।",
              );
              console.error(
                "ডেটাবেসের সাথে ফেভারিট সিঙ্ক করার সময় ত্রুটি:",
                response,
              ); // ডিবাগিং লগ
            }
          }
          // যদি localStorage-এ কোনো ফেভারিট না থাকে, ডেটাবেস থেকে লোড করার চেষ্টা করা হচ্ছে
          else {
            const response = await fetch(`${URL}/favorites/${user.id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`, // অথরাইজেশন হেডারে টোকেন অন্তর্ভুক্ত করা হচ্ছে
              },
            });
            if (response.ok) {
              const dbFavorites = await response.json();
              setFavorites(dbFavorites.favorites || []); // নিশ্চিত করা হচ্ছে যে favorites একটি অ্যারে
            } else {
              toast.error("ডেটাবেস থেকে ফেভারিট লোড করতে ব্যর্থ!"); // ত্রুটির টোস্ট (GET এর জন্য)
              console.error("ডেটাবেস থেকে ফেভারিট লোড করতে ব্যর্থ:", response);
            }
          }
        } catch (error) {
          console.error(
            "ডেটাবেসের সাথে ফেভারিট সিঙ্ক করার সময় ত্রুটি:",
            error,
          );
          toast.error(
            "ডেটাবেসের সাথে ফেভারিট সিঙ্ক করার সময় নেটওয়ার্ক ত্রুটি!",
          ); // নেটওয়ার্ক ত্রুটির জন্য টোস্ট
        } finally {
          setIsSyncing(false); // সিঙ্ক প্রক্রিয়া শেষ হয়েছে চিহ্নিত করা হচ্ছে
          setHasAttemptedInitialSync(true); // প্রাথমিক সিঙ্ক চেষ্টা করা হয়েছে চিহ্নিত করা হচ্ছে
        }
      };

      syncFavorites(); // সিঙ্ক ফাংশন কল করা হচ্ছে
    }
  }, [user, hasAttemptedInitialSync]); // user এবং hasAttemptedInitialSync পরিবর্তনের সাথে সাথে useEffect রান হবে

  // localStorage থেকে টোকেন পাওয়ার ফাংশন
  const getToken = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.data?.token; // localStorage থেকে userInfo এর মধ্যে থাকা টোকেনটি নেওয়া হচ্ছে
  };

  // ফেভারিট টগল করার ফাংশন (যোগ/মুছে ফেলা)
  const toggleFavorite = async (itemId) => {
    if (!user) {
      // যদি ইউজার লগইন না থাকে, ফেভারিট localStorage-এ সংরক্ষণ করা হচ্ছে
      const updatedFavorites = [...favorites];
      const index = updatedFavorites.indexOf(itemId);

      if (index !== -1) {
        updatedFavorites.splice(index, 1); // ফেভারিট থেকে মুছে ফেলা হচ্ছে
        toast.info("ফেভারিট থেকে সরানো হয়েছে"); // ইনফো টোস্ট
        console.log(
          `প্রপার্টি আইডি ${itemId} localStorage ফেভারিট থেকে সরানো হয়েছে`,
        ); // ডিবাগিং লগ
      } else {
        updatedFavorites.push(itemId); // ফেভারিট যোগ করা হচ্ছে
        toast.success("ফেভারিটে যোগ করা হয়েছে"); // সাফল্যের টোস্ট
        console.log(
          `প্রপার্টি আইডি ${itemId} localStorage ফেভারিটে যোগ করা হয়েছে`,
        ); // ডিবাগিং লগ
      }

      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // localStorage আপডেট করা হচ্ছে
    } else {
      // যদি ইউজার লগইন থাকে, ডেটাবেসে সংরক্ষণ করা হচ্ছে
      try {
        const response = await fetch(`${URL}/favorites/addFavorite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`, // অথরাইজেশন হেডারে টোকেন অন্তর্ভুক্ত করা হচ্ছে
          },
          body: JSON.stringify({ userId: user.data.id, propertyId: itemId }), // ইউজার আইডি এবং প্রপার্টি আইডি পাঠানো হচ্ছে
        });

        if (response.ok) {
          // ডেটাবেস থেকে আপডেটেড ফেভারিটস লোড করা হচ্ছে
          const fetchResponse = await fetch(`${URL}/favorites/${user.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          });

          if (fetchResponse.ok) {
            const dbFavorites = await fetchResponse.json();
            setFavorites(dbFavorites.favorites || []); // নিশ্চিত করা হচ্ছে যে favorites একটি অ্যারে
            const isCurrentlyFavorite = (dbFavorites.favorites || []).includes(
              itemId,
            );

            if (isCurrentlyFavorite) {
              toast.success("ফেভারিটে যোগ করা হয়েছে");
              console.log(
                `প্রপার্টি আইডি ${itemId} ডেটাবেস ফেভারিটে যোগ করা হয়েছে`,
              );
            } else {
              toast.info("ফেভারিট থেকে সরানো হয়েছে");
              console.log(
                `প্রপার্টি আইডি ${itemId} ডেটাবেস ফেভারিট থেকে সরানো হয়েছে`,
              );
            }
          } else {
            toast.error("ফেভারিট স্ট্যাটাস রিফ্রেশ করতে ব্যর্থ!");
            console.error(
              "ফেভারিট স্ট্যাটাস রিফ্রেশ করার সময় ত্রুটি:",
              fetchResponse,
            );
          }
        } else {
          // এখানে 500 এর জন্য আরও নির্দিষ্ট বার্তা যোগ করা হয়েছে
          if (response.status === 500) {
            toast.error(
              "সার্ভার ত্রুটি: ফেভারিট আপডেট করা যায়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
            );
            console.error(
              "সার্ভার ত্রুটি: ফেভারিট আপডেট করতে ব্যর্থ (500):",
              response,
            );
          } else {
            toast.error("ডেটাবেসে ফেভারিট আপডেট করতে ব্যর্থ"); // অন্যান্য HTTP ত্রুটির জন্য
            console.error("ফেভারিট আপডেট করতে ব্যর্থ:", response); // ডিবাগিং লগ
          }
        }
      } catch (error) {
        console.error(
          "ডেটাবেসে ফেভারিট আপডেট করার সময় নেটওয়ার্ক ত্রুটি:",
          error,
        );
        toast.error("ফেভারিট আপডেট করার সময় নেটওয়ার্ক ত্রুটি!"); // নেটওয়ার্ক ত্রুটির জন্য টোস্ট
      }
    }
  };

  // চাইল্ড কম্পোনেন্টগুলোতে ফেভারিট ডেটা এবং টগল ফাংশন সরবরাহ করা হচ্ছে
  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

// FavoriteContext ব্যবহার করার জন্য কাস্টম হুক
export const useFavorites = () => useContext(FavoriteContext);
