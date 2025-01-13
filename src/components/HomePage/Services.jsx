const Services = ({ onSelectService }) => {
  const services = ["Haircut (Kids)", "Haircut (Adult)", "Haircut (Pro)"];

  return (
    <div id="services" className="bg-beige py-12 scroll-mt-20">
      <h2 className="text-center text-3xl font-bold text-orange-700 mb-8">SERVICES</h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
        {services.map((service) => (
          <div
            key={service}
            onClick={() => onSelectService(service)} // Pastikan ini dipanggil
            className="flex flex-col items-center group hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="bg-white p-10 rounded-full shadow-md group-hover:bg-orange-100 transition-colors duration-300">
              <img
                src="src/assets/images/Barber Shop Comb and Scissors.svg"
                alt={service}
                className="w-16 h-16"
              />
            </div>
            <p className="text-center font-semibold text-blue-900 mt-4 text-lg">{service}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;