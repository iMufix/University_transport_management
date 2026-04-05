import { memo } from 'react';

export const Button = memo(({ children, onClick, type = 'button', variant = 'primary', isLoading = false, className = '' }) => {
  const baseStyles = "w-full flex justify-center py-2.5 px-4 rounded-xl shadow-sm text-sm font-bold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.05),0_1px_1px_rgba(255,255,255,0.15)_inset]",
    secondary: "text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500 border border-gray-300 shadow-sm",
    danger: "text-white bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-red-500 border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-current opacity-70" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : children}
    </button>
  );
});
Button.displayName = 'Button';
