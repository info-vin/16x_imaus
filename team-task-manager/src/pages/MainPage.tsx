import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../stores/appStore';
import type { Task } from '../types';
import Header from '../components/Header';
import FilterControls from '../components/FilterControls';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal_v0.2.2';
import { PlusIcon } from '../components/icons/PlusIcon';

function MainPage() {
  const { t } = useTranslation();
  const { tasks, filters, currentUser, deleteTask, init } = useAppStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    init();
  }, [init]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const searchLower = filters.search.toLowerCase();
        const titleMatch = task.title.toLowerCase().includes(searchLower);
        const descriptionMatch =
          task.description?.toLowerCase().includes(searchLower) ?? false;
        return titleMatch || descriptionMatch;
      })
      .filter(
        (task) => filters.status === 'all' || task.status === filters.status,
      )
      .filter(
        (task) =>
          filters.priority === 'all' || task.priority === filters.priority,
      )
      .filter(
        (task) =>
          !currentUser ||
          filters.view === 'all' ||
          task.assigneeId === currentUser.id,
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [tasks, filters, currentUser]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />

      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {t('tasksTitle')}
          </h1>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:bg-gray-500"
            disabled={!currentUser}
            title={!currentUser ? t('selectUserToAddTask') : t('addNewTask')}
          >
            <PlusIcon className="w-5 h-5" />
            <span>{t('addNewTask')}</span>
          </button>
        </div>

        <FilterControls />

        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={deleteTask}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-gray-800 rounded-lg mt-6">
            <h3 className="text-xl font-semibold text-gray-300">
              {t('noTasksFound')}
            </h3>
            <p className="text-gray-400 mt-2">{t('noTasksMessage')}</p>
          </div>
        )}
      </main>

      {isModalOpen && <TaskModal task={editingTask} onClose={closeModal} />}
    </div>
  );
}

export default MainPage;
