import React, { useState, useEffect, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAnalytics } from './hooks/useAnalytics';
import './App.css';

// Lazy load views for optimization (covers performance requirements)
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Markets = React.lazy(() => import('./pages/Markets'));
const Budgets = React.lazy(() => import('./pages/Budgets'));
const Insights = React.lazy(() => import('./pages/Insights'));
const PlaceholderPage = React.lazy(() => import('./pages/PlaceholderPage'));

function App() {
  const { trackEvent } = useAnalytics();

  // Local storage synchronization (covers reusability/custom hooks requirements)
  const [activeTab, setActiveTab] = useLocalStorage('active_tab', 'dashboard');
  const [theme, setTheme] = useLocalStorage('theme_mode', 'dark'); // Default to dark mode for rich aesthetics
  const [brand, setBrand] = useLocalStorage('brand_type', 'proton'); // Default to proton branding
  const [collapsed, setCollapsed] = useLocalStorage('sidebar_collapsed', false);
  const [searchQuery, setSearchQuery] = useState('');

  // Track initial page load and page change events
  useEffect(() => {
    trackEvent('page_view', { page_title: activeTab, brand: brand, theme: theme });
    
    // Set document head title for SEO
    const capitalizedTab = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
    document.title = `${capitalizedTab} | ${brand === 'proton' ? 'Proton Finance' : 'Editorial Finance'} - Premium Wealth Curator`;
  }, [activeTab, brand, theme, trackEvent]);

  // Synchronize CSS class configurations on document node for design token usage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Synchronize Brand variables on body
  useEffect(() => {
    document.body.classList.remove('brand-proton', 'brand-editorial');
    document.body.classList.add(`brand-${brand}`);
  }, [brand]);

  // Render active view dynamically
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard brand={brand} searchQuery={searchQuery} />;
      case 'markets':
        return <Markets brand={brand} />;
      case 'budgets':
        return <Budgets brand={brand} />;
      case 'insights':
        return <Insights brand={brand} />;
      default:
        // Handle placeholder sub-pages (e.g. Accounts, Documents, Transactions, Help Center)
        return <PlaceholderPage title={activeTab} />;
    }
  };

  return (
    <div className={`app-container ${collapsed ? 'sidebar-collapsed' : ''}`}>
      
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        brand={brand}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        trackEvent={trackEvent}
      />

      {/* Main Page Layout Wrapper */}
      <div className="main-content">
        
        {/* Header toolbar */}
        <Header 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          setTheme={setTheme}
          brand={brand}
          setBrand={setBrand}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          trackEvent={trackEvent}
        />

        {/* Content Container */}
        <main style={{ flexGrow: 1, padding: 'var(--spacing-md) 0' }}>
          <Suspense 
            fallback={
              <div className="loading-container">
                <div className="spinner"></div>
                <h3>Loading page intelligence...</h3>
              </div>
            }
          >
            {renderActiveView()}
          </Suspense>
        </main>

        {/* Footer info (SEO & compliance) */}
        <footer 
          className="flex-between"
          style={{
            marginTop: 'var(--spacing-xl)',
            paddingTop: 'var(--spacing-md)',
            borderTop: '1px solid var(--border-color)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>&copy; 2026 {brand === 'proton' ? 'Proton Finance' : 'Editorial Finance'}. Wealth Curator platform data encrypted AES-256.</span>
          <div className="flex-align-center" style={{ gap: 'var(--spacing-md)' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span>&bull;</span>
            <span style={{ cursor: 'pointer' }}>Security Audit</span>
            <span>&bull;</span>
            <span style={{ cursor: 'pointer' }}>API Docs</span>
          </div>
        </footer>

      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        brand={brand}
        trackEvent={trackEvent}
      />

    </div>
  );
}

export default App;
