import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from './Card';

export default function MetricCard({
  title,
  value,
  trendText,
  trendDirection,
  sparklineData,
  sparklineColor = 'var(--primary-blue)',
  gradientId,
}) {
  // Determine if trend is positive
  const isUp = trendDirection 
    ? trendDirection === 'up' 
    : (trendText ? !trendText.startsWith('-') : true);

  const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;
  const trendColor = isUp ? 'var(--accent-green)' : 'var(--accent-orange)';

  return (
    <Card className="fin-card">
      <span className="metric-header">{title}</span>
      <div className="flex-between" style={{ alignItems: 'flex-end', marginTop: 'var(--spacing-sm)' }}>
        <div>
          <div className="metric-value">{value}</div>
          {trendText && (
            <div className="flex-align-center" style={{ color: trendColor, fontSize: '0.85rem', marginTop: '4px' }}>
              <TrendIcon size={14} />
              <span>{trendText}</span>
            </div>
          )}
        </div>
        {sparklineData && sparklineData.length > 0 && (
          <div style={{ width: '80px', height: '40px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={sparklineColor} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={sparklineColor} stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={sparklineColor} 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill={`url(#${gradientId})`} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Card>
  );
}
