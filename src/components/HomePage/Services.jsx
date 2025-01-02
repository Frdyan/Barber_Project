import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div id="services" className="bg-beige py-12 scroll-mt-20">
      <h2 className="text-center text-3xl font-bold text-orange-700 mb-8">SERVICES</h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
        {/* Haircut (Kids) */}
        <div className="flex flex-col items-center group hover:scale-105 transition-transform duration-300">
          <div className="bg-white p-10 rounded-full shadow-md group-hover:bg-orange-100 transition-colors duration-300">
            <img
              src="src/assets/images/Barber Shop Comb and Scissors.svg"
              alt="Haircut Kids"
              className="w-16 h-16"
            />
          </div>
          <p className="text-center font-semibold text-blue-900 mt-4 text-lg">Haircut (Kids)</p>
        </div>

        {/* Haircut (Adult) */}
        <div className="flex flex-col items-center group hover:scale-105 transition-transform duration-300">
          <div className="bg-white p-10 rounded-full shadow-md group-hover:bg-orange-100 transition-colors duration-300">
            <img
              src="src/assets/images/Barber Shop Comb and Scissors.svg"
              alt="Haircut Adult"
              className="w-16 h-16"
            />
          </div>
          <p className="text-center font-semibold text-blue-900 mt-4 text-lg">Haircut (Adult)</p>
        </div>

        {/* Haircut (Pro) */}
        <div className="flex flex-col items-center group hover:scale-105 transition-transform duration-300">
          <div className="bg-white p-10 rounded-full shadow-md group-hover:bg-orange-100 transition-colors duration-300">
            <img
              src="src/assets/images/Barber Shop Comb and Scissors.svg"
              alt="Haircut Pro"
              className="w-16 h-16"
            />
          </div>
          <p className="text-center font-semibold text-blue-900 mt-4 text-lg">Haircut Pro</p>
        </div>
      </div>

      <div className="mt-8 text-center">
      <Link to="/booking">
          <button className="bg-red-700 hover:bg-red-900 text-white py-3 px-8 rounded-full shadow-lg text-lg transition-transform duration-300 hover:scale-105">
            Book
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Services;
