import PropTypes from 'prop-types';

const BlacklistBadge = ({ isBlacklisted }) => {
  return (
    <span className="text-sm">
      {isBlacklisted ? 'True' : 'False'}
    </span>
  );
};

const ActionButton = ({ isBlacklisted }) => {
  const styles = isBlacklisted
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : 'bg-red-500 hover:bg-red-600 text-white';
  
  return (
    <button className={`px-4 py-1 rounded-full text-sm ${styles}`}>
      {isBlacklisted ? 'Blacklisted' : 'Confirm'}
    </button>
  );
};

BlacklistBadge.propTypes = {
  isBlacklisted: PropTypes.bool.isRequired,
};

ActionButton.propTypes = {
  isBlacklisted: PropTypes.bool.isRequired,
};

const UserManagementPage = () => {
  const users = [
    {
      id: '901',
      name: 'Jordan Peele',
      email: 'Jordan199@gmail.com',
      password: 'Peele19902',
      blacklisted: false
    },
    {
      id: '902',
      name: 'Michael Keaton',
      email: 'Keaton0202@gmail.com',
      password: 'MichaelR11',
      blacklisted: true
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-xl font-semibold mb-6">User</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-3 text-gray-600">ID</th>
              <th className="px-4 py-3 text-gray-600">Nama Pelanggan</th>
              <th className="px-4 py-3 text-gray-600">Email</th>
              <th className="px-4 py-3 text-gray-600">Password</th>
              <th className="px-4 py-3 text-gray-600">Blacklist</th>
              <th className="px-4 py-3 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr 
                key={user.id}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">
                  <a 
                    href={`mailto:${user.email}`} 
                    className="text-blue-600 hover:underline"
                  >
                    {user.email}
                  </a>
                </td>
                <td className="px-4 py-3">{user.password}</td>
                <td className="px-4 py-3">
                  <BlacklistBadge isBlacklisted={user.blacklisted} />
                </td>
                <td className="px-4 py-3">
                  <ActionButton isBlacklisted={user.blacklisted} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;