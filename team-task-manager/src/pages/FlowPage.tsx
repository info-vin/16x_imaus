import React from 'react';
import FilterControls from '../components/FilterControls';
import KanbanView from '../components/KanbanView';
import { PlusIcon } from '../components/icons/PlusIcon';
import { useAppStore } from '../stores/appStore';
import TaskModal from '../components/TaskModal';

const FlowPage: React.FC = () => {
  const { setTaskModalOpen, setEditingTask } = useAppStore();

  const handleAddTask = () => {
    setEditingTask(null);
    setTaskModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <FilterControls />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Task</span>
        </button>
      </div>
      <KanbanView />
      <TaskModal />
    </div>
  );
};

export default FlowPage;
