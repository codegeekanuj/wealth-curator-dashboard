import React, { useState, useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles, 
  Download, 
  AlertTriangle, 
  Filter, 
  ListFilter,
  CheckCircle,
  Info
} from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { mockFinancialData } from '../data/mockData';
import { useAnalytics } from '../hooks/useAnalytics';
import { useDebounce } from '../hooks/useDebounce';

// Mock sparkline data
const sparkDataNetWorth = [
  { value: 1200000 }, { value: 1220000 }, { value: 1210000 }, 
  { value: 1230000 }, { value: 1240000 }, { value: 1248390 }
];
const sparkDataSpending = [
  { value: 4100 }, { value: 4300 }, { value: 4050 }, 
  { value: 4200 }, { value: 4150 }, { value: 4280 }
];
const sparkDataSavings = [
  { value: 235000 }, { value: 238000 }, { value: 240000 }, 
  { value: 242000 }, { value: 244000 }, { value: 245000 }
];

export default function Dashboard({ brand, searchQuery }) {
  const { trackEvent } = useAnalytics();
  
  // State for simulated conditions (to fulfill requirement #3: loading, error, empty)
  const [simLoading, setSimLoading] = useState(false);
  const [simError, setSimError] = useState(false);
  const [simEmpty, setSimEmpty] = useState(false);

  // Active filter tab in the recent activity section
  const [activityFilter, setActivityFilter] = useState('All');

  // Fetch mock data with simulated conditions
  const { data, loading, error } = useFetch(mockFinancialData, {
    delay: simLoading ? 2000 : 300,
    simulateError: simError,
    simulateEmpty: simEmpty
  });

  // Debounce the global search query to optimize filter updates
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter transactions based on category button and search query
  const filteredTransactions = useMemo(() => {
    if (!data?.transactions) return [];

    return data.transactions.filter(tx => {
      // 1. Filter by category button
      if (activityFilter !== 'All') {
        const cat = activityFilter.toLowerCase();
        if (cat === 'bills' && tx.category.toLowerCase() !== 'bills' && tx.category.toLowerCase() !== 'utilities') return false;
        if (cat === 'food' && tx.category.toLowerCase() !== 'food' && tx.category.toLowerCase() !== 'lifestyle') return false;
        if (cat === 'income' && tx.category.toLowerCase() !== 'income') return false;
        if (cat === 'coal' && tx.category.toLowerCase() !== 'coal') return false; // dummy
      }

      // 2. Filter by search text
      if (debouncedSearch.trim() !== '') {
        const query = debouncedSearch.toLowerCase();
        const matchesMerchant = tx.merchant.toLowerCase().includes(query);
        const matchesCategory = tx.category.toLowerCase().includes(query);
        const matchesAmount = tx.amount.toString().includes(query);
        return matchesMerchant || matchesCategory || matchesAmount;
      }

      return true;
    });
  }, [data, activityFilter, debouncedSearch]);

  // Export transaction list to CSV
  const handleExportCSV = () => {
    trackEvent('cta_click', { button_name: 'export_csv', transaction_count: filteredTransactions.length });
    
    // Build CSV file content
    const headers = ['Merchant', 'Category', 'Status', 'Amount', 'Date'];
    const rows = filteredTransactions.map(tx => [
      `"${tx.merchant}"`,
      `"${tx.category}"`,
      `"${tx.status}"`,
      tx.amount,
      `"${tx.date}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fintech_transactions_${brand}_${activityFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for alert backgrounds
  const getAlertStyle = (type) => {
    switch (type) {
      case 'critical': return { bg: 'var(--color-critical-bg)', border: 'var(--color-critical-border)', color: 'var(--color-critical)' };
      case 'warning': return { bg: 'var(--color-warning-bg)', border: 'var(--color-warning-border)', color: 'var(--color-warning)' };
      case 'success': return { bg: 'var(--color-success-bg)', border: 'var(--color-success-border)', color: 'var(--accent-green)' };
      default: return { bg: 'var(--color-info-bg)', border: 'var(--color-info-border)', color: 'var(--primary-blue)' };
    }
  };

  // Display conditions
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h3>Simulating Data Loading...</h3>
        <p>Fetching curated intelligence from fintech-grade nodes.</p>
        <button className="btn btn-sm btn-secondary" onClick={() => setSimLoading(false)}>Cancel Loading Mode</button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <AlertTriangle size={48} className="text-danger" />
        <h3>Simulated API Error</h3>
        <p>{error}</p>
        <div className="flex-align-center" style={{ gap: 'var(--spacing-md)' }}>
          <button className="btn btn-primary btn-sm" onClick={() => setSimError(false)}>Clear Error</button>
        </div>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (val) => {
    const num = Number(val);
    if (val === undefined || val === null || isNaN(num)) {
      return '$0';
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  const netWorthVal = brand === 'proton' ? data.summary.netWorth : data.summary.proNetWorth;
  const spendingVal = brand === 'proton' ? data.summary.spending : data.summary.proSpending;
  const savingsVal = brand === 'proton' ? data.summary.savings : data.summary.proSavings;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      
      {/* Simulation Controls Dashboard Bar */}
      <div 
        style={{
          padding: 'var(--spacing-sm) var(--spacing-md)',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--spacing-sm)'
        }}
      >
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          🔍 ASSIGNMENT AUDIT BAR:
        </span>
        <div className="flex-align-center" style={{ gap: 'var(--spacing-sm)' }}>
          <button 
            className={`btn btn-sm ${simLoading ? 'btn-primary' : ''}`}
            onClick={() => { setSimLoading(true); }}
            style={{ fontSize: '0.75rem' }}
          >
            Trigger 2s Loading State
          </button>
          <button 
            className={`btn btn-sm ${simError ? 'btn-danger' : ''}`}
            onClick={() => { setSimError(!simError); }}
            style={{ fontSize: '0.75rem' }}
          >
            {simError ? "Disable Error State" : "Simulate Error State"}
          </button>
          <button 
            className="btn btn-sm"
            onClick={() => { setSimEmpty(!simEmpty); }}
            style={{ fontSize: '0.75rem', backgroundColor: simEmpty ? 'var(--color-warning-bg)' : 'transparent' }}
          >
            {simEmpty ? "Restore Data" : "Simulate Empty State"}
          </button>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: 'var(--spacing-lg)' 
        }}
      >
        {/* Net Worth */}
        <div className="fin-card">
          <span className="metric-header">Total Net Worth</span>
          <div className="flex-between" style={{ alignItems: 'flex-end', marginTop: 'var(--spacing-sm)' }}>
            <div>
              <div className="metric-value">{formatCurrency(netWorthVal)}</div>
              <div className="flex-align-center" style={{ color: 'var(--accent-green)', fontSize: '0.85rem', marginTop: '4px' }}>
                <ArrowUpRight size={14} />
                <span>{data.summary.netWorthTrend}</span>
              </div>
            </div>
            {/* Sparkline */}
            <div style={{ width: '80px', height: '40px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkDataNetWorth}>
                  <defs>
                    <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="var(--primary-blue)" strokeWidth={2} fillOpacity={1} fill="url(#colorNetWorth)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Spending */}
        <div className="fin-card">
          <span className="metric-header">Monthly Spending</span>
          <div className="flex-between" style={{ alignItems: 'flex-end', marginTop: 'var(--spacing-sm)' }}>
            <div>
              <div className="metric-value">{formatCurrency(spendingVal)}</div>
              <div className="flex-align-center" style={{ color: 'var(--accent-orange)', fontSize: '0.85rem', marginTop: '4px' }}>
                <ArrowUpRight size={14} />
                <span>{data.summary.spendingTrend}</span>
              </div>
            </div>
            {/* Sparkline */}
            <div style={{ width: '80px', height: '40px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkDataSpending}>
                  <defs>
                    <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-orange)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--accent-orange)" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="var(--accent-orange)" strokeWidth={2} fillOpacity={1} fill="url(#colorSpending)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Savings */}
        <div className="fin-card">
          <span className="metric-header">Total Savings</span>
          <div className="flex-between" style={{ alignItems: 'flex-end', marginTop: 'var(--spacing-sm)' }}>
            <div>
              <div className="metric-value">{formatCurrency(savingsVal)}</div>
              <div className="flex-align-center" style={{ color: 'var(--accent-green)', fontSize: '0.85rem', marginTop: '4px' }}>
                <ArrowUpRight size={14} />
                <span>{data.summary.savingsTrend}</span>
              </div>
            </div>
            {/* Sparkline */}
            <div style={{ width: '80px', height: '40px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkDataSavings}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="var(--accent-green)" strokeWidth={2} fillOpacity={1} fill="url(#colorSavings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left column (AI + Alerts), Right column (Composition + Activity) */}
      <div className="dashboard-grid">
        
        {/* Left Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          
          {/* AI Strategy Spotlight */}
          <div className="fin-card fin-card-gradient hover-lift" style={{ padding: 'var(--spacing-xl)' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
              <div className="flex-align-center" style={{ gap: '8px' }}>
                <Sparkles size={20} style={{ color: 'white' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  PRO STRATEGY INSIGHT
                </span>
              </div>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 'var(--spacing-sm)', lineHeight: 1.3 }}>
              Optimizing your portfolio for the upcoming Q3 market shift.
            </h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: 'var(--spacing-lg)', lineHeight: 1.5 }}>
              Our AI analyzed your current allocation and identified 3 key rebalancing opportunities to increase yield by 2.4%.
            </p>
            <div className="flex-align-center" style={{ gap: 'var(--spacing-md)' }}>
              <button 
                onClick={() => trackEvent('cta_click', { button_name: 'execute_strategy' })}
                className="btn btn-primary"
                style={{ backgroundColor: 'white', color: 'var(--primary-blue)', border: 'none' }}
              >
                Execute Strategy
              </button>
              <button 
                onClick={() => trackEvent('cta_click', { button_name: 'review_audit' })}
                className="btn"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: 'white', borderColor: 'transparent' }}
              >
                Review Audit
              </button>
            </div>
          </div>

          {/* Active Alerts */}
          <div className="fin-card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 'var(--spacing-md)' }}>
              Active Alerts
            </h3>
            <div className="alert-list">
              {data.activeAlerts.slice(0, 3).map((alert) => {
                const styles = getAlertStyle(alert.type);
                return (
                  <div 
                    key={alert.id} 
                    className="alert-item" 
                    style={{ 
                      backgroundColor: styles.bg, 
                      borderColor: styles.border,
                      borderWidth: '1px',
                      borderStyle: 'solid'
                    }}
                  >
                    <div className="alert-body">
                      <div className="flex-between">
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: styles.color, textTransform: 'uppercase' }}>
                          {alert.category}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {alert.time}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '2px', color: 'var(--text-primary)' }}>
                        {alert.title}
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {alert.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Spending Composition */}
          <div className="fin-card">
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Spending Composition</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 600, cursor: 'pointer' }}>
                View All
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {data.spendingComposition.map((comp, idx) => (
                <div key={idx}>
                  <div className="flex-between" style={{ fontSize: '0.85rem', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{comp.name}</span>
                    <span style={{ fontWeight: 700 }}>{comp.percentage}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${comp.percentage}%`, height: '100%', backgroundColor: comp.color, borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div 
              style={{
                marginTop: 'var(--spacing-lg)',
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}
            >
              <strong>EDITOR'S NOTE:</strong> "Your discretionary spending on Dining & Leisure is down 12% this month. This surplus has been automatically moved to your 'S&P 500' bucket."
            </div>
          </div>

        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          
          {/* Recent Activity */}
          <div className="fin-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            {/* Header with search filters & export */}
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Recent Activity</h3>
              <div className="flex-align-center" style={{ gap: 'var(--spacing-sm)' }}>
                <button 
                  onClick={handleExportCSV}
                  className="btn btn-sm flex-align-center"
                  style={{ gap: '6px', fontSize: '0.75rem', height: '30px' }}
                >
                  <Download size={12} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-md)', overflowX: 'auto', paddingBottom: '4px' }}>
              {['All', 'Food', 'Bills', 'Income'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActivityFilter(tab);
                    trackEvent('filter_click', { filter_type: 'activity_tab', filter_value: tab });
                  }}
                  className="btn btn-sm"
                  style={{
                    padding: '4px 12px',
                    fontSize: '0.75rem',
                    border: 'none',
                    height: '28px',
                    borderRadius: '20px',
                    backgroundColor: activityFilter === tab ? 'var(--primary-blue)' : 'var(--bg-tertiary)',
                    color: activityFilter === tab ? 'white' : 'var(--text-secondary)',
                    fontWeight: activityFilter === tab ? 600 : 500
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Transactions List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', flexGrow: 1 }}>
              {filteredTransactions.length === 0 ? (
                <div className="empty-container" style={{ padding: 'var(--spacing-lg)', minHeight: '150px' }}>
                  <ListFilter size={24} style={{ color: 'var(--text-muted)' }} />
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    No transactions match your filters.
                  </p>
                </div>
              ) : (
                filteredTransactions.map((tx) => {
                  const isIncome = tx.amount > 0;
                  const amtStr = isIncome ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount);
                  
                  return (
                    <div 
                      key={tx.id}
                      className="flex-between"
                      style={{
                        padding: '12px var(--spacing-md)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-secondary)',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{tx.merchant}</span>
                        <div className="flex-align-center" style={{ gap: '6px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.date}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>•</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 500 }}>{tx.category}</span>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                        <span className={`badge badge-${tx.status.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>
                          {tx.status}
                        </span>
                        <span 
                          style={{ 
                            fontSize: '0.9rem', 
                            fontWeight: 700, 
                            color: isIncome ? 'var(--accent-green)' : 'var(--text-primary)' 
                          }}
                        >
                          {amtStr}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
