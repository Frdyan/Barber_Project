const Address = () => {
  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
      {/* Google Maps Section */}
      <h2 className="text-2xl font-bold text-center mb-4">Our Location</h2>
      <div
        className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg relative overflow-hidden"
        
      >
        <a
          href="https://goo.gl/maps/example"
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden"
        >
          <img
            src="src/assets/images/OurLocation.jpg"
            alt="Google Maps Location"
            className="w-full h-64 sm:h-80 nd:h-96 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            style={{ height: '400px' }}
          />
        </a>
      </div>

      {/* Address and Opening Hours Section */}
      <h2 className="text-2xl font-bold text-center mt-12 mb-6">
        Contact Details
      </h2>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg"
      style={{
        backgroundImage: `url('src/assets/images/BG-About.png')`,
      }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Address</h3>
            <p className="text-gray-600">775 Rolling Green Rd.</p>
          </div>

          {/* Opening Hours Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Opening Hours
            </h3>
            <ul className="text-gray-600">
              <li>Monday: 9 AM - 9 PM</li>
              <li>Tuesday: 9 AM - 9 PM</li>
              <li>Wednesday: 9 AM - 9 PM</li>
              <li>Thursday: 9 AM - 9 PM</li>
              <li>Friday: 9 AM - 9 PM</li>
              <li>Saturday: 9 AM - 6 PM</li>
              <li>Sunday: 9 AM - 6 PM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
