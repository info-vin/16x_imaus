import React from 'react';
import useLegacyStore from '../stores/legacyStore';

const LegacyUserSelector: React.FC = () => {
  const { users, currentUser, setCurrentUser } = useLegacyStore();

  if (!users.length) {
    return null;
  }

  return (
    <select
      value={currentUser || ''}
      onChange={(e) => setCurrentUser(e.target.value)}
      className="bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled>Select User</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default LegacyUserSelector;
