import React from 'react';
import useLegacyStore, { Task } from '../stores/legacyStore';

interface LegacyTaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const priorityClasses: { [key: string]: string } = {
  High: 'border-l-4 border-red-500',
  Medium: 'border-l-4 border-yellow-500',
  Low: 'border-l-4 border-green-500',
};

const LegacyTaskCard: React.FC<LegacyTaskCardProps> = ({ task, onEdit }) => {
  const { deleteTask, users } = useLegacyStore();
  const assignee = users.find(u => u.id === task.assignee);

  return (
    <div className={`bg-gray-800 p-4 rounded-lg shadow-md mb-2 ${priorityClasses[task.priority]}`}>
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-lg text-white">{task.title}</h4>
        <div className="flex items-center space-x-2">
          {assignee && (
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold" title={assignee.name}>
              {assignee.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
      <p className="text-gray-400 mt-2">{task.description || 'No description'}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          Priority: {task.priority}
        </span>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(task)} className="text-blue-400 hover:text-blue-300">Edit</button>
          <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-300">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default LegacyTaskCard;
