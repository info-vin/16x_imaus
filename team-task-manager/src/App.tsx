import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FlowPage from './pages/FlowPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AiPage from './features/ai/routes/AiPage';
import AusPage from './features/aus/routes/AusPage';
import CookieConsent from 'react-cookie-consent';
import { useAppStore } from './stores/appStore';
import MainLayout from './components/MainLayout';

function App() {
  const init = useAppStore((state) => state.init);
  // --- 登入狀態 (未來啟用) ---
  // const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  // ------------------------------------

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        {/* Protected Routes */}
        <Route element={
          // --- 路由守衛邏輯 (未來啟用) ---
          // isLoggedIn ? <MainLayout /> : <Navigate to="/login" replace />
          <MainLayout /> // Currently, always show MainLayout
        }>
          <Route path="/flow.html" element={<FlowPage />} />
          <Route path="/about.html" element={<AboutPage />} />
          <Route path="/ai" element={<AiPage />} />
          <Route path="/aus" element={<AusPage />} />
        </Route>
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
