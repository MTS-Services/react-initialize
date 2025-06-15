import React from 'react';

const userData = {
  name: 'James Roy',
  email: 'james@example.com',
  phone: '+880 1234 567890',
  avatar: '/avatar.png',
  role: 'Frontend Developer',
  bio: 'Passionate about building user-centric web apps with React and Tailwind CSS.',
  joined: 'January 2024',
};

const ProfilePage = () => {
  return (
    <section
      className='min-h-screen bg-gradient-to-tr from-white via-blue-50 to-blue-100 px-4 py-16'
      style={{ fontFamily: 'var(--font-secondary)' }}
    >
      {/* Background Cover */}
      <div
        className='relative bg-cover bg-center h-60 rounded-3xl shadow-md mb-[-4rem]'
        style={{ backgroundImage: `url('/city-Denver.jpg')` }}
      ></div>

      {/* Profile Card */}
      <div className='relative z-10 w-full max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-6 md:p-10 mt-[-3rem] flex flex-col md:flex-row items-center gap-10'>
        {/* Avatar */}
        <div className='flex-shrink-0'>
          <img
            src='/profile.jpg'
            alt='Profile'
            className='w-auto h-40 rounded-full border-4 border-white shadow-md object-cover'
          />
        </div>

        {/* Info Section */}
        <div className='flex-1 w-full space-y-4'>
          <div className='text-center md:text-left'>
            <h2 className='text-3xl font-bold text-[#19398A]'>
              {userData.name}
            </h2>
            <p className='text-gray-500 text-lg font-medium'>{userData.role}</p>
          </div>

          <div className='text-gray-700 space-y-2 text-sm md:text-base'>
            <p>
              <span className='font-semibold'>Email:</span> {userData.email}
            </p>
            <p>
              <span className='font-semibold'>Phone:</span> {userData.phone}
            </p>
            <p>
              <span className='font-semibold'>Joined:</span> {userData.joined}
            </p>
          </div>

          <div>
            <h4 className='text-[#19398A] font-semibold mb-1'>About</h4>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
              {userData.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
