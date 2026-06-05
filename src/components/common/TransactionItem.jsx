import React from 'react';

export default function TransactionItem({
  merchant,
  category,
  date,
  amount,
  status,
  formatCurrency,
}) {
  const isIncome = amount > 0;
  
  // Format the amount. If formatCurrency function isn't provided, use a simple fallback.
  const formattedAmount = formatCurrency 
    ? formatCurrency(amount) 
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const amtStr = isIncome ? `+${formattedAmount}` : formattedAmount;

  return (
    <div 
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
        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{merchant}</span>
        <div className="flex-align-center" style={{ gap: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{date}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>•</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 500 }}>{category}</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <span className={`badge badge-${status.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>
          {status}
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
}
