import React from 'react';
import useLegacyStore from '../stores/legacyStore';
import LegacyUserSelector from './LegacyUserSelector';

interface LegacyFilterControlsProps {
  onNewTask: () => void;
}

const LegacyFilterControls: React.FC<LegacyFilterControlsProps> = ({ onNewTask }) => {
  const { filters, setFilters } = useLegacyStore();

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value as any })}
          className="bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="Todo">Todo</option>
          <option value="InProgress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        {/* Priority Filter */}
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ priority: e.target.value as any })}
          className="bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* User Selector */}
        <LegacyUserSelector />
      </div>

      {/* New Task Button */}
      <button
        onClick={onNewTask}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        New Task
      </button>
    </div>
  );
};

export default LegacyFilterControls;
