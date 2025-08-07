import React from 'react';

const TabButton = ({ tab, activeTab, onClick }) => (
  <button
    onClick={() => onClick(tab.id)}
    className={`py-4 text-sm whitespace-nowrap border-b-2 transition-colors ${
      activeTab === tab.id
        ? 'text-blue-600 border-blue-600 font-medium'
        : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
    }`}
  >
    {tab.label}
  </button>
);

export default TabButton; 