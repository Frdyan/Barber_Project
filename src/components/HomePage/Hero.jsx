import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div id="hero" className="relative w-full h-[100vh] bg-gray-900 scroll-mt-20">
      {/* Background Image */}
      <img
        src="src/assets/images/Barber_Hero.jpg"
        alt="Barber Hero"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
      {/* Content */}
      <div className="absolute bottom-24 left-8 md:bottom-32 md:left-16 z-10 flex flex-col items-start text-left text-white">
        <p className="text-lg text-orange-700 md:text-2xl mb-6">Gundar Hairstyle</p>
        <h1 className="text-4xl md:text-8xl font-bold mb-4 text-amber-100 max-w-[70%]">
          OUR HAIRSTYLE MAKES YOU LOOK ELEGANT
        </h1>
        <Link to="/booking">
          <button className="min-w-[200px] py-3 bg-red-700 hover:bg-red-900 text-white rounded-md shadow-md ">
            Book
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
