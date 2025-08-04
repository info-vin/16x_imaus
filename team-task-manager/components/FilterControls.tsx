import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../stores/appStore';
import { Priority, Status } from '../types';
import { SearchIcon } from './icons/SearchIcon';
import { UserIcon } from './icons/UserIcon';
import { UsersIcon } from './icons/UsersIcon';

const FilterControls: React.FC = () => {
  const { t } = useTranslation();
  const { filters, setFilter, currentUser } = useAppStore();

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilter(key, value);
  };

  const commonSelectClasses =
    'bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 transition';
  const commonButtonClasses =
    'px-3 py-2 text-sm font-medium text-center inline-flex items-center rounded-lg transition-colors duration-200';

  return (
    <div className="p-4 bg-gray-800 rounded-lg flex flex-col sm:flex-row gap-4 items-center">
      <div className="relative w-full sm:w-1/3">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="search"
          placeholder={t('searchPlaceholder')}
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
        />
      </div>

      <div className="grid grid-cols-2 sm:flex gap-4 w-full sm:w-auto">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className={commonSelectClasses}
        >
          <option value="all">{t('allStatuses')}</option>
          {Object.values(Status).map((s) => (
            <option key={s} value={s}>
              {t(`status.${s}`)}
            </option>
          ))}
        </select>
        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className={commonSelectClasses}
        >
          <option value="all">{t('allPriorities')}</option>
          {Object.values(Priority).map((p) => (
            <option key={p} value={p}>
              {t(`priority.${p}`)}
            </option>
          ))}
        </select>
      </div>

      {currentUser && (
        <div className="flex-shrink-0">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => handleFilterChange('view', 'my')}
              className={`${commonButtonClasses} rounded-l-lg ${filters.view === 'my' ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
            >
              <UserIcon className="w-4 h-4 mr-2" />
              {t('myTasks')}
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('view', 'all')}
              className={`${commonButtonClasses} rounded-r-lg ${filters.view === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
            >
              <UsersIcon className="w-4 h-4 mr-2" />
              {t('allTasks')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;
