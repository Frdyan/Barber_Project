const Contact = () => {
  return (
    <div
        id="contact-us"
        className="bg-cover bg-center py-12 px-6 text-center scroll-mt-20"
        style={{
          backgroundImage: `url('src/assets/images/BG-About.png')`,
        }}
      >
        {/* Overlay (optional) */}
        <div className=" bg-opacity-50 p-8 rounded-lg">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            CONTACT OUR BARBER NOW
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
            (406) 555-0120
            </p>
          </div>
        </div>
      </div>
  )
}

export default Contact
