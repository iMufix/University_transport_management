import { memo } from 'react';

export const Card = memo(({ children, className = '', hover = true }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${hover ? 'hover:shadow-md transition-shadow cursor-default' : ''} ${className}`}>
      {children}
    </div>
  );
});
Card.displayName = 'Card';
