import React from 'react';
import PublicHeader from '../components/PublicHeader';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <PublicHeader />
      <main style={{ flexGrow: 1, overflow: 'hidden' }}>
        <iframe
          src={`/ai/home.html?lang=${i18n.language}`}
          title="Dashboard"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </main>
    </div>
  );
};

export default HomePage;
