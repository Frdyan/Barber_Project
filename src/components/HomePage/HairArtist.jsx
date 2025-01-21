import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';


const HairArtist = ({ onSelectArtist }) => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('/api/barbers', {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch barbers');
        }

        const data = await response.json();
        setArtists(data);
      } catch (err) {
        console.error('Error fetching barbers:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (isLoading) {
    return (
      <div id="hair-artist" className="py-12 px-6 text-center bg-white scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-700 mb-6">
          Loading Artists...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div id="hair-artist" className="py-12 px-6 text-center bg-white scroll-mt-20">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div id="hair-artist" className="py-12 px-6 text-center bg-white scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-bold text-orange-700 mb-6">
        HAIR ARTISTS
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {artists.map((artist) => (
          <div
            key={artist.barber_id}
            onClick={() => onSelectArtist(artist)}
            className="flex flex-col items-center w-40 sm:w-48 cursor-pointer"
          >
            <div className="w-full h-auto overflow-hidden rounded-md shadow-md">
              <img
                src={`public/profile-Shane.jpg`} // Placeholder untuk sementara
                alt={artist.name}
                className="w-full h-full object-cover transform transition-all duration-300 hover:scale-110"
              />
            </div>
            <p className="text-lg font-semibold text-blue-900 mt-4">{artist.name}</p>
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

HairArtist.propTypes = {
  onSelectArtist: PropTypes.func.isRequired
};

export default HairArtist;