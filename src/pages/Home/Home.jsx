import { useEffect, useState } from "react";

import CityCard from "../../components/CityCard/CityCard";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("fakeData.json")
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);

  const topCities = Array.from(
    listings.reduce((acc, listing) => {
      acc.set(listing.city, (acc.get(listing.city) || 0) + 1);
      return acc;
    }, new Map())
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div
        className="h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1558036117-15d82a90b9b1)",
        }}
      >
        <div className="bg-white/70 p-4 rounded-lg w-11/12 md:w-2/3">
          <SearchBar />
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6">Top Cities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topCities.map(([city, count], idx) => (
            <CityCard key={city} city={city} count={count} large={idx === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
