import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null); // State untuk waktu yang dipilih

  // Fungsi untuk menentukan jam buka berdasarkan hari
  const generateTimes = () => {
    const isWeekend =
      selectedDate.day() === 0 || selectedDate.day() === 6; // 0 = Minggu, 6 = Sabtu
    const startHour = 9;
    const endHour = isWeekend ? 18 : 21; // 18 untuk weekend, 21 untuk weekdays
    const times = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      times.push(`${hour}:00`);
    }

    return times;
  };

  // Array jam dinamis
  const times = generateTimes();

  const handleTimeClick = (time) => {
    setSelectedTime(time); // Set waktu yang dipilih
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-[#F5ECD5] h-screen flex flex-col justify-center items-center px-4">
        {/* Header */}
        <h5 className="text-lg md:text-xl font-bold mb-4">Pilih Tanggal Booking</h5>

        {/* Calendar Container */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          {/* Selected Date Header */}
          <div className="flex justify-between items-center mb-4">
            <h6 className="text-base md:text-lg font-semibold text-gray-700">
              {selectedDate.format("ddd, MMM D")}
            </h6>
            <button>
              <EditIcon className="text-red-500" />
            </button>
          </div>

          {/* Date Picker */}
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            textField={(params) => (
              <input
                {...params.inputProps}
                type="hidden"
                className="hidden"
              />
            )}
          />

          {/* Time Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeClick(time)}
                className={`w-20 rounded-full border px-4 py-2 text-sm font-medium transition-all 
                  ${
                    selectedTime === time
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-red-500 border-gray-300 hover:bg-red-500 hover:text-white"
                  }`}
              >
                {time}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Cancel
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md text-sm hover:bg-blue-600">
              OK
            </button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default BookingForm;
