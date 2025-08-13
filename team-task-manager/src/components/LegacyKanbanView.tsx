import React from 'react';
import useLegacyStore, { Status, Task } from '../stores/legacyStore';
import LegacyTaskCard from './LegacyTaskCard';

interface LegacyKanbanViewProps {
  onEditTask: (task: Task) => void;
}

const LegacyKanbanView: React.FC<LegacyKanbanViewProps> = ({ onEditTask }) => {
  const { tasks, filters, currentUser } = useLegacyStore();

  const filteredTasks = tasks.filter(task => {
    const searchMatch = task.title.toLowerCase().includes(filters.search.toLowerCase());
    const statusMatch = filters.status ? task.status === filters.status : true;
    const priorityMatch = filters.priority ? task.priority === filters.priority : true;
    const userMatch = currentUser ? task.assignee === currentUser : true;
    return searchMatch && statusMatch && priorityMatch && userMatch;
  });

  const columns: Status[] = ['Todo', 'InProgress', 'Done'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map(status => (
        <div key={status} className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-xl font-bold text-white mb-4 border-b-2 border-gray-700 pb-2">{status}</h3>
          <div className="space-y-4">
            {filteredTasks
              .filter(task => task.status === status)
              .map(task => (
                <LegacyTaskCard key={task.id} task={task} onEdit={onEditTask} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LegacyKanbanView;
