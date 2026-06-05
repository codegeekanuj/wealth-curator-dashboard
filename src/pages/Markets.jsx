import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight, Compass } from 'lucide-react';
import { mockFinancialData } from '../data/mockData';
import { useAnalytics } from '../hooks/useAnalytics';

export default function Markets({ brand }) {
  const { trackEvent } = useAnalytics();
  const [timeRange, setTimeRange] = useState('1M');

  const { portfolio } = mockFinancialData;
  const chartData = portfolio.velocity[timeRange] || portfolio.velocity['1M'];

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    trackEvent('filter_click', { filter_type: 'markets_time_range', filter_value: range });
  };

  // Sector performances
  const sectors = [
    { name: 'Technology', change: '+8.4%', trend: 'up', color: 'var(--primary-blue)' },
    { name: 'Real Estate', change: '+2.1%', trend: 'up', color: 'var(--accent-green)' },
    { name: 'Utilities', change: '-0.4%', trend: 'down', color: 'var(--color-critical)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      
      {/* Top Banner (Active Signal) */}
      <div className="fin-card markets-top-card" style={{ gap: 'var(--spacing-lg)' }}>
        <div>
          <div className="flex-align-center" style={{ gap: '6px', marginBottom: 'var(--spacing-sm)' }}>
            <span className="badge badge-info">Active Signal</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Confidence 92%</span>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 'var(--spacing-sm)' }}>
            Optimizing Alpha: Your Tech-Weighted Strategy
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--spacing-md)' }}>
            We've identified a 4.2% efficiency gap in your fixed-income rotation. Realigning toward sovereign bonds could mitigate the current volatility in your growth bucket.
          </p>
          <button 
            onClick={() => trackEvent('cta_click', { button_name: 'review_strategy_markets' })}
            className="btn btn-primary btn-sm"
          >
            Review Strategy
          </button>
        </div>

        {/* Sentiment Meter (Radial visual look) */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: '1px solid var(--border-color)',
            paddingLeft: 'var(--spacing-lg)'
          }}
        >
          <span className="metric-header" style={{ marginBottom: 'var(--spacing-sm)' }}>Sentiment Index</span>
          <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Custom Circular SVG ring */}
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="var(--border-color)" strokeWidth="8" fill="transparent" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke="var(--primary-blue)" 
                strokeWidth="8" 
                fill="transparent" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (251.2 * portfolio.sentiment.score) / 100} 
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
              <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                {portfolio.sentiment.score}
              </span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-green)' }}>
                {portfolio.sentiment.label}
              </span>
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'center' }}>
            Retail investors are showing strong accumulation signals.
          </span>
        </div>
      </div>

      {/* Main Chart Card (Portfolio Velocity) */}
      <div className="fin-card">
        <div className="flex-between" style={{ marginBottom: 'var(--spacing-md)', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Portfolio Velocity</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Comparison vs S&P 500 Benchmarks</span>
          </div>

          {/* Time Range Selectors */}
          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--bg-tertiary)', padding: '2px', borderRadius: '8px' }}>
            {['1M', '6M', '1Y', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => handleTimeRangeChange(range)}
                style={{
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  border: 'none',
                  backgroundColor: timeRange === range ? 'var(--bg-secondary)' : 'transparent',
                  color: timeRange === range ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: timeRange === range ? 600 : 500,
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Current Portfolio Value readout */}
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PEAK PERFORMANCE</span>
          <div className="flex-align-center" style={{ gap: '8px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              $1,424,902.18
            </span>
            <span className="badge badge-success" style={{ padding: '2px 6px', fontSize: '0.65rem' }}>
              +14.2%
            </span>
          </div>
        </div>

        {/* Chart Area */}
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorSP500" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--text-muted)" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="var(--text-muted)" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} tickLine={false} />
              <YAxis 
                stroke="var(--text-muted)" 
                fontSize={10} 
                tickLine={false} 
                tickFormatter={(tick) => formatCurrency(tick)}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Value']}
                contentStyle={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-md)'
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '0.8rem' }} />
              <Area 
                type="monotone" 
                name="Your Portfolio" 
                dataKey="portfolio" 
                stroke="var(--primary-blue)" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorPortfolio)" 
              />
              <Area 
                type="monotone" 
                name="S&P 500 Index" 
                dataKey="sp500" 
                stroke="var(--text-muted)" 
                strokeWidth={1.5} 
                strokeDasharray="4 4"
                fillOpacity={1} 
                fill="url(#colorSP500)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sector Allocations & Performance */}
      <div className="markets-bottom-grid" style={{ gap: 'var(--spacing-lg)' }}>
        
        {/* Sector Allocation Breakdown */}
        <div className="fin-card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 'var(--spacing-md)' }}>Sector Allocation</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            {portfolio.sectorAllocation.map((item, idx) => (
              <div key={idx} className="flex-between" style={{ padding: '8px 0', borderBottom: idx < portfolio.sectorAllocation.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.name}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance by Sector */}
        <div className="fin-card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 'var(--spacing-md)' }}>Performance by Sector</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            {sectors.map((sector, idx) => {
              const isUp = sector.trend === 'up';
              return (
                <div 
                  key={idx} 
                  className="flex-between" 
                  style={{ 
                    padding: '10px var(--spacing-md)', 
                    borderRadius: 'var(--radius-md)', 
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div className="flex-align-center" style={{ gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: sector.color }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{sector.name}</span>
                  </div>
                  <span 
                    style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      color: isUp ? 'var(--accent-green)' : 'var(--color-critical)' 
                    }}
                  >
                    {sector.change}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
