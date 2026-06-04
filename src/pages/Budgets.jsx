import React from 'react';
import { PiggyBank, Target, Sparkles, AlertCircle, TrendingDown, ArrowRight } from 'lucide-react';
import { mockFinancialData } from '../data/mockData';
import { useAnalytics } from '../hooks/useAnalytics';

export default function Budgets({ brand }) {
  const { trackEvent } = useAnalytics();
  const { budgets } = mockFinancialData;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
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
      <div className="fin-card" style={{ padding: 'var(--spacing-xl)' }}>
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
        <div style={{ width: '100%', height: '14px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '7px', overflow: 'hidden', marginBottom: 'var(--spacing-sm)' }}>
          <div 
            style={{ 
              width: `${percentSpent}%`, 
              height: '100%', 
              background: 'var(--primary-gradient)',
              borderRadius: '7px',
              transition: 'width 1s ease-in-out'
            }}
          />
        </div>

        <div className="flex-between" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>{percentSpent.toFixed(0)}% of monthly limit reached</span>
          <span>12 days remaining in fiscal cycle</span>
        </div>
      </div>

      {/* Grid: Left - Categories, Right - Strategy + Alerts */}
      <div className="budget-main-grid" style={{ gap: 'var(--spacing-lg)' }}>
        
        {/* Category Limits Allocation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <div className="fin-card">
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
                  <div 
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

                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden', marginTop: 'var(--spacing-xs)' }}>
                      <div 
                        style={{ 
                          width: `${Math.min(ratio, 100)}%`, 
                          height: '100%', 
                          backgroundColor: cat.color,
                          borderRadius: '3px'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right - AI Strategy Recommendation & Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          
          {/* Budget Strategy Card */}
          <div className="fin-card hover-lift" style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--primary-blue)' }}>
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
          </div>

          {/* Budget Alerts Feed */}
          <div className="fin-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 'var(--spacing-md)' }}>Recent Alerts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              
              {/* Alert 1 */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'var(--color-critical-bg)', color: 'var(--color-critical)' }}>
                  <AlertCircle size={14} />
                </div>
                <div>
                  <div className="flex-between">
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Entertainment Threshold</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>2h ago</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Limit is at 90% ($450/$500). Pause non-essential bookings.
                  </p>
                </div>
              </div>

              {/* Alert 2 */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'var(--color-warning-bg)', color: 'var(--accent-orange)' }}>
                  <AlertCircle size={14} />
                </div>
                <div>
                  <div className="flex-between">
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Dining Anomaly</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Yesterday</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Spending at 'The Oak Room' is 20% higher than your average.
                  </p>
                </div>
              </div>

              {/* Alert 3 */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'var(--color-success-bg)', color: 'var(--accent-green)' }}>
                  <Target size={14} />
                </div>
                <div>
                  <div className="flex-between">
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Subscription Renewed</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>2 days ago</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    'Bloomberg Terminal' subscription was successfully auto-paid.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
