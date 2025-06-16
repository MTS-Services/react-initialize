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

      {/* How to Works Section */}
      <section className='relative w-full overflow-hidden py-16  bg-[linear-gradient(90deg,_#FFFEEB,_#E9F6FF)] '>
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
                className='bg-white rounded-lg px-6 py-16 flex flex-col items-center gap-4 shadow-sm '
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

      {/* === Why Choose Us Section === */}
      <div className='w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-16 gap-12'>
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
          <img src='/public/works.png' width='589' height='491' />
        </div>
      </div>

      {/* === FAQ Section === */}
      <div className='w-full py-16 md:px-12 lg:px-24 bg-white'>
        <h2 className='text-center text-4xl font-semibold font-lato text-black mb-8'>
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
