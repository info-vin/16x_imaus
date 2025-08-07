import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t('home.title')}</h1>
      <p className="mb-8">{t('home.description')}</p>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {t('login.title')}
        </Link>
        <Link to="/register" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          {t('register.title')}
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
