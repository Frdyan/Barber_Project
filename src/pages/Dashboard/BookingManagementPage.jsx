import PropTypes from 'prop-types';

const StatusBadge = ({ status }) => {
    const styles = status === 'DONE' 
      ? 'bg-green-500 text-white' 
      : 'bg-yellow-300 text-yellow-800';
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${styles}`}>
        {status}
      </span>
    );
  };

  const ActionButton = ({ action }) => {
    const styles = action === 'Complete'
      ? 'bg-green-500 hover:bg-green-600 text-white'
      : 'bg-yellow-300 hover:bg-yellow-400 text-yellow-800';

    return (
      <button className={`px-4 py-1 rounded-full text-sm ${styles}`}>
        {action}
      </button>
    );
  };

  // Add PropTypes validation
StatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
  };
  
  ActionButton.propTypes = {
    action: PropTypes.string.isRequired,
  };

const BookingManagementPage = () => {
  const bookings = [
    {
      id: '101',
      userName: 'Jordan Peele',
      service: 'Haircut Pro',
      hairArtist: 'John Brown',
      time: '15.00-16.00',
      status: 'On Going',
      action: 'Confirm'
    },
    {
      id: '102',
      userName: 'Keegan Michael',
      service: 'Haircut(Adults)',
      hairArtist: 'Shayne Doe',
      time: '12.00-13.00',
      status: 'DONE',
      action: 'Complete'
    },
    {
      id: '103',
      userName: 'Henry Arthur',
      service: 'Haircut(Adults)',
      hairArtist: 'Shayne Doe',
      time: '11.00-12.00',
      status: 'DONE',
      action: 'Complete'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-xl font-semibold mb-6">Booking</h1>
      
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
                key={booking.id}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="px-4 py-3">{booking.id}</td>
                <td className="px-4 py-3">{booking.userName}</td>
                <td className="px-4 py-3">{booking.service}</td>
                <td className="px-4 py-3">{booking.hairArtist}</td>
                <td className="px-4 py-3">{booking.time}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-4 py-3">
                  <ActionButton action={booking.action} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagementPage;