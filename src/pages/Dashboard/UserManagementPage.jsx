import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BlacklistBadge = ({ isBlacklisted }) => {
  return (
    <span className="text-sm">
      {isBlacklisted ? 'True' : 'False'}
    </span>
  );
};

const ActionButton = ({ isBlacklisted, userId, onBlacklist, disabled }) => {
  const styles = isBlacklisted
    ? 'bg-gray-400 text-white cursor-not-allowed'
    : 'bg-red-500 hover:bg-red-600 text-white cursor-pointer';
  
  return (
    <button 
      className={`px-4 py-1 rounded-full text-sm ${styles}`}
      onClick={() => !isBlacklisted && onBlacklist(userId)}
      disabled={disabled || isBlacklisted}
    >
      {isBlacklisted ? 'Blacklisted' : 'Confirm'}
    </button>
  );
};

BlacklistBadge.propTypes = {
  isBlacklisted: PropTypes.bool.isRequired,
};

ActionButton.propTypes = {
  isBlacklisted: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  onBlacklist: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blacklistInProgress, setBlacklistInProgress] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        // Filter out admin users (role_id = 1)
        const filteredUsers = data.filter(user => user.role_id !== 1);
        setUsers(filteredUsers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlacklist = async (userId) => {
    try {
      setBlacklistInProgress(true);
      const response = await fetch(`/api/users/${userId}/blacklist`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_blacklisted: true })
      });

      if (!response.ok) {
        throw new Error('Failed to blacklist user');
      }

      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.user_id === userId 
            ? { ...user, is_blacklisted: true }
            : user
        )
      );
    } catch (err) {
      console.error('Error blacklisting user:', err);
      alert('Failed to blacklist user. Please try again.');
    } finally {
      setBlacklistInProgress(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        Error: {error}
      </div>
    );
  }

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
                key={user.user_id}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="px-4 py-3">{user.user_id}</td>
                <td className="px-4 py-3">{user.fullname || '-'}</td>
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
                  <BlacklistBadge isBlacklisted={user.is_blacklisted} />
                </td>
                <td className="px-4 py-3">
                  <ActionButton 
                    isBlacklisted={user.is_blacklisted}
                    userId={user.user_id}
                    onBlacklist={handleBlacklist}
                    disabled={blacklistInProgress}
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

export default UserManagementPage;