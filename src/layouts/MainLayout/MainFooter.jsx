import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

const MainFooter = () => {
  return (
    <>
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat py-10 md:py-20"
        style={{ backgroundImage: "url('/footer-up.jpg')" }}
      >
        <div className="absolute inset-0 bg-purple-900/50 backdrop-brightness-75"></div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 md:px-2">
          <div className="flex max-w-2xl flex-col items-center gap-6 text-center md:gap-8">
            <h2 className="text-2xl leading-tight font-bold text-white capitalize md:text-5xl">
              Register and view our
              <span className="text-[#3CAAFA]"> 20,000+ </span> rental
              properties
            </h2>
            <p className="text-zinc-100 md:text-lg">
              We have a large collection of affordable rental properties to
              which new properties are added every day. Don't wait any longer
              and start searching.
            </p>
            <Link to="/properties">
              <Button
                size="lg"
                variant="yellowGradient"
                className="rounded-full"
              >
                Start Searching
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="w-full bg-[#0C205A] px-4 py-10 md:py-12 lg:px-0 lg:py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img
              src="/new-logo-white.png"
              alt="logo"
              className="w-54 md:w-72"
            />
            <p className="text-white/80">
              Receive emails with rentals that meet your requirements.
            </p>
            <div className="flex gap-3">
              <FaFacebookF
                size={35}
                className="cursor-pointer rounded-full bg-gray-100 p-1.5 text-[#0278d9] shadow transition-all hover:bg-[#3CAAFA] hover:text-blue-100"
              />
              <FaTwitter
                size={35}
                className="cursor-pointer rounded-full bg-gray-100 p-1.5 text-[#0278d9] shadow transition-all hover:bg-[#3CAAFA] hover:text-blue-100"
              />
              <FaInstagram
                size={35}
                className="cursor-pointer rounded-full bg-gray-100 p-1.5 text-[#0278d9] shadow transition-all hover:bg-[#3CAAFA] hover:text-blue-100"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="px-0 md:px-10">
            <h3 className="mb-4 text-white">Quick</h3>
            <ul className="space-y-2 text-white/90">
              <li className="cursor-pointer hover:text-[#3CAAFA]">
                <Link to="/">Home</Link>
              </li>
              <li className="cursor-pointer hover:text-[#3CAAFA]">
                <Link to="about">About</Link>
              </li>
              <li className="cursor-pointer hover:text-[#3CAAFA]">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="">
            <h3 className="mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-white/90">
              <li className="cursor-pointer hover:text-[#3CAAFA]">
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
              </li>
              <li className="cursor-pointer hover:text-[#3CAAFA]">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="cursor-pointer hover:text-[#3CAAFA]">
                <Link to="/cookie-policy">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <p className="text-white">
              Get the latest information about properties from “NL property”.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded bg-neutral-100 p-3 text-gray-700"
            />
            <Button variant="yellowGradient" size="lg" className="w-full">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Cities */}
        {/* <div className="mx-auto mt-10 max-w-screen-xl md:mt-16">
          <h3 className="mb-4 text-center text-white">Popular cities</h3>
          <div className="flex flex-wrap justify-center gap-4 text-white/80">
            {linkItem.map((city) => (
              <span key={city} className="cursor-pointer hover:text-[#3CAAFA]">
                {city}
              </span>
            ))}
          </div>
        </div> */}

        {/* Footer Bottom */}
        <div className="mx-auto mt-12 flex max-w-screen-xl items-center justify-center border-t border-white/10 pt-6 text-white/60 md:flex-row">
          <p className="text-white/60">
            © 2025 NL Property. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
