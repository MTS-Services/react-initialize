import { useContext, useEffect, useRef, useState } from 'react';
import {
  FiHome,
  FiInfo,
  FiLogIn,
  FiLogOut,
  FiMail,
  FiMenu,
  FiUser,
  FiUserPlus,
  FiX,
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import logo from '/flags.png';

function MainHeader() {
  const { user, logOutUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownTimer = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimer.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500);
  };

  const logOutHandler = () => {
    logOutUser();
    toast.success('Logged out successfully');
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md  backdrop-blur-2xl ' : 'bg-black/10 '
      }`}
    >
      <div className='max-w-[1300px] mx-auto px-4 py-3 flex items-center justify-between'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2'>
          <img src={logo} alt='Logo' className='w-10 h-10 object-contain' />
          <span className='text-xl font-bold text-white'>MyApp</span>
        </Link>

        {/* Desktop Menu */}
        <nav className='hidden md:flex items-center gap-6 text-white font-medium text-shadow-2xs'>
          <MenuLink to='/'>Home</MenuLink>
          <MenuLink to='/about'>About</MenuLink>
          <MenuLink to='/contact'>Contact</MenuLink>
        </nav>

        {/* Right Side */}
        <div className='flex items-center gap-4'>
          <LanguageSwitcher />

          {/* Desktop Profile Dropdown */}
          <div
            className='relative hidden md:block'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className='flex items-center justify-center w-9 h-9 rounded-full bg-white text-black border border-gray-300 hover:shadow-md transition'>
              <FiUser className='text-xl' />
            </button>

            {isDropdownOpen && (
              <div className='absolute right-0 top-12 w-44 bg-white text-black border border-gray-200 rounded-md shadow-md z-50'>
                {user ? (
                  <>
                    <DropdownItem to='/profile' icon={<FiUser />}>
                      Profile
                    </DropdownItem>
                    <button
                      onClick={logOutHandler}
                      className='w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-blue-600 hover:text-white transition'
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <DropdownItem to='/login' icon={<FiLogIn />}>
                      Login
                    </DropdownItem>
                    <DropdownItem to='/register' icon={<FiUserPlus />}>
                      Sign Up
                    </DropdownItem>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <button
            className='md:hidden text-white text-2xl'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div className='md:hidden bg-black/90 text-white px-6 py-4 space-y-4 absolute top-[72px] w-full z-40 transition-all duration-300'>
          <MenuLink to='/' icon={<FiHome />} onClick={() => setMenuOpen(false)}>
            Home
          </MenuLink>
          <MenuLink
            to='/about'
            icon={<FiInfo />}
            onClick={() => setMenuOpen(false)}
          >
            About
          </MenuLink>
          <MenuLink
            to='/contact'
            icon={<FiMail />}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </MenuLink>
          {user ? (
            <>
              <MenuLink
                to='/profile'
                icon={<FiUser />}
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </MenuLink>
              <button
                onClick={() => {
                  logOutHandler();
                  setMenuOpen(false);
                }}
                className='flex items-center gap-2 w-full hover:text-[var(--color-primary)]'
              >
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <>
              <MenuLink
                to='/login'
                icon={<FiLogIn />}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </MenuLink>
              <MenuLink
                to='/register'
                icon={<FiUserPlus />}
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </MenuLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}

// 🔁 Reusable Menu Link
const MenuLink = ({ to, icon, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className='flex text-lg font-secondary items-center gap-2 hover:text-[var(--color-primary)] transition'
  >
    {icon}
    {children}
  </Link>
);

// 🔁 Reusable Dropdown Item
const DropdownItem = ({ to, icon, children }) => (
  <Link
    to={to}
    className='flex items-center gap-2 px-4 py-2 hover:bg-blue-600 hover:text-white transition'
  >
    {icon}
    {children}
  </Link>
);

export default MainHeader;
