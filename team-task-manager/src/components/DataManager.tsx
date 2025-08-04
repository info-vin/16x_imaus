import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../stores/appStore';
import { UploadIcon } from './icons/UploadIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import type { Task } from '../types';

const DataManager: React.FC = () => {
  const { t } = useTranslation();
  const { getTasksForExport, importData } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const tasks = getTasksForExport();
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    const date = new Date().toISOString().split('T')[0];
    link.download = `projectflow-backup-${date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!window.confirm(t('importConfirmation'))) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error('Invalid file content');
        const importedTasks = JSON.parse(text) as Task[];
        // Basic validation
        if (
          Array.isArray(importedTasks) &&
          importedTasks.every((task) => 'id' in task && 'title' in task)
        ) {
          importData(importedTasks);
          alert(t('importSuccess', { count: importedTasks.length }));
        } else {
          throw new Error('Invalid task format');
        }
      } catch (error) {
        alert(t('importError'));
        console.error('Failed to import data:', error);
      }
    };
    reader.readAsText(file);
    // Reset file input value to allow importing the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/json"
        className="hidden"
      />
      <button
        onClick={handleImportClick}
        className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition"
        title={t('importData')}
      >
        <UploadIcon className="w-5 h-5" />
      </button>
      <button
        onClick={handleExport}
        className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition"
        title={t('exportData')}
      >
        <DownloadIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default DataManager;
