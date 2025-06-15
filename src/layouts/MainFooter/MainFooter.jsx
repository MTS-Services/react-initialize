import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

const linkItem = [
  'Alkmaar',
  'Almere',
  'Amersfoort',
  'Amstelveen',
  'Amsterdam',
  'Arnhem',
  'Breda',
  'Delft',
  'Den Haag',
  'Eindhoven',
  'Enschede',
  'Groningen',
  'Hilversume',
  'Haarlem',
  'Leeuwarden',
  'Leiden',
  'Maastricht',
  'Nieuwegein',
  'Nijmegen',
  'Rotterdam',
  'Tilburg',
  'Utrecht',
  'Zwolle',
];

const MainFooter = () => {
  return (
    <>
      <div
        className='w-full h-[400px] bg-cover bg-center bg-no-repeat relative'
        style={{ backgroundImage: "url('/footer-up.jpg')" }} // 🔁 Replace with your image path
      >
        {/* Overlay */}
        <div className='absolute inset-0 bg-purple-900/60 backdrop-brightness-75'></div>

        {/* Content */}
        <div className='relative z-10 h-full flex justify-center items-center px-6 md:px-20'>
          <div className='max-w-2xl flex flex-col items-center text-center gap-8'>
            <h2 className='text-white text-3xl md:text-5xl font-semibold font-lato capitalize leading-tight'>
              Register and view our 20,000+ rental properties
            </h2>
            <p className='text-zinc-100 text-base md:text-lg font-inter leading-relaxed'>
              We have a large collection of affordable rental properties to
              which new properties are added every day. Don't wait any longer
              and start searching.
            </p>
            <button className='px-6 py-3 md:px-8 md:py-4 bg-gradient-to-l from-yellow-600 to-yellow-500 rounded-full text-white font-medium text-base cursor-pointer'>
              Start Searching
            </button>
          </div>
        </div>
      </div>

      <footer className='w-full bg-blue-950 py-16 px-6 md:px-20 text-white'>
        <div className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12'>
          {/* Logo & Description */}
          <div className='flex flex-col gap-6'>
            <img src='/Logo2.png' alt='logo' className='w-54' />
            <p className=' text-white/80'>
              Receive emails with rentals that meet your requirements.
            </p>
            <div className='flex gap-3 '>
              <FaFacebookF
                size={40}
                className='cursor-pointer bg-gray-100 rounded-full p-1.5 shadow text-gray-800 hover:bg-gray-400 transition-all'
              />
              <FaTwitter
                size={40}
                className='cursor-pointer bg-gray-100 rounded-full p-1.5 shadow text-gray-800 hover:bg-gray-400 transition-all'
              />
              <FaInstagram
                size={40}
                className='cursor-pointer bg-gray-100 rounded-full p-1.5 shadow text-gray-800 hover:bg-gray-400 transition-all'
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className='text-lg font-semibold mb-4'>Quick</h2>
            <ul className='space-y-2  text-white/90'>
              <li className='hover:text-gray-600 cursor-pointer'>Home</li>
              <li className='hover:text-gray-600 cursor-pointer'>About</li>
              <li className='hover:text-gray-600 cursor-pointer'>Price</li>
              <li className='hover:text-gray-600 cursor-pointer'>
                How does it work?
              </li>
              <li className='hover:text-gray-600 cursor-pointer'>Contact</li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h2 className='text-lg font-semibold mb-4'>Company</h2>
            <ul className='space-y-2  text-white/90'>
              <li className='hover:text-gray-600 cursor-pointer'>
                Terms & Conditions
              </li>
              <li className='hover:text-gray-600 cursor-pointer'>Privacy</li>
              <li className='hover:text-gray-600 cursor-pointer'>
                Cookie Policy
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className='flex flex-col gap-4'>
            <p className='text-white '>
              Get the latest information about properties from “NL property”.
            </p>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full p-3  text-gray-700 rounded bg-neutral-100'
            />
            <button className='w-full py-3 bg-gradient-to-l from-yellow-600 to-yellow-500 rounded text-white font-medium cursor-pointer'>
              Subscribe
            </button>
          </div>
        </div>

        {/* Cities */}
        <div className='max-w-screen-xl mx-auto mt-16'>
          <h3 className='text-center text-xl font-semibold mb-4'>
            Popular cities
          </h3>
          <div className='flex flex-wrap justify-center gap-4  text-white/80 '>
            {linkItem.map((city) => (
              <span key={city} className=' hover:text-gray-600 cursor-pointer'>
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='border-t border-white/10 mt-12 pt-6  flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto text-white/60'>
          <p>© 2025 NL Property. All rights reserved.</p>
          <div className='flex gap-6 mt-4 md:mt-0'>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
