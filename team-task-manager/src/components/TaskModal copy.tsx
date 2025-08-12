import React, { useState, FormEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../stores/appStore';
import { TEAM_MEMBERS } from '../constants';
import type { Task } from '../types';
import { Priority, Status } from '../types';

// Modal 現在接收 task (可能為 null) 和 onClose 函式作為 props
interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
  const { t } = useTranslation();
  // 仍然需要 addTask 和 updateTask 等 actions，但不再需要控制 modal 的狀態
  const { addTask, updateTask, currentUser } = useAppStore();

  // 內部狀態 (local state) 維持不變
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Status>(Status.Pending);
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const [assigneeId, setAssigneeId] = useState<number | ''>('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  // useEffect 現在只依賴 props 傳入的 task 和來自 store 的 currentUser
  useEffect(() => {
    if (task) {
      // 編輯模式：用傳入的 task 資料填滿表單
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority);
      setAssigneeId(task.assigneeId);
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
    } else {
      // 新增模式：重置表單，並將負責人預設為當前登入使用者
      setTitle('');
      setDescription('');
      setStatus(Status.Pending);
      setPriority(Priority.Medium);
      setDueDate('');
      setError('');
      if (currentUser) {
        setAssigneeId(currentUser.id);
      } else {
        setAssigneeId('');
      }
    }
  }, [task, currentUser]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !assigneeId) {
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
    // 提交成功後，呼叫從 props 傳入的 onClose 函式來關閉自己
    onClose();
  };

  const commonInputClasses =
    'w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition';

  // JSX 結構維持不變，但按鈕的 onClick 事件現在都指向正確的處理函式
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            {task ? t('editTask') : t('createNewTask')}
          </h2>
        </div>
        {/* 注意：這裡將 form 移到外層包住按鈕，讓 type="submit" 能正確觸發 */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-900/50 text-red-300 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                {t('title')}
              </label>
              <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={commonInputClasses} required />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                {t('description')}
              </label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={commonInputClasses}></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('status')}
                </label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value as Status)} className={commonInputClasses}>
                  {Object.values(Status).map((s) => (<option key={s} value={s}>{t(`status.${s}`)}</option>))}
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('priority')}
                </label>
                <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className={commonInputClasses}>
                  {Object.values(Priority).map((p) => (<option key={p} value={p}>{t(`priority.${p}`)}</option>))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="assigneeId" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('assignee')}
                </label>
                <select id="assigneeId" value={assigneeId} onChange={(e) => setAssigneeId(Number(e.target.value))} className={commonInputClasses} required>
                  <option value="" disabled>{t('selectAssignee')}</option>
                  {TEAM_MEMBERS.map((member) => (<option key={member.id} value={member.id}>{member.name}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-1">
                  {t('dueDate')}
                </label>
                <input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={`${commonInputClasses} text-gray-300`} />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-700 bg-gray-800/50 flex justify-end gap-4">
            <button
              type="button" // 設為 type="button" 防止它觸發表單提交
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            >
              {t('cancel')}
            </button>
            <button
              type="submit" // 設為 type="submit" 來觸發 form 的 onSubmit
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            >
              {task ? t('saveChanges') : t('createTask')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
