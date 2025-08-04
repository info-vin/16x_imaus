import React from 'react';
import { useTranslation } from 'react-i18next';
import UserSelector from './UserSelector';
import LanguageSelector from './LanguageSelector';
import DataManager from './DataManager';
import { LayoutGridIcon } from './icons/LayoutGridIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-indigo-400">
              <LayoutGridIcon className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-white">ProjectFlow</h1>
              <p className="text-xs text-gray-400">{t('headerSubtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4"> 
            <a
              href="/docs/pages/ai/home.html"
              title={t('navigateToBCD')}
              className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition"
            >
              <ExternalLinkIcon className="w-5 h-5" />
            </a>
            <DataManager />
            <LanguageSelector />
            <UserSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
