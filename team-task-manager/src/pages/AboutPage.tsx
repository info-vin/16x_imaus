import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
      <p>{t('about.content')}</p>
    </div>
  );
};

export default AboutPage;
