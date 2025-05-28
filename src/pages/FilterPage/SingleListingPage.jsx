import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetch("/listings.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((l) => l.id === parseInt(id));
        const recentItems = data
          .filter((l) => l.id !== parseInt(id))
          .slice(0, 5);
        setListing(selected);
        setRecent(recentItems);
      });
  }, [id]);

  if (!listing) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
      <p className="text-gray-600 mb-2">
        {listing.location} • {listing.foundTimeAgo}
      </p>
      <p className="text-blue-700 text-xl font-semibold mb-6">
        ${listing.price}
      </p>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {listing.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Gallery ${idx}`}
            className="w-full h-40 object-cover rounded"
          />
        ))}
      </div>

      {/* Description */}
      <p className="mb-4">{listing.description}</p>
      <p className="text-sm text-gray-600">
        {listing.surface} m² • {listing.rooms} rooms
      </p>

      {/* Contact Info */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-bold mb-2">Contact Agent</h3>
        <p className="text-sm">Phone: (555) 123-4567</p>
        <p className="text-sm">Email: agent@example.com</p>
      </div>

      {/* Recent Listings Slider */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Recent Listings</h3>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {recent.map((item) => (
            <div
              key={item.id}
              className="min-w-[250px] border rounded shadow hover:shadow-md cursor-pointer"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-32 object-cover rounded-t"
              />
              <div className="p-2">
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <p className="text-xs text-gray-600">
                  {item.city} • ${item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
