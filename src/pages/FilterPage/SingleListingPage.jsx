import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiHeart,
  FiShare2,
  FiMapPin,
  FiLayers,
  FiHome,
  FiClock,
  FiPhone,
  FiMail,
} from 'react-icons/fi';
import { LiaBedSolid } from 'react-icons/lia';
import { TfiRulerAlt2 } from 'react-icons/tfi';
import { LuHeart } from 'react-icons/lu';

const SingleListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [recent, setRecent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch single listing
        const listingRes = await fetch(
          `http://localhost:3000/api/properties/${id}`
        );
        const listingData = await listingRes.json();

        setListing(listingData.data.property);

        // Fetch recent listings (excluding current one)
        const recentRes = await fetch('http://localhost:3000/api/properties');

        const recentData = await recentRes.json();

        const filteredRecent = recentData.data.properties
          .filter((item) => item.id !== parseInt(id))
          .slice(0, 4);
        setRecent(filteredRecent);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatPrice = (price) => {
    if (!price) return '€ -';
    return `€ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  if (isLoading) {
    return (
      <div className=' inset-0 flex justify-center items-center bg-white h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-4 border-blue-900 border-t-transparent'></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className='max-w-7xl mx-auto p-10 text-center h-screen flex justify-center items-center'>
        <div>
          <h2 className='text-2xl font-bold mb-4'>Listing not found</h2>
          <button
            onClick={() => navigate(-1)}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className='relative w-full h-96'>
        {/* Background Image */}
        <img
          src='/howworks.jpg'
          alt='House'
          className='absolute inset-0 w-full h-full object-cover'
        />

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 to-black/60' />
      </div>
      <div className='max-w-7xl mx-auto py-10'>
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-blue-600 mb-6 hover:underline cursor-pointer'
        >
          <FiArrowLeft /> Go Back
        </button>

        {/* Header */}
        <div className='flex justify-between items-start mb-4'>
          <div>
            <h1 className='text-2xl md:text-3xl font-bold mb-2'>
              {listing.title}
            </h1>
            <div className='flex gap-4 items-center mb-4'>
              <div className='flex items-center gap-2 text-gray-400'>
                <FiMapPin />
                <span>{listing.location}</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='flex items-center gap-1 text-sm text-gray-400'>
                  <FiClock />
                  {new Date(listing.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className='flex gap-2'>
            <button className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
              <FiHeart className='text-gray-600 ' />
            </button>
            <button className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer'>
              <FiShare2 className='text-gray-600 ' />
            </button>
          </div>
        </div>

        {/* Price */}
        <div className='bg-blue-50 p-4 rounded-lg mb-6'>
          <p className='text-2xl font-bold text-blue-800'>{listing.price}</p>
        </div>

        {/* Image Gallery */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
          <div className='md:col-span-2'>
            <img
              src={
                listing.media?.[mainImage]?.url ||
                'https://via.placeholder.com/800x500?text=No+Image'
              }
              alt={listing.title}
              className='w-full h-96 object-cover rounded-lg'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {listing.media?.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImage(idx)}
                className='cursor-pointer'
              >
                <img
                  src={img.url}
                  alt={`Gallery ${idx}`}
                  className={`w-full h-44 object-cover rounded-lg ring ring-gray-200 ${
                    mainImage === idx ? 'ring-2 ring-gray-200' : ''
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className='grid md:grid-cols-3 gap-8'>
          {/* Details */}
          <div className='md:col-span-2'>
            <h2 className='text-xl font-bold mb-4'>Description</h2>
            <p className='text-gray-700 mb-6 whitespace-pre-line'>
              {listing.description || 'No description available.'}
            </p>

            <h2 className='text-xl font-bold mb-4'>Features</h2>
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='flex items-center gap-2 p-3 bg-gray-50 rounded-lg'>
                <FiLayers className='text-blue-600' />
                <div>
                  <p className='text-sm text-gray-500'>Surface</p>
                  <p className='font-medium'>{listing.surface} m²</p>
                </div>
              </div>
              <div className='flex items-center gap-2 p-3 bg-gray-50 rounded-lg'>
                <FiHome className='text-blue-600' />
                <div>
                  <p className='text-sm text-gray-500'>Rooms</p>
                  <p className='font-medium'>{listing.rooms}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className='bg-gray-50 p-6 rounded-lg h-fit sticky top-20'>
            <h3 className='text-xl font-bold mb-4'>Contact Agent</h3>
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center'>
                  <span className='text-blue-600 font-bold'>
                    {listing.agent?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div>
                  <p className='font-medium'>
                    {listing.agent?.name || 'Agent Name'}
                  </p>
                  <p className='text-sm text-gray-600'>Real Estate Agent</p>
                </div>
              </div>

              <div className='space-y-2'>
                <a
                  href={`tel:${listing.agent?.phone || ''}`}
                  className='flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100'
                >
                  <FiPhone className='text-blue-600' />
                  <span>
                    {listing.agent?.phone || 'Phone number not available'}
                  </span>
                </a>
                <a
                  href={`mailto:${listing.agent?.email || ''}`}
                  className='flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-100'
                >
                  <FiMail className='text-blue-600' />
                  <span>{listing.agent?.email || 'Email not available'}</span>
                </a>
              </div>

              <button className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium'>
                Schedule a Visit
              </button>
            </div>
          </div>
        </div>

        {/* Recent Listings */}
        <div className='py-20'>
          <h3 className='text-2xl font-bold mb-6'>Similar Properties</h3>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 '>
            {recent.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/listings/${item.id}`)}
                className='rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer'
              >
                <img
                  src={
                    item.media?.[0]?.url ||
                    'https://via.placeholder.com/400x300?text=No+Image'
                  }
                  alt={item.title}
                  className='w-full h-48 object-cover'
                />
                {/* Details */}
                <div className='bg-white p-6'>
                  <div className='mb-4'>
                    <h3 className='text-sm font-semibold text-cyan-950 font-dm-sans mb-1'>
                      {item.title.slice(0, 30)}...
                    </h3>
                    <p className='text-sm text-neutral-400 font-dm-sans'>
                      {item.address}
                    </p>
                  </div>

                  {/* Features */}
                  <div className='flex justify-between mb-6'>
                    <div className='text-center'>
                      <div className='flex justify-center mb-1'>
                        {/* Bed Icon */}
                        <LiaBedSolid />
                      </div>
                      <span className='text-sm text-neutral-400 font-dm-sans'>
                        {item.beds} Beds
                      </span>
                    </div>

                    <div className='text-center'>
                      <div className='flex justify-center mb-1'>
                        {/* Area Icon */}
                        <TfiRulerAlt2 />
                      </div>
                      <span className='text-sm text-neutral-400 font-dm-sans'>
                        {item.size} Area
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className='border-t border-neutral-400 border-opacity-40 pt-4 flex justify-between items-center'>
                    <div className='text-right'>
                      <div className='text-sm text-cyan-950 font-semibold font-dm-sans'>
                        {item.price}
                      </div>
                    </div>

                    <button
                      type='button'
                      aria-label='Add to favorites'
                      className='w-7 h-7 bg-gray-50 hover:bg-red-100 cursor-pointer rounded-full flex items-center justify-center'
                    >
                      <LuHeart />
                    </button>
                  </div>

                  {/* CTA */}
                  <a
                    href='#'
                    className='block mt-4 text-sm text-blue-700 hover:underline font-medium'
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleListingPage;
