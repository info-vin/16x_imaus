import React, { useState, FormEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../stores/appStore';
import { TEAM_MEMBERS } from '../constants';
import type { Task } from '../types';
import { Priority, Status } from '../types';

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  const { t } = useTranslation();
  const { addTask, updateTask, currentUser } = useAppStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Status>(Status.Pending);
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const [assigneeId, setAssigneeId] = useState<number | ''>('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority);
      setAssigneeId(task.assigneeId);
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
    } else {
      // Set default assignee to current user when creating a new task
      if (currentUser) {
        setAssigneeId(currentUser.id);
      }
    }
  }, [task, currentUser]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !assigneeId || !currentUser) {
      setError(t('errorRequiredFields'));
      return;
    }
    setError('');

    const taskData = {
      title,
      description,
      status,
      priority,
      assigneeId: Number(assigneeId),
      dueDate: dueDate || undefined,
    };

    if (task) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }
    onClose();
  };

  const commonInputClasses =
    'w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            {task ? t('editTask') : t('createNewTask')}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-900/50 text-red-300 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                {t('title')}
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={commonInputClasses}
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                {t('description')}
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={commonInputClasses}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {t('status')}
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  className={commonInputClasses}
                >
                  {Object.values(Status).map((s) => (
                    <option key={s} value={s}>
                      {t(`status.${s}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {t('priority')}
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className={commonInputClasses}
                >
                  {Object.values(Priority).map((p) => (
                    <option key={p} value={p}>
                      {t(`priority.${p}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="assigneeId"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {t('assignee')}
                </label>
                <select
                  id="assigneeId"
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(Number(e.target.value))}
                  className={commonInputClasses}
                  required
                >
                  <option value="" disabled>
                    {t('selectAssignee')}
                  </option>
                  {TEAM_MEMBERS.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {t('dueDate')}
                </label>
                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={`${commonInputClasses} text-gray-300`}
                />
              </div>
            </div>
          </div>
        </form>
        <div className="p-6 border-t border-gray-700 bg-gray-800/50 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            {task ? t('saveChanges') : t('createTask')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
