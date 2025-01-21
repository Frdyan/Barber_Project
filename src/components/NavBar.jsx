import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const NavBar = ({ user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        const heroElement = document.getElementById("hero");
        if (heroElement) {
          const heroBottom = heroElement.getBoundingClientRect().bottom;
          setIsScrolled(heroBottom < 0);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [location]);

  const isHomePage = location.pathname === "/";

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={`sticky top-0 z-50 transition-height duration-300 ${
        isScrolled ? "h-auto bg-gray-100 shadow-md" : "h-0"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="src/assets/images/Barber_Logo.svg"
              alt="Logo"
              className="w-20 h-20 object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        {isHomePage && (
          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => handleScrollToSection("hero")}
              className="text-orange-700 hover:text-red-600 relative group transition-colors duration-300"
            >
              HOME
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => handleScrollToSection("services")}
              className="text-orange-700 hover:text-red-600 relative group transition-colors duration-300"
            >
              SERVICES
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => handleScrollToSection("hair-artist")}
              className="text-orange-700 hover:text-red-600 relative group transition-colors duration-300"
            >
              HAIR ARTIST
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => handleScrollToSection("about-us")}
              className="text-orange-700 hover:text-red-600 relative group transition-colors duration-300"
            >
              ABOUT US
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => handleScrollToSection("contact-us")}
              className="text-orange-700 hover:text-red-600 relative group transition-colors duration-300"
            >
              CONTACT US
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>
        )}

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-orange-700 font-medium px-4 py-2 bg-orange-100 rounded-md">
                {user.fullname || 'User'}
              </span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-300"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default NavBar;