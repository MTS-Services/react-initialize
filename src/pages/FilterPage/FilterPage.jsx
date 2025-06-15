import { useContext, useEffect, useState } from 'react';
import {
  FiArrowDown,
  FiClock,
  FiDollarSign,
  FiGrid,
  FiHome,
  FiLayers,
  FiMap,
  FiMapPin,
  FiSliders,
} from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReactSlider from 'react-slider';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import ReantCard from '../../common/ReantCard';

// ✅ Clean numeric price parser
const cleanPrice = (priceStr) => {
  if (!priceStr) return 0;
  const raw = priceStr.replace(/[^\d.,]/g, '').replace(',', '.');
  const normalized = raw.replace(/\.(?=.*\.)/, '').replace(',', '.');
  return parseFloat(normalized);
};

export default function FilterPage() {
  const { user } = useContext(AuthContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [rooms, setRooms] = useState('');
  const [surface, setSurface] = useState('');

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedListings = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3000/api/properties')
      .then((res) => res.json())
      .then((data) => {
        const processedListings = data.data.properties.map((l) => ({
          ...l,
          numericPrice: cleanPrice(l.price),
        }));

        setListings(processedListings);

        const city = params.get('address') || '';
        const min = parseInt(params.get('min')) || 0;
        const max = parseInt(params.get('max')) || 10000;

        setLocation(city);
        setMinPrice(min);
        setMaxPrice(max);

        const filteredData = processedListings.filter((l) => {
          const locMatch =
            !city || l.location.toLowerCase().includes(city.toLowerCase());
          const priceMatch = l.numericPrice >= min && l.numericPrice <= max;
          return locMatch && priceMatch;
        });

        setFiltered(filteredData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params]);

  useEffect(() => {
    applyFilters();
  }, [location, minPrice, maxPrice, rooms, surface]);

  const handleLocationInput = (value) => {
    setLocation(value);
    setShowSuggestions(true);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }
    const citySet = [...new Set(listings.map((l) => l.location))];
    const matches = citySet.filter((c) =>
      c.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleCitySelect = (location) => {
    setLocation(location);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const applyFilters = () => {
    const filteredData = listings.filter((l) => {
      const locMatch =
        !location || l.location.toLowerCase().includes(location.toLowerCase());
      const priceMatch =
        l.numericPrice >= minPrice && l.numericPrice <= maxPrice;
      const roomMatch = !rooms || l.rooms === parseInt(rooms);
      const surfaceMatch = !surface || l.surface >= parseInt(surface);
      return locMatch && priceMatch && roomMatch && surfaceMatch;
    });

    setFiltered(filteredData);
    setCurrentPage(1); // reset pagination
  };

  const handleListingClick = (id) => {
    navigate(`/listings/${id}`);
  };

  const uniqueRooms = [...new Set(listings.map((l) => l.rooms))].sort(
    (a, b) => a - b
  );

  // Skeleton loader for listings
  const renderSkeletonListings = () => {
    return Array(itemsPerPage)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className='flex bg-white rounded-lg shadow overflow-hidden'
        >
          <div className='w-2/3 h-[270px]'>
            <Skeleton height='100%' />
          </div>
          <div className='w-2/2 p-4 flex flex-col justify-between'>
            <div className='flex flex-col gap-1 flex-grow'>
              <Skeleton height={24} width='70%' />

              <Skeleton count={3} height={14} />
              <Skeleton height={16} width='40%' />
              <div className='flex gap-4 mt-4'>
                <Skeleton width={100} height={30} />
                <Skeleton width={100} height={30} />
              </div>
            </div>
            <div className='mt-4'>
              <Skeleton height={24} width='100%' className='mt-1' />
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className='w-full min-h-screen'>
      <header
        className='h-[300px] bg-cover bg-center relative'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1599423300746-b62533397364)',
        }}
      >
        <div className='absolute inset-0 bg-black/60 flex items-center justify-center'>
          <h1 className='text-white text-4xl font-bold drop-shadow-md'>
            Explore Rental Listings in Netherlands
          </h1>
        </div>
      </header>

      <div className='max-w-[1300px] mx-auto flex mt-6 px-4'>
        {/* Sidebar Filters */}
        <aside className='w-1/4 space-y-4 p-4'>
          <h2 className='text-xl font-bold mb-2 flex items-center gap-2'>
            <FiGrid /> Filters
          </h2>

          {/* Location Filter */}
          <div className='bg-white rounded-lg shadow-sm p-3 relative'>
            <div className='flex items-center gap-2 mb-2 text-sm font-medium text-gray-600'>
              <FiMapPin /> Location
            </div>
            <input
              type='text'
              placeholder='Enter city'
              value={location}
              onChange={(e) => handleLocationInput(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className='w-full p-2 rounded bg-gray-50 border border-gray-200 text-sm'
            />
            {showSuggestions && location.trim() !== '' && (
              <ul className='absolute z-10 top-[100%] left-0 w-full mt-1 bg-white border rounded shadow max-h-40 overflow-y-auto text-sm'>
                {suggestions.length > 0 ? (
                  suggestions.map((s, i) => (
                    <li
                      key={i}
                      className='px-4 py-2 hover:bg-blue-100 cursor-pointer'
                      onClick={() => handleCitySelect(s)}
                    >
                      {s}
                    </li>
                  ))
                ) : (
                  <li className='px-4 py-2 text-gray-500'>No listings found</li>
                )}
              </ul>
            )}
          </div>

          {/* Price Range Filter */}
          <div className='bg-white rounded-lg shadow-sm p-3'>
            <div className='flex items-center gap-2 mb-2 text-sm font-medium text-gray-600'>
              <FiDollarSign /> Price Range
            </div>
            <div className='flex gap-2 mb-4'>
              <input
                type='number'
                placeholder='Min'
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice - 100))
                }
                className='w-1/2 p-2 rounded bg-gray-50 border border-gray-200 text-sm'
              />
              <input
                type='number'
                placeholder='Max'
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice + 100))
                }
                className='w-1/2 p-2 rounded bg-gray-50 border border-gray-200 text-sm'
              />
            </div>
            <ReactSlider
              className='w-full h-2 bg-gray-200 rounded'
              thumbClassName='h-4 w-4 rounded-full bg-blue-600 cursor-pointer'
              trackClassName='bg-blue-500 h-2 rounded'
              min={0}
              max={10000}
              step={100}
              value={[minPrice, maxPrice]}
              onChange={([min, max]) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              withTracks={true}
              pearling
              minDistance={100}
            />
          </div>

          {/* Rooms Filter */}
          <div className='bg-white rounded-lg shadow-sm p-3'>
            <div className='flex items-center gap-2 mb-2 text-sm font-medium text-gray-600'>
              <FiHome /> Rooms
            </div>
            <div className='flex flex-wrap gap-2'>
              {isLoading ? (
                <Skeleton
                  count={3}
                  height={30}
                  width={70}
                  inline
                  containerClassName='flex gap-2'
                />
              ) : (
                uniqueRooms.map((r) => (
                  <label
                    key={r}
                    className={`cursor-pointer text-sm px-3 py-1 rounded-full border ${
                      rooms == r
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <input
                      type='radio'
                      value={r}
                      checked={rooms == r}
                      onChange={(e) => setRooms(e.target.value)}
                      className='hidden'
                    />
                    {r} Room{r > 1 && 's'}
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Surface Filter */}
          <div className='bg-white rounded-lg shadow-sm p-3'>
            <div className='flex items-center gap-2 mb-2 text-sm font-medium text-gray-600'>
              <FiSliders /> Min Surface (m²)
            </div>
            <input
              type='number'
              placeholder='e.g. 50'
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              className='w-full p-2 rounded bg-gray-50 border border-gray-200 text-sm'
            />
          </div>
        </aside>

        {/* Listings + Pagination */}
        <div className='w-3/4 p-4 grid gap-6'>
          {isLoading ? (
            renderSkeletonListings()
          ) : (
            <>
              {paginatedListings.map((listing) => (
                <div
                  key={listing.id}
                  className='w-full h-72 p-4 bg-white rounded-xl shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12)] hover:shadow-md transition cursor-pointer'
                  onClick={() => handleListingClick(listing.id)}
                >
                  <div className='w-full flex gap-6'>
                    {/* Image */}
                    <div className='w-96 h-64 rounded-lg overflow-hidden relative'>
                      <img
                        src={
                          listing?.media?.[0]?.url ||
                          'https://via.placeholder.com/384x256?text=No+Image'
                        }
                        alt={listing.title}
                        className='w-full h-full object-cover'
                        onError={(e) => {
                          e.target.src =
                            'https://via.placeholder.com/384x256?text=No+Image';
                        }}
                      />
                      <div className='absolute top-4 right-4 w-9 h-9 p-2 bg-white rounded-full shadow border-t border-zinc-900/5 flex justify-center items-center'>
                        <div className='w-4 h-4 text-blue-700'>
                          <svg viewBox='0 0 24 24' fill='currentColor'>
                            <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='flex-1 flex flex-col justify-between'>
                      <div className='space-y-2'>
                        {/* Title and time */}
                        <div className='flex justify-between items-center'>
                          <h3 className='text-xl font-semibold text-black capitalize'>
                            {listing.title.slice(8, 40)}...
                          </h3>
                          <div className='flex items-center gap-1.5 text-blue-700 text-xs'>
                            <FiClock />
                            4:50PM
                          </div>
                        </div>

                        {/* Description */}
                        <p className='text-sm text-gray-600 line-clamp-3'>
                          {listing.description || 'No description available'}
                        </p>

                        {/* Features */}
                        <div className='flex gap-4'>
                          <div className='px-2 py-1.5 bg-gray-100 rounded-full inline-flex items-center gap-1.5'>
                            <FiLayers className='text-gray-700' />
                            <span className='text-xs text-gray-700'>
                              {listing.surface}m<sup>2</sup>
                            </span>
                          </div>
                          <div className='px-2 py-1.5 bg-gray-100 rounded-full inline-flex items-center gap-1.5'>
                            <FiArrowDown className='text-gray-700' />
                            <span className='text-xs text-gray-700'>
                              {listing.rooms}{' '}
                              {listing.rooms > 1 ? 'rooms' : 'room'}
                            </span>
                          </div>
                        </div>

                        {/* Location and price */}
                        <div className='flex justify-between items-center'>
                          <div className='px-2 py-1.5 bg-gray-100 rounded-full inline-flex items-center gap-1.5'>
                            <FiMap className='text-gray-700' />
                            <span className='text-xs text-gray-700'>
                              {listing.location || 'Location not specified'}
                            </span>
                          </div>
                          <div className='text-xl font-semibold text-blue-700 capitalize'>
                            € {listing.numericPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <div className='w-full max-h-12 px-6 py-3 bg-gradient-to-l from-yellow-600 to-yellow-500 rounded flex justify-center items-center'>
                        <span className='text-white text-base font-medium'>
                          Bekijk de woning
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination Buttons */}
              {totalPages > 1 && (
                <div className='flex justify-center mt-6 gap-2 flex-wrap'>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded border ${
                          pageNum === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-blue-600 border-blue-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
