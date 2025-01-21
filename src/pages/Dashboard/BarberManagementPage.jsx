import { useState, useEffect } from 'react';

const BarberManagementPage = () => {
  const [barbers, setBarbers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filteredBarbers, setFilteredBarbers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch barbers dan bookings secara parallel
        const [barbersRes, bookingsRes] = await Promise.all([
          fetch('/api/barbers'),
          fetch('/api/bookings')
        ]);

        const [barbersData, bookingsData] = await Promise.all([
          barbersRes.json(),
          bookingsRes.json()
        ]);

        // Hitung total booking DONE untuk setiap barber
        const barberBookings = bookingsData.reduce((acc, booking) => {
          if (booking.status === 'DONE') {
            acc[booking.barber_id] = (acc[booking.barber_id] || 0) + 1;
          }
          return acc;
        }, {});

        // Gabungkan data barber dengan total bookings
        const barbersWithTotalCuts = barbersData.map(barber => ({
          ...barber,
          total_cuts: barberBookings[barber.barber_id] || 0
        }));

        setBarbers(barbersWithTotalCuts);
        setFilteredBarbers(barbersWithTotalCuts);
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = barbers.filter((barber) =>
      barber.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      if (sortField) {
        const fieldA = a[sortField];
        const fieldB = b[sortField];

        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return sortOrder === 'asc'
            ? fieldA.localeCompare(fieldB)
            : fieldB.localeCompare(fieldA);
        } else {
          return sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
        }
      }
      return 0;
    });

    setFilteredBarbers(sorted);
  }, [barbers, searchTerm, sortField, sortOrder]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Summary component untuk menampilkan statistik
  const BarberSummary = () => {
    const totalBarbers = barbers.length;
    const totalBookings = bookings.filter(booking => booking.status === 'DONE').length;
    const averageBookings = totalBarbers ? Math.round(totalBookings / totalBarbers) : 0;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
          <h3 className="text-gray-600 text-sm font-medium">Total Hair Artists</h3>
          <p className="text-2xl font-bold mt-2">{totalBarbers}</p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <h3 className="text-gray-600 text-sm font-medium">Total Completed Bookings</h3>
          <p className="text-2xl font-bold mt-2">{totalBookings}</p>
        </div>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
          <h3 className="text-gray-600 text-sm font-medium">Average Bookings per Artist</h3>
          <p className="text-2xl font-bold mt-2">{averageBookings}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-xl font-semibold mb-6">Hair Artists Management</h1>
      
      {/* Summary Cards */}
      <BarberSummary />

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th
                className="px-4 py-3 text-gray-600 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('barber_id')}
              >
                ID {sortField === 'barber_id' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="px-4 py-3 text-gray-600 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('name')}
              >
                Hair Artist {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="px-4 py-3 text-gray-600 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('total_cuts')}
              >
                Completed Bookings {sortField === 'total_cuts' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBarbers.map((barber, index) => (
              <tr
                key={barber.barber_id}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="px-4 py-3">{barber.barber_id}</td>
                <td className="px-4 py-3">{barber.name}</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    {barber.total_cuts}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredBarbers.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No hair artists found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default BarberManagementPage;