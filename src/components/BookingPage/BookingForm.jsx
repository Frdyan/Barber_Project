import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";

const BookingForm = ({ selectedService, selectedArtist, onGoBack }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };

  const generateTimes = () => {
    const isWeekend = selectedDate.day() === 0 || selectedDate.day() === 6;
    const startHour = 9;
    const endHour = isWeekend ? 18 : 21;
    const times = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      times.push(`${hour}:00`);
    }
    return times;
  };

  const times = generateTimes();

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleBookingAttempt = () => {
    if (!selectedTime) {
      setError('Please select a time');
      return;
    }

    if (!isLoggedIn()) {
      const bookingData = {
        service_id: selectedService.service_id,
        service_name: selectedService.service_name,
        barber_id: selectedArtist.barber_id,
        barber_name: selectedArtist.name,
        booking_date: selectedDate.format('YYYY-MM-DD'),
        booking_time: selectedTime,
      };
      localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
      navigate('/login');
      return;
    }

    processBooking();
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/', { 
      state: { 
        bookingDetails: bookingDetails
      }
    });
  };

  const processBooking = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      const bookingData = {
        user_id: user.user_id,
        service_id: selectedService.service_id,
        barber_id: selectedArtist.barber_id,
        booking_date: selectedDate.format('YYYY-MM-DD'),
        booking_time: selectedTime,
        status: "pending"
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(bookingData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Booking failed');
      }

      localStorage.removeItem('pendingBooking');

      const details = {
        ...bookingData,
        service: selectedService.service_name,
        artist: selectedArtist.name,
        id: responseData.booking_id
      };
      setBookingDetails(details);
      
      setShowSuccessModal(true);
      
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="h-screen flex flex-col justify-center items-center px-4">
        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                Booking Successful!
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Your appointment has been successfully booked with {selectedArtist.name} 
                for {selectedService.service_name} on {selectedDate.format('MMMM D, YYYY')} 
                at {selectedTime}.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleSuccessClose}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Selected Service & Artist Info */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full max-w-md">
          <h4 className="font-semibold text-gray-800 mb-2">Booking Details</h4>
          <p className="text-gray-600">Service: {selectedService?.service_name}</p>
          <p className="text-gray-600">Artist: {selectedArtist?.name}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h6 className="text-base md:text-lg font-semibold text-gray-700">
              {selectedDate.format("ddd, MMM D")}
            </h6>
            <button>
              <EditIcon className="text-red-500" />
            </button>
          </div>

          <DatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            textField={(params) => (
              <input {...params.inputProps} type="hidden" className="hidden" />
            )}
          />

          <div className="flex flex-wrap gap-4 mt-4">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeClick(time)}
                className={`w-20 rounded-full border px-4 py-2 text-sm font-medium transition-all 
                  ${selectedTime === time
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-red-500 border-gray-300 hover:bg-red-500 hover:text-white"
                  }`}
              >
                {time}
              </button>
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-4">{error}</p>
          )}

          <div className="flex justify-between items-center mt-6">
            <button 
              onClick={onGoBack}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Back
            </button>
            <button 
              onClick={handleBookingAttempt}
              disabled={isLoading || !selectedTime}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md text-sm hover:bg-blue-600
                ${(isLoading || !selectedTime) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

BookingForm.propTypes = {
  selectedService: PropTypes.shape({
    service_id: PropTypes.number.isRequired,
    service_name: PropTypes.string.isRequired,
  }).isRequired,
  selectedArtist: PropTypes.shape({
    barber_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onGoBack: PropTypes.func.isRequired,
};

export default BookingForm;