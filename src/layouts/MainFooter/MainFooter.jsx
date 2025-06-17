import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const linkItem = [
  "Alkmaar",
  "Almere",
  "Amersfoort",
  "Amstelveen",
  "Amsterdam",
  "Arnhem",
  "Breda",
  "Delft",
  "Den Haag",
  "Eindhoven",
  "Enschede",
  "Groningen",
  "Hilversume",
  "Haarlem",
  "Leeuwarden",
  "Leiden",
  "Maastricht",
  "Nieuwegein",
  "Nijmegen",
  "Rotterdam",
  "Tilburg",
  "Utrecht",
  "Zwolle",
];

const MainFooter = () => {
  return (
    <>
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat py-24"
        style={{ backgroundImage: "url('/footer-up.jpg')" }} // 🔁 Replace with your image path
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-purple-900/50 backdrop-brightness-75"></div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 md:px-20">
          <div className="flex max-w-2xl flex-col items-center gap-8 text-center">
            <h2 className="leading-tight text-white capitalize md:text-5xl">
              Register and view our
              <span className="text-[#F6BC09]"> 20,000+ </span> rental
              properties
            </h2>
            <p className="leading-relaxed text-zinc-100 md:text-lg">
              We have a large collection of affordable rental properties to
              which new properties are added every day. Don't wait any longer
              and start searching.
            </p>
            <button className="cursor-pointer rounded-full bg-gradient-to-l from-yellow-600 to-yellow-500 px-6 py-3 text-base font-medium text-white md:px-8 md:py-4">
              Start Searching
            </button>
          </div>
        </div>
      </div>

      <footer className="w-full bg-blue-950 lg:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="flex flex-col gap-6">
            <img src="/Logo.png" alt="logo" className="w-32" />
            <p className="text-white/80">
              Receive emails with rentals that meet your requirements.
            </p>
            <div className="flex gap-3">
              <FaFacebookF
                size={40}
                className="cursor-pointer rounded-full bg-gray-100 p-1.5 text-gray-800 shadow transition-all hover:bg-gray-400"
              />
              <FaTwitter
                size={40}
                className="cursor-pointer rounded-full bg-gray-100 p-1.5 text-gray-800 shadow transition-all hover:bg-gray-400"
              />
              <FaInstagram
                size={40}
                className="cursor-pointer rounded-full bg-gray-100 p-1.5 text-gray-800 shadow transition-all hover:bg-gray-400"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-white">Quick</h3>
            <ul className="space-y-2 text-white/90">
              <li className="cursor-pointer hover:text-gray-600">Home</li>
              <li className="cursor-pointer hover:text-gray-600">About</li>
              <li className="cursor-pointer hover:text-gray-600">Price</li>
              <li className="cursor-pointer hover:text-gray-600">
                How does it work?
              </li>
              <li className="cursor-pointer hover:text-gray-600">Contact</li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-white/90">
              <li className="cursor-pointer hover:text-gray-600">
                Terms & Conditions
              </li>
              <li className="cursor-pointer hover:text-gray-600">Privacy</li>
              <li className="cursor-pointer hover:text-gray-600">
                Cookie Policy
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <p className="text-white">
              Get the latest information about properties from “NL property”.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded bg-neutral-100 p-3 text-gray-700"
            />
            <button className="w-full cursor-pointer rounded bg-gradient-to-l from-yellow-600 to-yellow-500 py-3 font-medium text-white">
              Subscribe
            </button>
          </div>
        </div>

        {/* Cities */}
        <div className="mx-auto mt-16 max-w-screen-xl">
          <h3 className="mb-4 text-center text-white">Popular cities</h3>
          <div className="flex flex-wrap justify-center gap-4 text-white/80">
            {linkItem.map((city) => (
              <span key={city} className="cursor-pointer hover:text-gray-600">
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mx-auto mt-12 flex max-w-screen-xl flex-col items-center justify-between border-t border-white/10 pt-6 text-white/60 md:flex-row">
          <p className="">© 2025 NL Property. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
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
