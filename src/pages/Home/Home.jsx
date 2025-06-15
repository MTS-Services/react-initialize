// ✅ Home.jsx (FULL CODE with enhancements)
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { FiDollarSign, FiMapPin, FiSearch } from 'react-icons/fi';
import { TfiRulerAlt2 } from 'react-icons/tfi';
import { LiaBedSolid } from 'react-icons/lia';
import { LuHeart } from 'react-icons/lu';
// import CityCard from '../../components/CityCard/CityCard';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const properties = [
  {
    id: 1,
    title: 'Spacious Family Home',
    address: '251 SW 6th Ln Florida City. FL',
    image: '/home/Family.jpg',
    beds: 4,
    size: '1200 sq Ft',
    oldPrice: '€2,800/mo',
    newPrice: '€1,900/mo',
  },
  {
    id: 2,
    title: 'Modern Loft Apartment',
    address: '100 Main Street, NY',
    image: '/home/Family-1.jpg',
    beds: 2,
    size: '850 sq Ft',
    oldPrice: '€1,500/mo',
    newPrice: '€1,100/mo',
  },
  {
    id: 3,
    title: 'Cozy Suburban House',
    address: '18 Hillside Rd, TX',
    image: '/home/Family-2.jpg',
    beds: 3,
    size: '960 sq Ft',
    oldPrice: '€2,000/mo',
    newPrice: '€1,600/mo',
  },
  {
    id: 4,
    title: 'Downtown Studio',
    address: '45 Broadway, CA',
    image: '/home/Family-3.jpg',
    beds: 1,
    size: '600 sq Ft',
    oldPrice: '€1,200/mo',
    newPrice: '€950/mo',
  },
];

const cities = [
  {
    name: 'Amsterdam',
    props: '801+ Properties',
    img: '/hero/amsterdam.png',
  },
  {
    name: 'Rotterdam',
    props: '801+ Properties',
    img: '/hero/rotterdam.png',
  },
  {
    name: 'The Hague',
    props: '801+ Properties',
    img: '/hero/Hague.png',
  },
  {
    name: 'Utrecht',
    props: '801+ Properties',
    img: '/hero/utrech.png',
  },
  {
    name: 'Eindhoven',
    props: '1000+ Properties',
    img: '/hero/utrech.png',
  },
  {
    name: 'Maastricht',
    props: '801+ Properties',
    img: '/hero/maastricht.png',
  },
  {
    name: 'Groningen',
    props: '801+ Properties',
    img: '/hero/groningen.png',
  },
];

