import { useNavigate } from 'react-router-dom';

export default function CityCard({ city, count, large }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/listings?city=${city}`);
  console.log('cc', city);
  return (
    <>
      <div
        onClick={handleClick}
        className={`relative rounded-lg overflow-hidden cursor-pointer group ${
          large ? 'col-span-2 h-56' : 'h-56'
        }`}
      >
        <img
          src={`/city-${city}.jpg`}
          alt={city}
          className='w-full h-full object-cover transform will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.25, 1, 0.5, 1)] group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-black/40 flex flex-col justify-end p-4'>
          <h3 className='text-white text-lg font-bold'>{city}</h3>
          <p className='text-white text-sm'>{count} listings</p>
        </div>
      </div>
    </>
  );
}
