import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { zhTW } from 'date-fns/locale/zh-TW';
import { ja } from 'date-fns/locale/ja';
import type { Task, User } from '../types';
import { Priority, Status } from '../types';
import { TEAM_MEMBERS } from '../constants';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';

// Inferred Locale type to avoid import issues with different date-fns versions
type Locale = typeof enUS;

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityClasses: {
  [key in Priority]: { dot: string; text: string; bg: string };
} = {
  [Priority.Low]: {
    dot: 'bg-green-400',
    text: 'text-green-300',
    bg: 'bg-green-900/50',
  },
  [Priority.Medium]: {
    dot: 'bg-yellow-400',
    text: 'text-yellow-300',
    bg: 'bg-yellow-900/50',
  },
  [Priority.High]: {
    dot: 'bg-red-400',
    text: 'text-red-300',
    bg: 'bg-red-900/50',
  },
};

const statusClasses: { [key in Status]: { text: string; bg: string } } = {
  [Status.Pending]: { text: 'text-gray-300', bg: 'bg-gray-700/80' },
  [Status.InProgress]: { text: 'text-blue-300', bg: 'bg-blue-900/50' },
  [Status.Completed]: { text: 'text-purple-300', bg: 'bg-purple-900/50' },
};

const localeMap: { [key: string]: Locale } = {
  'en-US': enUS,
  'zh-TW': zhTW,
  'ja-JP': ja,
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const { t, i18n } = useTranslation();
  const assignee = TEAM_MEMBERS.find((member) => member.id === task.assigneeId);
  const createdBy = TEAM_MEMBERS.find((member) => member.id === task.createdBy);

  const handleDelete = () => {
    if (window.confirm(t('deleteConfirmation', { title: task.title }))) {
      onDelete(task.id);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      // Use `new Date()` instead of `parseISO` for wider compatibility.
      return format(new Date(dateString), 'PP', {
        locale: localeMap[i18n.language] || enUS,
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-indigo-500/20 hover:ring-1 hover:ring-indigo-700/50">
      <div>
        <div className="flex justify-between items-start">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityClasses[task.priority].bg} ${priorityClasses[task.priority].text}`}
          >
            <svg
              className={`-ml-0.5 mr-1.5 h-2 w-2 ${priorityClasses[task.priority].dot}`}
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
            {t(`priority.${task.priority}`)}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[task.status].bg} ${statusClasses[task.status].text}`}
          >
            {t(`status.${task.status}`)}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-bold text-white break-words">
          {task.title}
        </h3>
        {task.description && (
          <p className="mt-2 text-sm text-gray-400 break-words max-h-24 overflow-y-auto">
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-gray-400">
          {task.dueDate && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
          {assignee && (
            <div
              className="flex items-center gap-2"
              title={`${t('assignee')}: ${assignee.name}`}
            >
              <img
                src={assignee.avatar}
                alt={assignee.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="font-medium text-gray-300">
                {assignee.initials}
              </span>
            </div>
          )}
        </div>
        <div className="border-t border-gray-700 my-4"></div>
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 text-xs text-gray-500"
            title={`${t('createdBy')}: ${createdBy?.name}`}
          >
            <UserCircleIcon className="w-4 h-4" />
            <span>{createdBy?.initials || t('unknownUser')}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
            >
              <EditIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-700 rounded-full transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
