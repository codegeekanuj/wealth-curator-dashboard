import React from 'react';

export default function RadialGauge({
  score,
  label,
  color = 'var(--primary-blue)',
  size = 100,
  strokeWidth = 8,
  showPercentageSign = false,
  labelColor,
}) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.2
  const strokeDashoffset = circumference - (circumference * Math.max(0, Math.min(score, 100))) / 100;

  return (
    <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          stroke="var(--border-color)" 
          strokeWidth={strokeWidth} 
          fill="transparent" 
        />
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          stroke={color} 
          strokeWidth={strokeWidth} 
          fill="transparent" 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset} 
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
        <span style={{ 
          fontSize: size > 100 ? '1.6rem' : '1.4rem', 
          fontWeight: 800, 
          fontFamily: 'var(--font-heading)',
          color: size > 100 ? 'var(--text-primary)' : undefined 
        }}>
          {score}{showPercentageSign ? '%' : ''}
        </span>
        <span style={{ 
          fontSize: size > 100 ? '0.6rem' : '0.65rem', 
          fontWeight: 700, 
          textTransform: 'uppercase', 
          letterSpacing: size > 100 ? '0.05em' : undefined,
          color: labelColor || 'var(--text-muted)'
        }}>
          {label}
        </span>
      </div>
    </div>
  );
}
