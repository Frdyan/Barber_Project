import { useState } from "react";
import Services from "../components/HomePage/Services";
import HairArtist from "../components/HomePage/HairArtist";
import BookingForm from "../components/BookingPage/BookingForm";

const BookingPage = () => {
  const [step, setStep] = useState(1); // Langkah aktif
  const [selectedService, setSelectedService] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 px-4">
      {step === 1 && (
        <Services
          onSelectService={(service) => {
            setSelectedService(service); // Simpan service yang dipilih
            handleNextStep(); // Pindah ke langkah berikutnya
          }}
        />
      )}

      {step === 2 && (
        <HairArtist
          onSelectArtist={(artist) => {
            setSelectedArtist(artist); // Simpan artist yang dipilih
            handleNextStep(); // Pindah ke langkah berikutnya
          }}
        />
      )}

      {step === 3 && (
        <BookingForm
          selectedService={selectedService}
          selectedArtist={selectedArtist}
          onGoBack={handlePrevStep}
        />
      )}
    </div>
  );
};

export default BookingPage;
