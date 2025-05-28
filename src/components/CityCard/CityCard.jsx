import { useNavigate } from "react-router-dom";

export default function CityCard({ city, count, large }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/listings?city=${city}`);

  return (
    <div
      onClick={handleClick}
      className={`relative rounded-lg overflow-hidden cursor-pointer group ${
        large ? "col-span-2 h-64" : "h-40"
      }`}
    >
      <img
        src={`https://source.unsplash.com/featured/?${city}`}
        alt={city}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
        <h3 className="text-white text-lg font-bold">{city}</h3>
        <p className="text-white text-sm">{count} listings</p>
      </div>
    </div>
  );
}
