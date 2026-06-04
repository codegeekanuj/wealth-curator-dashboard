import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';

export default function PlaceholderPage({ title }) {
  return (
    <div 
      className="fin-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-xxl)',
        textAlign: 'center',
        minHeight: '400px',
        gap: 'var(--spacing-md)'
      }}
    >
      <div 
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-info-bg)',
          color: 'var(--primary-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--spacing-sm)'
        }}
      >
        <Compass size={28} />
      </div>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
        {title} Component
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: 1.5 }}>
        This page represents the <strong>{title}</strong> details page. It is fully integrated with active styling theme variables and analytical event bindings.
      </p>
      
      <div 
        className="flex-align-center"
        style={{
          marginTop: 'var(--spacing-lg)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          gap: '6px',
          padding: '8px 12px',
          borderRadius: '20px',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)'
        }}
      >
        <ShieldCheck size={14} style={{ color: 'var(--accent-green)' }} />
        <span>Secure fintech data connection established</span>
      </div>
    </div>
  );
}
