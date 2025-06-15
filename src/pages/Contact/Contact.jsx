import React from 'react';

const Contact = () => {
  return (
    <div className='w-full flex flex-col'>
      {/* === Contact Section === */}
      <div className='flex flex-col lg:flex-row w-full min-h-screen'>
        {/* Left Image */}
        <div className='w-full lg:w-1/2 h-[250px] lg:h-[1000px]'>
          <img
            src='/contact-image.jpg'
            alt='contact'
            className='w-full h-full object-cover'
          />
        </div>

        {/* Right Form */}
        <div className='w-full lg:w-1/2 flex justify-center items-center px-6 lg:px-16 py-12 bg-white'>
          <form className='w-full max-w-xl space-y-6'>
            {/* Heading */}
            <div>
              <h2 className='text-4xl md:text-5xl font-semibold font-lato capitalize text-black mb-2'>
                Let’s Get In Touch
              </h2>
              <p className='text-base font-inter text-black'>
                Or just reach out manually to{' '}
                <a
                  href='mailto:hellonlproperty.com'
                  className='text-blue-700 underline'
                >
                  hellonlproperty.com
                </a>
              </p>
            </div>

            {/* Name Inputs */}
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex flex-col w-full'>
                <label className='text-sm text-black mb-1'>First Name</label>
                <input
                  type='text'
                  placeholder='Mirable'
                  className='bg-blue-50 px-4 py-3 rounded w-full'
                />
              </div>
              <div className='flex flex-col w-full'>
                <label className='text-sm text-black mb-1'>Last Name</label>
                <input
                  type='text'
                  placeholder='Lily'
                  className='bg-blue-50 px-4 py-3 rounded w-full'
                />
              </div>
            </div>

            {/* Email */}
            <div className='flex flex-col'>
              <label className='text-sm text-black mb-1'>Email Address</label>
              <input
                type='email'
                placeholder='mirablelily@gmail.com'
                className='bg-blue-50 px-4 py-3 rounded w-full'
              />
            </div>

            {/* Phone */}
            <div className='flex flex-col'>
              <label className='text-sm text-black mb-1'>Phone Number</label>
              <input
                type='tel'
                placeholder='(208) 555-0112'
                className='bg-blue-50 px-4 py-3 rounded w-full'
              />
            </div>

            {/* Message */}
            <div className='flex flex-col'>
              <label className='text-sm text-black mb-1'>Message</label>
              <textarea
                rows='4'
                placeholder='Your message here...'
                className='bg-blue-50 px-4 py-3 rounded resize-none w-full'
              />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='text-white text-base w-full max-h-12 px-6 py-3 bg-gradient-to-l from-yellow-600 to-yellow-500 rounded-[100px] inline-flex justify-center items-center gap-2.5 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed transition'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
