import React from 'react';
import { Search, Bell, Settings, Sun, Moon, Sparkles, Building } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  brand,
  setBrand,
  searchQuery,
  setSearchQuery,
  trackEvent
}) {

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    trackEvent('search_query', { query: e.target.value });
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    trackEvent('cta_click', { button_name: 'theme_toggle', theme_value: nextTheme });
  };

  const toggleBrand = () => {
    const nextBrand = brand === 'proton' ? 'editorial' : 'proton';
    setBrand(nextBrand);
    trackEvent('cta_click', { button_name: 'brand_toggle', brand_value: nextBrand });
  };

  // Format page title
  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return brand === 'proton' ? 'Portfolio Dashboard' : 'Overview';
      case 'accounts': return 'Accounts Portfolio';
      case 'markets': return 'Market Intelligence';
      case 'transactions': return 'Recent Transactions';
      case 'budgets': return brand === 'proton' ? 'Budgets & Spends' : 'Wealth Hub Planning';
      case 'insights': return 'Wealth Intelligence Insights';
      case 'documents': return 'Document Vault';
      default: return 'Overview';
    }
  };

  return (
    <header
      className="header"
      style={{
        height: 'var(--header-height)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 var(--spacing-lg)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'var(--bg-secondary)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        transition: 'var(--transition-smooth)'
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          {getPageTitle()}
        </h2>
      </div>

      {/* Center Search / Tabs (Editorial layout style) */}
      <div className="flex-align-center" style={{ gap: 'var(--spacing-lg)' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            placeholder={brand === 'proton' ? "Search portfolio or transactions..." : "Search insights..."}
            value={searchQuery}
            onChange={handleSearchChange}
            className="input-field"
            style={{
              paddingLeft: '32px',
              width: '260px',
              height: '36px',
              fontSize: '0.85rem'
            }}
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex-align-center" style={{ gap: '12px' }}>

        {/* Brand Selector Button */}
        <button
          onClick={toggleBrand}
          className="btn btn-sm btn-secondary flex-align-center"
          style={{ height: '36px', fontSize: '0.8rem', gap: '6px' }}
          title={`Switch to ${brand === 'proton' ? 'Editorial' : 'Proton'} layout`}
        >
          <Building size={14} />
          <span className="header-brand-label">
            {brand === 'proton' ? 'Editorial Theme' : 'Proton Theme'}
          </span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-sm"
          style={{
            height: '36px',
            width: '36px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-md)'
          }}
          aria-label={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
          title={theme === 'light' ? "Dark Mode" : "Light Mode"}
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Notifications */}
        <button
          onClick={() => trackEvent('cta_click', { button_name: 'notifications' })}
          className="btn btn-sm"
          style={{
            height: '36px',
            width: '36px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-md)',
            position: 'relative'
          }}
          aria-label="View notifications"
        >
          <Bell size={16} />
          {/* Active notification indicator dot */}
          <span style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-critical)'
          }} />
        </button>

        {/* Settings */}
        <button
          onClick={() => trackEvent('cta_click', { button_name: 'settings' })}
          className="btn btn-sm"
          style={{
            height: '36px',
            width: '36px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-md)'
          }}
          aria-label="View settings"
        >
          <Settings size={16} />
        </button>

        {/* User Profile */}
        <div
          onClick={() => trackEvent('cta_click', { button_name: 'profile' })}
          className="hover-lift"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginLeft: 'var(--spacing-xs)',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-blue)',
            color: 'var(--text-inverse)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: '2px solid var(--border-color)'
          }}>
            AS
          </div>
          <div className="header-profile-info">
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Anuj Tripathi</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Private Client</span>
          </div>
        </div>

      </div>
    </header>
  );
}
