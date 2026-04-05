import { memo } from 'react';

export const Badge = memo(({ color = 'gray', className = '', children }) => {
  const colors = {
    red: 'bg-red-50 text-red-700 border-red-200 shadow-sm',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200 shadow-sm',
    green: 'bg-green-50 text-green-700 border-green-200 shadow-sm',
    blue: 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm',
    purple: 'bg-purple-50 text-purple-700 border-purple-200 shadow-sm',
    orange: 'bg-orange-50 text-orange-700 border-orange-200 shadow-sm',
    gray: 'bg-gray-100 text-gray-800 border-gray-200 shadow-sm',
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider border ${colors[color] || colors.gray} ${className}`}>
      {children}
    </span>
  );
});
Badge.displayName = 'Badge';
