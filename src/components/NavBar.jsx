import { useState, useEffect } from "react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        setIsScrolled(heroBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition-height duration-300 ${
        isScrolled ? "h-auto bg-gray-100 shadow-md" : "h-0"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="src/assets/images/Barber_Logo.svg"
            alt="Logo"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#hero"
            className="text-orange-700 hover:text-red-600 relative group transition-colors duration-300"
          >
            HOME
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#services"
            className="text-orange-700 hover:text-red-600 relative group transition-colors duration-300"
          >
            SERVICES
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#hair-artist"
            className="text-orange-700 hover:text-red-600 relative group transition-colors duration-300"
          >
            HAIR ARTIST
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#about-us"
            className="text-orange-700 hover:text-red-600 relative group transition-colors duration-300"
          >
            ABOUT US
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#contact-us"
            className="text-orange-700 hover:text-red-600 relative group transition-colors duration-300"
          >
            CONTACT US
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition duration-300">
            SIGN UP
          </button>
          <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition duration-300">
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
