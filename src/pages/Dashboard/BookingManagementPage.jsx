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

const ActionButtons = ({ status, onConfirm, onCancel, disabled }) => {
  if (status === 'DONE') {
    return (
      <button 
        disabled
        className="px-4 py-1 rounded-full text-sm bg-green-500 text-white opacity-50 cursor-not-allowed"
      >
        Completed
      </button>
    );
  }

  if (status === 'CANCELLED') {
    return (
      <button 
        disabled
        className="px-4 py-1 rounded-full text-sm bg-red-500 text-white opacity-50 cursor-not-allowed"
      >
        Cancelled
      </button>
    );
  }

  return (
    <div className="flex space-x-2">
      <button 
        onClick={onConfirm}
        disabled={disabled}
        className="px-4 py-1 rounded-full text-sm bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirm
      </button>
      <button 
        onClick={onCancel}
        disabled={disabled}
        className="px-4 py-1 rounded-full text-sm bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>
    </div>
  );
};

const BookingSummary = ({ bookings }) => {
  const summary = bookings.reduce((acc, booking) => {
    // Normalize status to uppercase for consistent counting
    const status = booking.status.toUpperCase();
    
    // Count 'ONGOING' as 'PENDING'
    if (status === 'ONGOING') {
      acc['PENDING'] = (acc['PENDING'] || 0) + 1;
    } else {
      acc[status] = (acc[status] || 0) + 1;
    }
    
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

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

const BookingManagementPage = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState({});
  const [services, setServices] = useState({});
  const [barbers, setBarbers] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingBookingId, setUpdatingBookingId] = useState(null);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchBookings = async () => {
    try {
      const bookingsRes = await fetch('/api/bookings');
      const bookingsData = await bookingsRes.json();
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to fetch bookings');
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [usersRes, servicesRes, barbersRes] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/services'),
          fetch('/api/barbers')
        ]);

        const [usersData, servicesData, barbersData] = await Promise.all([
          usersRes.json(),
          servicesRes.json(),
          barbersRes.json()
        ]);

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
        
        await fetchBookings();
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    setUpdatingBookingId(bookingId);
    setError(null);
    
    try {
      const response = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }

      await fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      setError('Failed to update booking status');
    } finally {
      setUpdatingBookingId(null);
    }
  };

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

  // Pagination calculations
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = bookings.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-xl font-semibold mb-6">Booking</h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <BookingSummary bookings={bookings} />
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Service</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Barber</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Schedule</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking, index) => (
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
                  <ActionButtons 
                    status={booking.status}
                    onConfirm={() => handleStatusUpdate(booking.booking_id, 'DONE')}
                    onCancel={() => handleStatusUpdate(booking.booking_id, 'CANCELLED')}
                    disabled={updatingBookingId === booking.booking_id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

// PropTypes
StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

ActionButtons.propTypes = {
  status: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

BookingSummary.propTypes = {
  bookings: PropTypes.array.isRequired,
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default BookingManagementPage;