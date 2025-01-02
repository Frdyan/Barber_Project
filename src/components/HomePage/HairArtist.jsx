import { Link } from "react-router-dom";
const HairArtist = () => {
  return (
    <div id="hair-artist" className="py-12 px-6 text-center bg-white scroll-mt-20">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-orange-700 mb-6">HAIR ARTISTS</h2>

      {/* Hair Artist Profiles */}
      <div className="flex justify-center items-center gap-8">
        {/* Artist 1 */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-auto overflow-hidden rounded-md shadow-md">
            <img
              src="src/assets/images/profile-1.jpg" 
              alt="Shane"
              className="w-full h-full object-cover transform transition-all duration-300 hover:scale-110"
            />
          </div>
          <p className="text-lg font-semibold text-blue-900 mt-4">Shane</p>
        </div>

        {/* Artist 2 */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-auto overflow-hidden rounded-md shadow-md">
            <img
              src="src/assets/images/profile-2.jpg" 
              alt="Debra"
              className="w-full h-full object-cover transform transition-all duration-300 hover:scale-110"
            />
          </div>
          <p className="text-lg font-semibold text-blue-900 mt-4">Debra</p>
        </div>

        {/* Artist 3 */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-auto overflow-hidden rounded-md shadow-md">
            <img
              src="src/assets/images/profile-3.jpg" 
              alt="Ann"
              className="w-full h-full object-cover transform transition-all duration-300 hover:scale-110"
            />
          </div>
          <p className="text-lg font-semibold text-blue-900 mt-4">Ann</p>
        </div>
      </div>

      {/* Book Button */}
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

export default HairArtist;
