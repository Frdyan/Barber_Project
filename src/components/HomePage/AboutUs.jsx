const AboutUs = () => {
    return (
      <div
        id="about-us"
        className="bg-cover bg-center py-12 px-6 text-center scroll-mt-20"
        style={{
          backgroundImage: `url('src/assets/images/BG-About.png')`, // Ganti dengan path gambar Anda
        }}
      >
        {/* Overlay (optional, jika ingin teks lebih terlihat) */}
        <div className=" bg-opacity-50 p-8 rounded-lg">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            ABOUT OUR BARBER
          </h2>
  
          {/* Decorative Element in the Middle */}
          <div className="mb-6 flex justify-center items-center">
            <span className="h-1 w-16 bg-blue-900"></span>
            <span className="mx-2 text-white text-xl">✂️</span>
            <span className="h-1 w-16 bg-blue-900"></span>
          </div>
  
          {/* Description */}
          <div className="max-w-3xl mx-auto text-blue-900 leading-relaxed text-lg md:text-xl">
            <p className="mb-4">
              Welcome to our barbershop, a place where tradition meets innovation. Our team of skilled barbers brings years of experience, providing exceptional haircuts tailored to your style.
            </p>
            <p>
              Whether you need a classic cut or a modern look, we are committed to ensuring every client leaves with confidence and satisfaction. Your style is our priority.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutUs;
  