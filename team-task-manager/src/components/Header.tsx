import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import UserSelector from './UserSelector';
import DataManager from './DataManager';
import { PlusIcon } from './icons/PlusIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="ProjectFlow Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">ProjectFlow</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Home</Link>
          <Link to="/about.html" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">About</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <DataManager />
        <LanguageSelector />
        <UserSelector />
      </div>
    </header>
  );
};

export default Header;
