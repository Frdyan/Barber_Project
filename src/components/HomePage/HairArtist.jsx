import { Link, useLocation } from "react-router-dom";

const HairArtist = ({ onSelectArtist }) => {
  const artists = ["Shane", "Debra", "Ann"];

  return (
    <div
      id="hair-artist"
      className="py-12 px-6 text-center bg-white scroll-mt-20"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-orange-700 mb-6">
        HAIR ARTISTS
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {artists.map((artist) => (
          <div
            key={artist}
            onClick={() => onSelectArtist(artist)} // Panggil fungsi ini saat dipilih
            className="flex flex-col items-center w-40 sm:w-48 cursor-pointer"
          >
            <div className="w-full h-auto overflow-hidden rounded-md shadow-md">
              <img
                src={`src/assets/images/profile-${artist.toLowerCase()}.jpg`}
                alt={artist}
                className="w-full h-full object-cover transform transition-all duration-300 hover:scale-110"
              />
            </div>
            <p className="text-lg font-semibold text-blue-900 mt-4">{artist}</p>
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

export default HairArtist;