export default function Home() {
  const [listings, setListings] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/properties')
      .then((res) => res.json())
      .then((data) => {
        console.log('main data', data);
        setListings(data.data.properties);
      });
  }, []);

  // HANDLE SEARCH
  const handleSearch = () => {
    navigate(`/listings?address=${query}&min=${minPrice}&max=${maxPrice}`);
  };

  // HANDLE LOCATION
  const handleLocationInput = (value) => {
    setQuery(value);
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

  // HANDLE CITY SELECT
  const handleCitySelect = (location) => {
    setQuery(location);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const leftCities = cities.slice(0, 4);
  const eindhoven = cities.find((c) => c.name === 'Eindhoven');
  const rightCities = cities.slice(5);

  return (
    <div>
      {/* Hero Section */}
      <section
        className='relative h-[550px] bg-cover bg-center'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1558036117-15d82a90b9b1)',
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-white/5 to-black/70 z-10'></div>
        <div className='relative z-20 h-full flex items-center justify-center'>
          <div className='max-w-[1300px] mx-auto px-4'>
            <div className='p-6 rounded-lg shadow-xl'>
              <div className='flex flex-col md:flex-row gap-3 justify-center items-center'>
                <h1 className='text-5xl text-center font-bold text-white/90'>
                  Rent Your Property Easily In
                  <br />
                  <span className='text-[#F6BC09]'>The Netherlands</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className='relative -top-14 z-20'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row gap-3 justify-center items-center '>
            <div className='relative w-full '>
              <FiMapPin className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Search Address...'
                value={query}
                onChange={(e) => handleLocationInput(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className='w-full h-16 pl-10 pr-4 py-2 rounded-lg shadow bg-white focus:outline-none'
              />
              {showSuggestions && query.trim() !== '' && (
                <ul className='absolute z-10 top-[100%] left-0 w-full mt-1 bg-white border border-gray-200 rounded shadow max-h-80 overflow-y-auto text-sm'>
                  {suggestions.length > 0 ? (
                    suggestions.map((s, i) => (
                      <li
                        key={i}
                        className='px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-1'
                        onClick={() => handleCitySelect(s)}
                      >
                        <FiMapPin />
                        <span>{s}</span>
                      </li>
                    ))
                  ) : (
                    <li className='px-4 py-2 text-gray-500'>
                      No listings found
                    </li>
                  )}
                </ul>
              )}
            </div>

            <div className='relative w-full md:w-60'>
              <FiDollarSign className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                type='number'
                placeholder='Min Price'
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className='w-full h-16 pl-10 pr-4 py-2 rounded-lg shadow bg-white focus:outline-none'
              />
            </div>

            <div className='relative w-full md:w-60'>
              <FiDollarSign className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                type='number'
                placeholder='Max Price'
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className='w-full h-16 pl-10 pr-4 py-2 rounded-lg shadow bg-white focus:outline-none'
              />
            </div>

            <button
              onClick={handleSearch}
              className='flex items-center gap-2 bg-blue-600 text-white px-6 py-5 rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer'
            >
              <FiSearch /> Search
            </button>
          </div>
        </div>
      </section>

      <div className='w-full bg-white py-16 px-4 md:px-10 lg:px-20'>
        <h2 className=' text-center text-4xl font-semibold text-cyan-950 font-lato capitalize mb-3'>
          Popular Cities
        </h2>
        <p className=' text-center text-base text-black font-inter leading-normal'>
          Discover the perfect place to live in the most popular cities of the
          Netherlands
        </p>
      </div>

      {/* Popular Cities */}
      <section className='flex gap-6 w-full max-w-7xl mx-auto'>
        {/* Left: 2x2 Grid */}
        <div className='grid grid-cols-2 gap-4 flex-1'>
          {leftCities.map((city, i) => (
            <div
              key={i}
              className='relative rounded overflow-hidden group h-64'
            >
              <img
                className='w-full h-full object-cover'
                src={city.img}
                alt={city.name}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40  p-3 flex flex-col justify-end'>
                <h3 className='text-white text-lg font-semibold'>
                  {city.name}
                </h3>
                <p className='text-white text-sm'>{city.props}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Center: Eindhoven */}
        <div className='flex-1 max-w-[400px]'>
          <div className='relative rounded overflow-hidden group h-full min-h-[370px]'>
            <img
              src={eindhoven.img}
              className='w-full h-full object-cover'
              alt={eindhoven.name}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 p-4 flex flex-col justify-end'>
              <h3 className='text-white text-xl font-semibold'>
                {eindhoven.name}
              </h3>
              <p className='text-white text-sm'>{eindhoven.props}</p>
            </div>
          </div>
        </div>

        {/* Right: 2 stacked boxes */}
        <div className='flex flex-col gap-4 flex-1 max-w-[400px]'>
          {rightCities.map((city, i) => (
            <div
              key={i}
              className='relative rounded overflow-hidden group h-64'
            >
              <img
                src={city.img}
                className='w-full h-full object-cover'
                alt={city.name}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 p-3 flex flex-col justify-end'>
                <h3 className='text-white text-lg font-semibold'>
                  {city.name}
                </h3>
                <p className='text-white text-sm'>{city.props}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About US Section */}
      <section className='w-full bg-white py-32 px-4 md:px-10 lg:px-20'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Text Section */}
          <div>
            <p className='text-blue-700 text-sm font-inter mb-2'>About us</p>
            <h2 className='text-3xl md:text-4xl font-semibold text-neutral-900 font-lato capitalize mb-6'>
              Driven by Trust, Defined by Results
            </h2>
            <p className='text-base text-neutral-600 font-inter leading-relaxed mb-6'>
              At NL Property, we believe that finding a rental home in the
              Netherlands should be simple, honest, and stress-free. That’s why
              we’ve created a platform that’s fully focused on renters—no
              agents, no complicated steps, no hidden fees.
              <br />
              <br />
              Whether you're moving for work, study, or just looking for a new
              place to call home, we’re here to make that journey easier. Our
              goal is to help you find verified rental listings with clear
              details, fair pricing, and no surprises. You won’t find fake ads
              or outdated listings—only real homes that are truly available.
            </p>
            <button className='bg-gradient-to-l from-yellow-600 to-yellow-500 text-white font-poppins font-medium text-base px-6 py-3 rounded shadow hover:scale-105 transition-transform'>
              Learn More
            </button>
          </div>

          {/* Image Grid */}
          <div className='grid grid-cols-2 gap-4'>
            <div className=''>
              <img
                src='/about/about-1.jpg'
                alt='Decor 1'
                className='rounded-lg w-full h-auto '
              />
              <img
                src='/about/about-2.jpg'
                alt='Decor 2'
                className='rounded-lg w-full h-auto object-cover mt-4'
              />
            </div>

            <div>
              <img
                src='/about/about-3.jpg'
                alt='Decor 3'
                className='rounded-lg w-full h-auto '
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent property Section */}
      <section className='w-full bg-slate-50 py-32 overflow-hidden relative'>
        {/* Decorative background images */}
        <div className='hidden lg:block'>
          <img
            className='absolute right-0 top-0 rotate-90 transform origin-top-right'
            src='/png-wing.png'
            alt=''
            style={{ width: '928px', height: '257px' }}
          />
          <img
            className='absolute left-0 bottom-0 -rotate-90 transform origin-bottom-left'
            src='/png-wing.png'
            alt=''
            style={{ width: '928px', height: '257px' }}
          />
        </div>

        {/* Main content */}
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-12 max-w-2xl mx-auto'>
            <h2 className='text-4xl font-semibold text-cyan-950 font-lato capitalize mb-3'>
              Recent gevonden
            </h2>
            <p className='text-base text-black font-inter leading-normal'>
              Betaalbare woningen die we recent hebben gevonden
            </p>
          </div>

          {/* Property Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 '>
            {properties.map((property) => (
              <div
                key={property.id}
                className='rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer'
              >
                {/* Image & Tags */}
                <div className='h-44 relative'>
                  <img
                    className='w-full h-full object-cover'
                    src={property.image}
                    alt='Property'
                  />
                  <div className='absolute top-4 left-4 right-4 flex justify-between'>
                    <span className='px-2.5 py-2 bg-blue-700/90 rounded text-white text-xs font-poppins shadow'>
                      FEATURED
                    </span>
                    <span className='px-2.5 py-2 bg-cyan-950/90 rounded text-white text-xs font-poppins shadow'>
                      FOR SALE
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className='bg-white p-6'>
                  <div className='mb-4'>
                    <h3 className='text-sm font-semibold text-cyan-950 font-dm-sans mb-1'>
                      {property.title}
                    </h3>
                    <p className='text-sm text-neutral-400 font-dm-sans'>
                      {property.address}
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
                        {property.beds} Beds
                      </span>
                    </div>

                    <div className='text-center'>
                      <div className='flex justify-center mb-1'>
                        {/* Area Icon */}
                        <TfiRulerAlt2 />
                      </div>
                      <span className='text-sm text-neutral-400 font-dm-sans'>
                        {property.size}
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className='border-t border-neutral-400 border-opacity-40 pt-4 flex justify-between items-center'>
                    <div className='text-right'>
                      <div className='text-sm text-neutral-400 font-dm-sans line-through'>
                        {property.oldPrice}
                      </div>
                      <div className='text-sm text-cyan-950 font-semibold font-dm-sans'>
                        {property.newPrice}
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
      </section>

      {/* How to Works Section */}
      <section className='relative w-full overflow-hidden py-20 my-32 bg-[linear-gradient(90deg,_#FFFEEB,_#E9F6FF)] '>
        {/* Decorative Rotated Images */}
        <img
          className='w-[928px] h-64 absolute -left-[464px] top-0 rotate-90'
          src='/png-wing-2.png'
          alt='decor-top'
        />
        <img
          className='w-[928px] h-64 absolute -right-[404px] bottom-0 -rotate-90'
          src='/png-wing-2.png'
          alt='decor-bottom'
        />
        <img
          className='absolute left-1/2 top-0 -translate-x-1/2 w-[875px] h-[654px] object-contain'
          src='/png-wing-2.png'
          alt='main-illustration'
        />

        {/* Content */}
        <div className='relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-12'>
          {/* Header */}
          <div className='text-center space-y-2'>
            <h2 className='text-4xl font-semibold font-lato capitalize text-black'>
              Hoe werkt het?
            </h2>
            <p className='text-base font-normal font-inter text-black'>
              Homes that we have just discovered
            </p>
          </div>

          {/* Steps */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
            {[
              {
                title: 'Aanmelden',
                desc: 'Maak in een paar minuten jouw account aan en start direct met zoeken.',
              },
              {
                title: 'Woning zoeken',
                desc: 'Vind jouw droomwoning in je favoriete stad met onze handige zoekfilters.',
              },
              {
                title: 'Blijf op de hoogte',
                desc: 'Nog niet gevonden wat je zocht? Je ontvangt dagelijks of wekelijks nieuwe huurwoningen in je inbox.',
              },
              {
                title: 'Verhuizen maar',
                desc: 'Reageer, plan een bezichtiging en begin vast met inpakken. Jouw nieuwe woning wacht op je!',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className='bg-white rounded-lg px-6 py-8 flex flex-col items-center gap-4 shadow-sm'
              >
                <div className='w-14 h-14 bg-yellow-500 rounded flex items-center justify-center text-white text-2xl font-medium font-lato'>
                  {idx + 1}
                </div>
                <div className='text-center space-y-2'>
                  <h3 className='text-xl font-semibold font-lato text-black capitalize'>
                    {step.title}
                  </h3>
                  <p className=' font-normal font-inter text-black'>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
