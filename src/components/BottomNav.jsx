import React from 'react';
import { LayoutDashboard, LineChart, Sparkles, PiggyBank } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, brand, trackEvent }) {
  
  // Custom mobile navigation items based on Proton vs Editorial branding
  const items = brand === 'proton' ? [
    { id: 'dashboard', label: 'Portfolio', icon: LayoutDashboard },
    { id: 'markets', label: 'Analysis', icon: LineChart },
    { id: 'insights', label: 'Insights', icon: Sparkles },
    { id: 'budgets', label: 'Budgets', icon: PiggyBank }
  ] : [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'markets', label: 'Portfolio', icon: LineChart },
    { id: 'insights', label: 'Insights', icon: Sparkles },
    { id: 'budgets', label: 'Planning', icon: PiggyBank }
  ];

  const handleTabClick = (tabId, label) => {
    setActiveTab(tabId);
    trackEvent('filter_click', { filter_type: 'bottom_navigation', filter_value: label });
  };

  return (
    <nav 
      className="bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        display: 'none', // Hidden on desktop by default, displayed via media query on mobile
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
        paddingBottom: 'safe-area-inset-bottom'
      }}
      aria-label="Mobile Navigation Bar"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isTabActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id, item.label)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              border: 'none',
              background: 'transparent',
              color: isTabActive ? 'var(--primary-blue)' : 'var(--text-secondary)',
              cursor: 'pointer',
              flexGrow: 1,
              height: '100%',
              fontSize: '0.7rem',
              fontWeight: isTabActive ? 700 : 500,
              transition: 'var(--transition-smooth)'
            }}
          >
            <Icon size={20} style={{ color: isTabActive ? 'var(--primary-blue)' : 'var(--text-muted)' }} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
