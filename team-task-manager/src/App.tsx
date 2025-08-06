import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AiPage from './features/ai/routes/AiPage';
import AusPage from './features/aus/routes/AusPage';
import CookieConsent from 'react-cookie-consent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/ai" element={<AiPage />} />
        <Route path="/aus" element={<AusPage />} />
      </Routes>
      <CookieConsent
        location="bottom"
        buttonText="我同意"
        cookieName="myAppCookieConsent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        本網站使用 Cookie 以提昇您的使用體驗。{" "}
        <span style={{ fontSize: "10px" }}>
          <a href="/privacy-policy">隱私權政策</a>
        </span>
      </CookieConsent>
    </Router>
  );
}

export default App;
