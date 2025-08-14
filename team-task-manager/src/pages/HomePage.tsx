import React from 'react';
import PublicHeader from '../components/PublicHeader';

const HomePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <PublicHeader />
      <main style={{ flexGrow: 1, overflow: 'hidden' }}>
        <iframe
          src="/ai/home.html"
          title="Dashboard"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </main>
    </div>
  );
};

export default HomePage;
