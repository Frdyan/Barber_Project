import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    switch(status) {
      case 'DONE':
        return 'bg-green-500 text-white';
      case 'CANCELLED':
        return 'bg-red-500 text-white';
      default:
        return 'bg-yellow-300 text-yellow-800';
    }
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(status)}`}>
      {status}
    </span>
  );
};

const ActionButton = ({ status, onActionClick }) => {
  const getActionConfig = (status) => {
    switch(status) {
      case 'DONE':
        return { text: 'Complete', style: 'bg-green-500 hover:bg-green-600 text-white' };
      case 'CANCELLED':
        return { text: 'Cancelled', style: 'bg-red-500 hover:bg-red-600 text-white' };
      default:
        return { text: 'Confirm', style: 'bg-yellow-300 hover:bg-yellow-400 text-yellow-800' };
    }
  };

  const config = getActionConfig(status);

  return (
    <button 
      onClick={onActionClick}
      className={`px-4 py-1 rounded-full text-sm ${config.style}`}
    >
      {config.text}
    </button>
  );
};

const BookingSummary = ({ bookings }) => {
  // Hitung jumlah booking untuk setiap status
  const summary = bookings.reduce((acc, booking) => {
    const status = booking.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <h3 className="text-gray-600 text-sm font-medium">Total Bookings</h3>
        <p className="text-2xl font-bold mt-2">{bookings.length}</p>
      </div>
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
        <h3 className="text-gray-600 text-sm font-medium">Completed</h3>
        <p className="text-2xl font-bold mt-2">{summary.DONE || 0}</p>
      </div>
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <h3 className="text-gray-600 text-sm font-medium">Cancelled</h3>
        <p className="text-2xl font-bold mt-2">{summary.CANCELLED || 0}</p>
      </div>
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
        <h3 className="text-gray-600 text-sm font-medium">Pending</h3>
        <p className="text-2xl font-bold mt-2">{summary.PENDING || 0}</p>
      </div>
    </div>
  );
};

const BookingManagementPage = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState({});
  const [services, setServices] = useState({});
  const [barbers, setBarbers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch all required data in parallel
        const [bookingsRes, usersRes, servicesRes, barbersRes] = await Promise.all([
          fetch('/api/bookings'),
          fetch('/api/users'),
          fetch('/api/services'),
          fetch('/api/barbers')
        ]);

        const [bookingsData, usersData, servicesData, barbersData] = await Promise.all([
          bookingsRes.json(),
          usersRes.json(),
          servicesRes.json(),
          barbersRes.json()
        ]);

        // Transform data into maps for easier lookup
        const usersMap = usersData.reduce((acc, user) => {
          acc[user.user_id] = user;
          return acc;
        }, {});

        const servicesMap = servicesData.reduce((acc, service) => {
          acc[service.service_id] = service;
          return acc;
        }, {});

        const barbersMap = barbersData.reduce((acc, barber) => {
          acc[barber.barber_id] = barber;
          return acc;
        }, {});

        setUsers(usersMap);
        setServices(servicesMap);
        setBarbers(barbersMap);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const getFormattedTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-xl font-semibold mb-6">Booking</h1>
      
      {/* Tambahkan BookingSummary */}
      <BookingSummary bookings={bookings} />
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-3 text-gray-600">ID</th>
              <th className="px-4 py-3 text-gray-600">Nama Pengguna</th>
              <th className="px-4 py-3 text-gray-600">Layanan</th>
              <th className="px-4 py-3 text-gray-600">Hair Artist</th>
              <th className="px-4 py-3 text-gray-600">Waktu Booking</th>
              <th className="px-4 py-3 text-gray-600">Status</th>
              <th className="px-4 py-3 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr 
                key={booking.booking_id}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="px-4 py-3">{booking.booking_id}</td>
                <td className="px-4 py-3">{users[booking.user_id]?.fullname || '-'}</td>
                <td className="px-4 py-3">{services[booking.service_id]?.service_name || '-'}</td>
                <td className="px-4 py-3">{barbers[booking.barber_id]?.name || '-'}</td>
                <td className="px-4 py-3">
                  {`${getFormattedTime(booking.booking_time)} (${new Date(booking.booking_date).toLocaleDateString()})`}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-4 py-3">
                  <ActionButton 
                    status={booking.status}
                    onActionClick={() => console.log('Action clicked for booking:', booking.booking_id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// PropTypes
StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

ActionButton.propTypes = {
  status: PropTypes.string.isRequired,
  onActionClick: PropTypes.func.isRequired,
};

BookingSummary.propTypes = {
  bookings: PropTypes.array.isRequired,
};

export default BookingManagementPage;