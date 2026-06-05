import React from 'react';

export default function ProgressBar({
  percentage,
  height = '8px',
  color = 'var(--primary-blue)',
  trackColor = 'var(--bg-tertiary)',
  borderRadius = '4px',
  transition = 'width 1s ease-in-out',
  style = {},
  fillStyle = {},
}) {
  const boundedPercentage = Math.max(0, Math.min(percentage, 100));

  // Determine standard background vs backgroundColor based on input type
  const isGradient = color.includes('gradient') || color.includes('var(');
  const fillBackground = isGradient ? { background: color } : { backgroundColor: color };

  return (
    <div
      style={{
        width: '100%',
        height,
        backgroundColor: trackColor,
        borderRadius,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          width: `${boundedPercentage}%`,
          height: '100%',
          borderRadius,
          transition,
          ...fillBackground,
          ...fillStyle,
        }}
      />
    </div>
  );
}
