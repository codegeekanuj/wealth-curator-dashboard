import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  LineChart, 
  PiggyBank, 
  Sparkles, 
  HelpCircle, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  FileText
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  brand, 
  collapsed, 
  setCollapsed,
  trackEvent 
}) {
  
  // Custom navigation items based on selected branding (matches the assignment screen details)
  const navItems = brand === 'proton' ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'accounts', label: 'Accounts', icon: Wallet },
    { id: 'transactions', label: 'Transactions', icon: FileText },
    { id: 'budgets', label: 'Budgets', icon: PiggyBank },
    { id: 'insights', label: 'Insights', icon: Sparkles }
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'markets', label: 'Markets', icon: LineChart },
    { id: 'insights', label: 'Insights', icon: Sparkles },
    { id: 'budgets', label: 'Wealth Hub', icon: Wallet },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  const handleNavClick = (tabId, label) => {
    setActiveTab(tabId);
    trackEvent('filter_click', { filter_type: 'side_navigation', filter_value: label });
  };

  return (
    <aside 
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: collapsed ? '70px' : 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        padding: 'var(--spacing-md) var(--spacing-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 100,
        transition: 'var(--transition-smooth)'
      }}
      aria-label="Sidebar Navigation"
    >
      <div>
        {/* Brand Header */}
        <div 
          className="flex-between" 
          style={{ 
            padding: 'var(--spacing-sm) var(--spacing-sm) var(--spacing-lg) var(--spacing-sm)',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: 'var(--spacing-lg)'
          }}
        >
          {!collapsed && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 800, 
                color: 'var(--primary-blue)',
                fontFamily: 'var(--font-heading)'
              }}>
                {brand === 'proton' ? 'Proton Finance' : 'Editorial Finance'}
              </h3>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 700 }}>
                {brand === 'proton' ? 'Wealth Creator' : 'The Wealth Curator'}
              </span>
            </div>
          )}
          {collapsed && (
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px', 
              backgroundColor: 'var(--color-info-bg)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary-blue)',
              fontWeight: 800
            }}>
              {brand === 'proton' ? 'P' : 'E'}
            </div>
          )}
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="btn btn-sm"
            style={{ 
              padding: '4px', 
              minWidth: '24px', 
              borderRadius: '50%',
              backgroundColor: 'var(--bg-tertiary)',
              border: 'none',
              marginLeft: collapsed ? 'auto' : 'var(--spacing-sm)'
            }}
            aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isTabActive = activeTab === item.id || 
              (item.id === 'budgets' && activeTab === 'budgets') || 
              (item.id === 'markets' && activeTab === 'markets');
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.label)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: isTabActive ? 'var(--color-info-bg)' : 'transparent',
                  color: isTabActive ? 'var(--primary-blue)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'var(--transition-smooth)',
                  fontWeight: isTabActive ? 600 : 500,
                  fontSize: '0.9rem'
                }}
                className="hover-lift"
              >
                <Icon size={18} style={{ color: isTabActive ? 'var(--primary-blue)' : 'var(--text-muted)' }} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {/* Pro Badge */}
          {!collapsed && (
            <div 
              style={{
                backgroundColor: 'var(--color-info-bg)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-md)',
                border: '1px solid var(--color-info-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div className="flex-align-center" style={{ gap: '6px' }}>
                <Shield size={14} style={{ color: 'var(--primary-blue)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-blue)' }}>PRO ACCESS</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Unlock AI Strategy Insights</span>
              <button 
                onClick={() => trackEvent('cta_click', { button_name: 'upgrade_to_premium' })}
                className="btn btn-primary btn-sm"
                style={{ width: '100%', fontSize: '0.75rem', padding: '6px' }}
              >
                Upgrade Now
              </button>
            </div>
          )}

          {/* Bottom Settings / Help / Logout */}
          <button
            onClick={() => handleNavClick('support', 'Help Center')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px var(--spacing-md)',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              width: '100%',
              fontSize: '0.85rem'
            }}
          >
            <HelpCircle size={16} style={{ color: 'var(--text-muted)' }} />
            {!collapsed && <span>Help Center</span>}
          </button>

          <button
            onClick={() => trackEvent('cta_click', { button_name: 'logout' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px var(--spacing-md)',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              width: '100%',
              fontSize: '0.85rem'
            }}
          >
            <LogOut size={16} style={{ color: 'var(--text-muted)' }} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
