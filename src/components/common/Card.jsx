import React from 'react';

export default function Card({ children, className = 'fin-card', style = {}, onClick, ...props }) {
  return (
    <div
      className={className}
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
