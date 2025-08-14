import React, { useState } from 'react';
import LegacyKanbanView from '../legacy/components/LegacyKanbanView';
import LegacyFilterControls from '../legacy/components/LegacyFilterControls';
import LegacyTaskModal from '../legacy/components/LegacyTaskModal';
import { Task } from '../legacy/stores/legacyStore';

const DemoPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleNewTask = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">Legacy Demo Mode</h1>
            <p className="text-gray-400 mt-1">
                This is a fully client-side version of the task manager using localStorage.
            </p>
        </div>
        
        <LegacyFilterControls onNewTask={handleNewTask} />
        <LegacyKanbanView onEditTask={handleEditTask} />
        <LegacyTaskModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          taskToEdit={taskToEdit} 
        />
      </div>
    </div>
  );
};

export default DemoPage;
