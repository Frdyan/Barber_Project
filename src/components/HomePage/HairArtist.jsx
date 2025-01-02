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
              src="src/assets/images/profile-1.jpg" // Ganti dengan URL gambar Shane
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
              src="src/assets/images/profile-2.jpg" // Ganti dengan URL gambar Debra
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
              src="src/assets/images/profile-3.jpg" // Ganti dengan URL gambar Ann
              alt="Ann"
              className="w-full h-full object-cover transform transition-all duration-300 hover:scale-110"
            />
          </div>
          <p className="text-lg font-semibold text-blue-900 mt-4">Ann</p>
        </div>
      </div>

      {/* Book Button */}
      <div className="mt-8">
        <button className="bg-red-700 hover:bg-red-900 text-white py-2 px-6 rounded-full shadow-lg">
          Book
        </button>
      </div>
    </div>
  );
};

export default HairArtist;