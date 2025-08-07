import React from 'react';
import { Plus } from 'lucide-react';

const Header = ({ mainTabs, activeMainTab, onMainTabClick, onAddNewTab, onCloseTab }) => {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between border-b border-gray-300 w-full overflow-x-auto">
        <div className="flex items-center min-w-0 flex-1">
          {/* Dynamic Tabs */}
          <div className="flex items-center min-w-0">
            {mainTabs.map((tab, index) => (
              <div key={tab.id} className="flex items-center flex-shrink-0">
                <button 
                  onClick={() => onMainTabClick(tab.id)}
                  className={`flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm border-r border-gray-300 whitespace-nowrap min-w-0 ${
                    activeMainTab === tab.id 
                      ? 'text-gray-900 font-medium bg-white' 
                      : 'text-gray-600 bg-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <span className="truncate max-w-[100px] sm:max-w-none">{tab.label}</span>
                  {tab.closeable && mainTabs.length > 1 && (
                    <button 
                      onClick={(e) => onCloseTab(tab.id, e)}
                      className="ml-1 sm:ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <span className="text-sm">×</span>
                    </button>
                  )}
                </button>
              </div>
            ))}
          </div>
          
          {/* Add New Tab Button */}
          <button 
            onClick={onAddNewTab}
            className="px-2 sm:px-3 py-2 border-r border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 flex-shrink-0"
            title="Add New Tab"
          >
            <Plus size={14} className="text-gray-600" />
          </button>
        </div>
        
        {/* Back Button - Hidden on small screens, shown on larger screens */}
        <button className="hidden lg:flex text-blue-500 text-sm items-center mr-5 flex-shrink-0">
          <span className="mr-1">←</span> Back
        </button>
      </div>
    </div>
  );
};

export default Header; 