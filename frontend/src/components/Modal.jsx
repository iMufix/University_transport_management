export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity z-[99] pointer-events-none" 
          aria-hidden="true"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md transition-all duration-300 cursor-pointer pointer-events-auto" onClick={onClose}></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-gray-100 relative z-[101] pointer-events-auto">
          <div className="bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl leading-6 font-bold text-gray-900 tracking-tight">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors">
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="bg-[#fafafa] px-6 py-6 font-sans">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
