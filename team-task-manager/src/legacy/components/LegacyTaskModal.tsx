import React, { useState, useEffect } from 'react';
import useLegacyStore, { Task, Status, Priority } from '../stores/legacyStore';

interface LegacyTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null;
}

const LegacyTaskModal: React.FC<LegacyTaskModalProps> = ({ isOpen, onClose, taskToEdit }) => {
  const { addTask, updateTask, users, currentUser } = useLegacyStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Status>('Todo');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [assignee, setAssignee] = useState<string | undefined>(currentUser || undefined);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      setAssignee(taskToEdit.assignee);
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setStatus('Todo');
      setPriority('Medium');
      setAssignee(currentUser || undefined);
    }
  }, [taskToEdit, isOpen, currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const taskData = { title, description, status, priority, assignee };

    if (taskToEdit) {
      updateTask({ ...taskData, id: taskToEdit.id, createdAt: taskToEdit.createdAt });
    } else {
      addTask(taskData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">{taskToEdit ? 'Edit Task' : 'New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
            />
            <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className="w-full bg-gray-700 text-white rounded-md px-3 py-2">
              <option value="Todo">Todo</option>
              <option value="InProgress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="w-full bg-gray-700 text-white rounded-md px-3 py-2">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select value={assignee || ''} onChange={(e) => setAssignee(e.target.value)} className="w-full bg-gray-700 text-white rounded-md px-3 py-2">
              <option value="">Unassigned</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="text-gray-400">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LegacyTaskModal;
