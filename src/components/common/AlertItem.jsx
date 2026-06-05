import React from 'react';
import { AlertCircle, AlertTriangle, Target, Info } from 'lucide-react';

export default function AlertItem({
  title,
  category,
  description,
  time,
  type = 'info',
  variant = 'border',
  icon,
}) {
  // Color configuration mapping based on alert severity
  const getAlertStyles = (alertType) => {
    switch (alertType) {
      case 'critical':
        return {
          bg: 'var(--color-critical-bg)',
          border: 'var(--color-critical-border)',
          color: 'var(--color-critical)',
          DefaultIcon: AlertTriangle
        };
      case 'warning':
        return {
          bg: 'var(--color-warning-bg)',
          border: 'var(--color-warning-border)',
          color: 'var(--accent-orange)',
          DefaultIcon: AlertCircle
        };
      case 'success':
        return {
          bg: 'var(--color-success-bg)',
          border: 'var(--color-success-border)',
          color: 'var(--accent-green)',
          DefaultIcon: Target
        };
      default:
        return {
          bg: 'var(--color-info-bg)',
          border: 'var(--color-info-border)',
          color: 'var(--primary-blue)',
          DefaultIcon: Info
        };
    }
  };

  const styles = getAlertStyles(type);
  const IconToRender = icon || styles.DefaultIcon;

  if (variant === 'icon') {
    return (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <div style={{
          padding: '6px',
          borderRadius: '50%',
          backgroundColor: styles.bg,
          color: styles.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {React.isValidElement(IconToRender) ? IconToRender : <IconToRender size={14} />}
        </div>
        <div style={{ flexGrow: 1 }}>
          <div className="flex-between">
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{title}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{time}</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {description}
          </p>
        </div>
      </div>
    );
  }

  // Default 'border' style card
  return (
    <div
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
            {category}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {time}
          </span>
        </div>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginTop: '2px', color: 'var(--text-primary)' }}>
          {title}
        </h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
