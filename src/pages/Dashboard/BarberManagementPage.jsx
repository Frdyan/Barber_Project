import { useState, useEffect } from 'react';

const BarberManagementPage = () => {
  const [barbers, setBarbers] = useState([]);
  const [filteredBarbers, setFilteredBarbers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await fetch('/api/barbers');
        const data = await response.json();
        setBarbers(data);
        setFilteredBarbers(data);
      } catch (error) {
        console.error('Error fetching barbers:', error);
      }
    };

    fetchBarbers();
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-xl font-semibold mb-6">Barber</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th
                className="px-4 py-3 text-gray-600 cursor-pointer"
                onClick={() => handleSort('barber_id')}
              >
                ID {sortField === 'barber_id' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="px-4 py-3 text-gray-600 cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Hair Artist {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="px-4 py-3 text-gray-600 cursor-pointer"
                onClick={() => handleSort('total_cuts')}
              >
                Jumlah Booking {sortField === 'total_cuts' && (sortOrder === 'asc' ? '▲' : '▼')}
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
                <td className="px-4 py-3">{barber.total_cuts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BarberManagementPage;