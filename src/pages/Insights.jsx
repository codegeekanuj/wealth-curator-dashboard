import React from 'react';
import { Sparkles, ArrowRight, ShieldAlert, ArrowUpRight, TrendingUp, Landmark } from 'lucide-react';
import { mockFinancialData } from '../data/mockData';
import { useAnalytics } from '../hooks/useAnalytics';

export default function Insights({ brand }) {
  const { trackEvent } = useAnalytics();
  const { aiInsights } = mockFinancialData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      
      {/* Intro section */}
      <div>
        <span className="metric-header" style={{ color: 'var(--primary-blue)' }}>Wealth Intelligence</span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
          Portfolio Insights
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '700px' }}>
          Your curated financial perspective, balancing algorithmic precision with long-term wealth preservation goals.
        </p>
      </div>

      {/* Active Signal: Rebalance Priority */}
      <div className="insights-top-grid" style={{ gap: 'var(--spacing-lg)' }}>
        
        {/* Signal Body Card */}
        <div className="fin-card" style={{ display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
          <div>
            <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)' }}>
              <span className="badge badge-danger">Active Signal: Rebalance Priority</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Confidence 88%</span>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 'var(--spacing-sm)' }}>
              Your technology exposure has increased by 14.2% since last quarter.
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--spacing-lg)' }}>
              Our algorithms suggest shifting 4% of gains into emerging market debt and high-yield real estate to maintain your risk-adjusted profile.
            </p>
          </div>

          <div className="flex-align-center" style={{ gap: 'var(--spacing-md)' }}>
            <button 
              onClick={() => trackEvent('cta_click', { button_name: 'review_strategy_insights' })}
              className="btn btn-primary btn-sm"
            >
              Review Strategy
            </button>
            <button 
              onClick={() => trackEvent('cta_click', { button_name: 'dismiss_insights' })}
              className="btn btn-sm"
              style={{ border: 'none', backgroundColor: 'transparent' }}
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* Small Confidence Gauge Card */}
        <div 
          className="fin-card" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'var(--bg-secondary)',
            textAlign: 'center'
          }}
        >
          <div style={{ position: 'relative', width: '120px', height: '120px' }}>
            <svg width="120" height="120" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="var(--border-color)" strokeWidth="6" fill="transparent" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke="var(--accent-green)" 
                strokeWidth="6" 
                fill="transparent" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (251.2 * 88) / 100} 
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>88%</span>
              <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confidence</span>
            </div>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 'var(--spacing-md)' }}>
            High alignment with your target asset distribution and yield goals.
          </span>
        </div>

      </div>

      {/* Cash Flow Intelligence Section */}
      <div className="fin-card">
        <div className="flex-between" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Cash Flow Intelligence</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automated suggestions based on your November spending patterns</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 600, cursor: 'pointer' }}>
            View Monthly Report &rarr;
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
          
          {/* Item 1 */}
          <div 
            className="hover-lift"
            style={{ 
              padding: 'var(--spacing-lg)', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-sm)'
            }}
          >
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '8px', 
              backgroundColor: 'var(--color-info-bg)', 
              color: 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={16} />
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Surplus Opportunity</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              You spent 12% less on dining this month. Transfer $450 to your "Growth" bucket to stay ahead of your 2024 goal.
            </p>
          </div>

          {/* Item 2 */}
          <div 
            className="hover-lift"
            style={{ 
              padding: 'var(--spacing-lg)', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-sm)'
            }}
          >
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '8px', 
              backgroundColor: 'var(--color-warning-bg)', 
              color: 'var(--accent-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldAlert size={16} />
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Recurring Audit</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              We detected two overlapping streaming subscriptions. Canceling "Media+" would save you $180 annually.
            </p>
          </div>

          {/* Item 3 */}
          <div 
            className="hover-lift"
            style={{ 
              padding: 'var(--spacing-lg)', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-sm)'
            }}
          >
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '8px', 
              backgroundColor: 'var(--color-success-bg)', 
              color: 'var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Landmark size={16} />
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Tax-Loss Harvesting</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              3 assets in your legacy portfolio are eligible for tax-loss harvesting. Potential benefit: $2,100.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
