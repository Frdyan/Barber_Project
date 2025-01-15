const BarberManagementPage = () => {
  const barbers = [
    { id: '001', name: 'John Brown', bookings: 90 },
    { id: '002', name: 'Shayne Doe', bookings: 120 },
    { id: '003', name: 'Kylian Mbappe', bookings: 50 },
    { id: '004', name: 'Karim Benzema', bookings: 40 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-xl font-semibold mb-6">Barber</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-3 text-gray-600">ID</th>
              <th className="px-4 py-3 text-gray-600">Hair Artist</th>
              <th className="px-4 py-3 text-gray-600">Jumlah Booking</th>
            </tr>
          </thead>
          <tbody>
            {barbers.map((barber, index) => (
              <tr 
                key={barber.id}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="px-4 py-3">{barber.id}</td>
                <td className="px-4 py-3">{barber.name}</td>
                <td className="px-4 py-3">{barber.bookings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BarberManagementPage;