import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const Services = ({ onSelectService }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services', {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch services');
        }

        const data = await response.json();
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };


    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div id="services" className="bg-beige py-12 scroll-mt-20">
        <h2 className="text-center text-3xl font-bold text-orange-700 mb-8">
          Loading Services...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div id="services" className="bg-beige py-12 scroll-mt-20">
        <p className="text-red-600 text-center">Error: {error}</p>
      </div>
    );
  }

  return (
    <div id="services" className="bg-beige py-12 scroll-mt-20">
      <h2 className="text-center text-3xl font-bold text-orange-700 mb-8">
        SERVICES
      </h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
        {services.map((service) => (
          <div
            key={service.service_id}
            onClick={() => onSelectService(service)}
            className="flex flex-col items-center group hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="bg-white p-10 rounded-full shadow-md group-hover:bg-orange-100 transition-colors duration-300">
              <img
                src="src/assets/images/Barber Shop Comb and Scissors.svg"
                alt={service.service_name}
                className="w-16 h-16"
              />
            </div>
            <p className="text-center font-semibold text-blue-900 mt-4 text-lg">
              {service.service_name}
            </p>
          </div>
        ))}
      </div>

      {location.pathname !== "/booking" && (
        <div className="mt-8 text-center">
          <Link to="/booking">
            <button className="bg-red-700 hover:bg-red-900 text-white py-3 px-8 rounded-full shadow-lg text-lg transition-transform duration-300 hover:scale-105">
              Book
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

Services.propTypes = {
  onSelectService: PropTypes.func.isRequired
};

export default Services;