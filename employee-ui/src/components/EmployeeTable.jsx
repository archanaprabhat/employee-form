import React from 'react';
import { PencilLine, Trash } from 'lucide-react';
import TableHeader from './TableHeader';

const EmployeeTable = ({ 
  employees, 
  selectedRows, 
  filteredEmployees, 
  onRowSelect, 
  onSelectAll, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full">
        <thead>
          <TableHeader 
            selectedRows={selectedRows}
            filteredEmployees={filteredEmployees}
            onSelectAll={onSelectAll}
          />
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee.id} className="border-b border-gray-200">
              <td className="py-3 px-4 text-sm text-gray-900">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={selectedRows.includes(employee.id)}
                    onChange={() => onRowSelect(employee.id)}
                  />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-900">{employee.employeeType}</td>
              <td className="py-3 px-4 text-sm text-gray-900">{employee.firstName}</td>
              <td className="py-3 px-4 text-sm text-gray-900">{employee.lastName}</td>
              <td className="py-3 px-4 text-sm text-gray-900">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onEdit(employee)}
                    className="text-gray-400 hover:text-gray-600"
                    title="Edit Employee"
                  >
                    <PencilLine className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete(employee.id)}
                    className="text-gray-400 hover:text-gray-600"
                    title="Delete Employee"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredEmployees.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable; 