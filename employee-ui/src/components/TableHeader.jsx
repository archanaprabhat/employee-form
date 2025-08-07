import React from 'react';
import { Search } from 'lucide-react';

const TableHeader = ({ header, selectedRows, filteredEmployees, onSelectAll }) => (
  <th className={`py-2 px-3 text-xs font-medium text-gray-700 ${
    header.center ? 'text-center w-20' : 'text-left'
  } ${header.key === 'no' ? 'min-w-16' : header.key === 'employeeType' ? 'min-w-32' : 'min-w-28'}`}>
    <div className="flex items-center">
      {header.hasCheckbox && (
        <input 
          type="checkbox" 
          className="mr-2 scale-75"
          checked={selectedRows.length === filteredEmployees.length && filteredEmployees.length > 0}
          onChange={(e) => onSelectAll(e.target.checked)}
        />
      )}
      <span>{header.label}</span>
      {header.searchable && <Search className="w-3 h-3 text-gray-500 ml-1" />}
    </div>
  </th>
);

export default TableHeader; 