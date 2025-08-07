import React from 'react';

const ToolbarButton = ({ icon: Icon, label, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`p-2 text-gray-400 hover:text-gray-600 flex-shrink-0 ${className}`}
    title={label}
  >
    <Icon className="w-4 h-4" />
  </button>
);

export default ToolbarButton; 