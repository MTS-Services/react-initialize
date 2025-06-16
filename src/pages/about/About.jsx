import React, { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

const faqData = [
  {
    question: 'How often do you search rental websites?',
    answer:
      'Every 2 minutes our search bots scour the internet to find your ideal rental.',
  },
  {
    question: 'How many websites do you search?',
    answer:
      'We search over 100 trusted rental platforms across multiple countries.',
  },
  {
    question: 'In which cities do you search?',
    answer:
      'We currently cover 50+ major cities including New York, Amsterdam, Berlin, and London.',
  },
  {
    question: 'Will there be extra costs if I have found a home?',
    answer:
      'No. Once you’ve found a home, you won’t be charged any additional fees.',
  },
  {
    question: 'What if I have found a home?',
    answer:
      'You can pause or cancel your search anytime through your dashboard.',
  },
];

const About = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className='w-full flex flex-col'>
      {/* === Background Section === */}
      <div className='relative w-full h-[611px]'>
        {/* Background Image */}
        <img
          src='/howworks.jpg'
          alt='House'
          className='absolute inset-0 w-full h-full object-cover'
        />

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 to-black/60' />

        {/* Centered Content */}
        <div className='relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white'>
          <h1 className='max-w-[676px] text-4xl md:text-6xl font-semibold font-lato capitalize mb-6'>
            How Renting Works On Our Platform
          </h1>
          <p className='max-w-[676px] text-base font-normal font-inter leading-normal'>
            Discover and compare rental options from trusted companies all in
            one place. Browse listings, choose what suits you best, and book
            directly. We make it simple, secure, and seamless. A small service
            fee may apply.
          </p>
        </div>
      </div>

      {/* === Why Choose Us Section === */}
      <div className='w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-16 gap-12'>
        {/* Left Text Block */}
        <div className='w-full lg:w-1/2 space-y-6'>
          <h2 className='text-gray-900 text-4xl font-semibold font-lato capitalize'>
            Why Choose US
          </h2>
          <p className='text-gray-700 text-base font-normal font-inter leading-relaxed'>
            Finding the right rental shouldn’t be stressful. That’s why we bring
            together listings from multiple trusted companies in one simple
            platform — so you can compare, choose, and book with confidence.
            With transparent pricing, verified partners, and dedicated support,
            we make the rental experience smooth, secure, and tailored to your
            needs.
          </p>
          <button className='cursor-pointer bg-gradient-to-l from-yellow-600 to-yellow-500 text-white text-base font-medium font-poppins px-6 py-3 rounded'>
            Explore your home
          </button>
        </div>

        {/* Right Image with Custom Clip Path */}
        <div className='w-full max-w-[589px] h-[491px]'>
          <svg
            viewBox='0 0 589 491'
            className='w-full h-full'
            xmlns='http://www.w3.org/2000/svg'
          >
            <defs>
              <clipPath id='customShape' clipPathUnits='userSpaceOnUse'>
                <path
                  d='
                M20,0 
                H589 
                V471 
                A20,20 0 0 1 569,491 
                H20 
                A20,20 0 0 1 0,471 
                V140 
                Q0,90 50,90 
                Q120,90 120,20 
                Q120,0 170,0 
                Z
              '
                />
              </clipPath>
            </defs>
            <image
              href='/works.jpg'
              width='589'
              height='491'
              clipPath='url(#customShape)'
              preserveAspectRatio='xMidYMid slice'
            />
          </svg>
        </div>
      </div>

      {/* === FAQ Section === */}
      <div className='w-full px-4 md:px-12 lg:px-24 py-16 bg-white'>
        <h2 className='text-center text-4xl font-semibold font-lato text-black mb-10'>
          FAQ
        </h2>
        <div className='max-w-4xl mx-auto divide-y divide-gray-200'>
          {faqData.map((item, index) => (
            <div key={index} className='py-4'>
              <button
                onClick={() => toggle(index)}
                className='w-full flex justify-between items-center text-left'
              >
                <span className='text-lg font-bold text-black font-inter'>
                  {item.question}
                </span>
                <span className='text-xl text-black'>
                  {openIndex === index ? <FiX /> : <FiPlus />}
                </span>
              </button>
              {openIndex === index && (
                <p className='mt-4 text-gray-600 text-base font-inter leading-relaxed'>
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
