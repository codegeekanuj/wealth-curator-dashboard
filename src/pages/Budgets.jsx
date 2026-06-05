import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { mockFinancialData } from '../data/mockData';
import { useAnalytics } from '../hooks/useAnalytics';

// Reusable UI components
import Card from '../components/common/Card';
import ProgressBar from '../components/common/ProgressBar';
import AlertItem from '../components/common/AlertItem';

export default function Budgets({ brand }) {
  const { trackEvent } = useAnalytics();
  const { budgets } = mockFinancialData;

  const formatCurrency = (val) => {
    const num = Number(val);
    if (val === undefined || val === null || isNaN(num)) {
      return '$0';
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'FIXED': return 'badge-info';
      case 'HEALTHY': return 'badge-success';
      case 'CRITICAL': return 'badge-danger';
      case 'OPTIMAL': return 'badge-warning';
      default: return 'badge-info';
    }
  };

  const percentSpent = (budgets.totalBudgetVelocity / budgets.totalBudgetLimit) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      
      {/* Monthly Overview Progress Card */}
      <Card className="fin-card" style={{ padding: 'var(--spacing-xl)' }}>
        <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
          <div>
            <span className="metric-header">TOTAL BUDGET VELOCITY</span>
            <div className="flex-align-center" style={{ gap: '8px', marginTop: '4px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                {formatCurrency(budgets.totalBudgetVelocity)}
              </h2>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                / {formatCurrency(budgets.totalBudgetLimit)}
              </span>
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <span className="metric-header">PROJECTED SURPLUS</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-green)', marginTop: '4px' }}>
              +{formatCurrency(budgets.projectedSurplus)}
            </h3>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          percentage={percentSpent}
          color="var(--primary-gradient)"
          height="14px"
          borderRadius="7px"
          style={{ marginBottom: 'var(--spacing-sm)' }}
        />

        <div className="flex-between" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>{percentSpent.toFixed(0)}% of monthly limit reached</span>
          <span>12 days remaining in fiscal cycle</span>
        </div>
      </Card>

      {/* Grid: Left - Categories, Right - Strategy + Alerts */}
      <div className="budget-main-grid" style={{ gap: 'var(--spacing-lg)' }}>
        
        {/* Category Limits Allocation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <Card className="fin-card">
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Category Allocation</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 600, cursor: 'pointer' }}>
                View All Categories
              </span>
            </div>

            <div className="budget-categories-grid" style={{ gap: 'var(--spacing-md)' }}>
              {budgets.categories.map((cat) => {
                const ratio = (cat.spent / cat.limit) * 100;
                return (
                  <Card 
                    key={cat.id} 
                    className="fin-card hover-lift"
                    style={{ 
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      padding: 'var(--spacing-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--spacing-sm)'
                    }}
                  >
                    <div className="flex-between">
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{cat.name}</span>
                      <span className={`badge ${getStatusBadgeClass(cat.status)}`} style={{ fontSize: '0.6rem' }}>
                        {cat.status}
                      </span>
                    </div>

                    <div style={{ marginTop: 'var(--spacing-xs)' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                        {formatCurrency(cat.spent)}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {' '}/ {formatCurrency(cat.limit)}
                      </span>
                    </div>

                    <ProgressBar 
                      percentage={ratio} 
                      color={cat.color} 
                      height="6px" 
                      borderRadius="3px" 
                      trackColor="var(--border-color)" 
                      transition="none" 
                      style={{ marginTop: 'var(--spacing-xs)' }} 
                    />
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right - AI Strategy Recommendation & Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          
          {/* Budget Strategy Card */}
          <Card className="fin-card hover-lift" style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--primary-blue)' }}>
            <div className="flex-align-center" style={{ gap: '6px', marginBottom: 'var(--spacing-sm)' }}>
              <Sparkles size={16} style={{ color: 'var(--primary-blue)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-blue)', textTransform: 'uppercase' }}>
                BUDGET STRATEGY
              </span>
            </div>
            
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>
              Optimize your spending to save $200.00 next month.
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: 'var(--spacing-md)' }}>
              Based on your spending patterns at "Gourmet Mart", switching to bulk purchases could reduce your grocery overhead by 14%.
            </p>

            <button 
              onClick={() => trackEvent('cta_click', { button_name: 'apply_budget_strategy' })}
              className="btn btn-primary btn-sm flex-align-center"
              style={{ width: '100%', gap: '6px', fontSize: '0.75rem' }}
            >
              <span>Apply Strategy</span>
              <ArrowRight size={12} />
            </button>
          </Card>

          {/* Budget Alerts Feed */}
          <Card className="fin-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 'var(--spacing-md)' }}>Recent Alerts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              
              <AlertItem
                title="Entertainment Threshold"
                description="Limit is at 90% ($450/$500). Pause non-essential bookings."
                time="2h ago"
                type="critical"
                variant="icon"
              />

              <AlertItem
                title="Dining Anomaly"
                description="Spending at 'The Oak Room' is 20% higher than your average."
                time="Yesterday"
                type="warning"
                variant="icon"
              />

              <AlertItem
                title="Subscription Renewed"
                description="'Bloomberg Terminal' subscription was successfully auto-paid."
                time="2 days ago"
                type="success"
                variant="icon"
              />

            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}
