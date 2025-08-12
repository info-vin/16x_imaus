import React, { useState } from 'react';
import FilterControls from '../components/FilterControls';
import KanbanView from '../components/KanbanView';
import { PlusIcon } from '../components/icons/PlusIcon';
import TaskModal from '../components/TaskModal_v0.2.2';
import type { Task } from '../types';

const FlowPage: React.FC = () => {
  // 使用 React local state 來管理 Modal 的開關狀態和正在編輯的任務
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // 這個函式可以傳遞給 KanbanView，以便點擊任務卡片時可以觸發編輯
  // 假設 KanbanView 會接收一個 onEditTask 的 prop
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // 處理新增任務按鈕點擊事件
  const handleAddTask = () => {
    setEditingTask(null); // 設定為 null 表示是新增，而不是編輯
    setIsModalOpen(true);
  };

  // 處理關閉 Modal 的事件，這個函式會傳遞給 TaskModal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null); // 關閉時重置狀態
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

      {/* 
        您可能需要修改 KanbanView 來接收 onEditTask prop，
        這樣才能實現點擊任務卡片進行編輯的功能。
        例如: <KanbanView onEditTask={handleEditTask} />
      */}
      <KanbanView />

      {/* 條件渲染：只有當 isModalOpen 為 true 時，才顯示 TaskModal */}
      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default FlowPage;