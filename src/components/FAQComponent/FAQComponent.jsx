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

const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
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
  );
};

export default FAQComponent;
