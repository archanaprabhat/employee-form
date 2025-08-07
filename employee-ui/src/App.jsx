import React, { useState } from 'react';
import { Plus, ChevronDown, ListFilter, Download, Upload, Trash, EllipsisVertical, Search, PencilLine } from 'lucide-react';

const EmployeeCreationForm = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeType: 'Own',
    firstName: '',
    middleName: '',
    lastName: '',
    mobilePhone: '',
    homePhone: '',
    personalEmail: '',
    physicallyHandicapped: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => console.log('Create Employee:', formData);
  const handleCancel = () => console.log('Cancel');

  // Form field configurations
  const employeeTypeOptions = [
    { value: 'Own', label: 'Own' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Consultant', label: 'Consultant' }
  ];

  const physicallyHandicappedOptions = [
    { value: '', label: 'Select' },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  const nameFields = [
    { name: 'firstName', label: 'First Name', required: true },
    { name: 'middleName', label: 'Middle Name', required: false },
    { name: 'lastName', label: 'Last Name', required: true }
  ];

  const personalDetailsFields = [
    { name: 'mobilePhone', label: 'Mobile Phone', type: 'text' },
    { name: 'homePhone', label: 'Home Phone', type: 'text' },
    { name: 'personalEmail', label: 'Personal Email', type: 'email' },
    { 
      name: 'physicallyHandicapped', 
      label: 'Physically Handicapped', 
      type: 'select',
      options: physicallyHandicappedOptions 
    }
  ];

  const tableHeaders = [
    { key: 'no', label: 'No', hasCheckbox: true, searchable: false },
    { key: 'employeeType', label: 'Employee Type', hasCheckbox: false, searchable: true },
    { key: 'firstName', label: 'First Name', hasCheckbox: false, searchable: true },
    { key: 'lastName', label: 'Last Name', hasCheckbox: false, searchable: true },
    { key: 'action', label: 'Action', hasCheckbox: false, searchable: false, center: true }
  ];

  const toolbarButtons = [
    { icon: ListFilter, label: 'Filter' },
    { icon: Plus, label: 'Add' },
    { icon: Download, label: 'Download' },
    { icon: Upload, label: 'Upload' },
    { icon: Trash, label: 'Delete' },
    { icon: EllipsisVertical, label: 'More' }
  ];

  const tabs = [
    { id: 'employee-details', label: 'Employee Details', active: true },
    { id: 'address', label: 'Address', active: false },
    { id: 'skill-set', label: 'Skill Set', active: false }
  ];

  // Reusable components
  const InputField = ({ name, label, type = 'text', required = false, disabled = false, placeholder = '' }) => (
    <div>
      <label className="block text-sm text-gray-700 mb-1">
        {label}
        {placeholder && <span className="text-gray-400"> {placeholder}</span>}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border border-gray-300 rounded text-sm ${
          disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'
        }`}
      />
    </div>
  );

  const SelectField = ({ name, label, options, required = false }) => (
    <div>
      <label className="block text-sm text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded appearance-none bg-white pr-8 text-sm"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown />
        </div>
      </div>
    </div>
  );

  const TabButton = ({ tab }) => (
    <button 
      className={`py-2 text-sm whitespace-nowrap ${
        tab.active 
          ? 'text-blue-500 border-b-2 border-blue-500 font-medium' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {tab.label}
    </button>
  );

  const ToolbarButton = ({ icon: Icon, label }) => (
    <button className="p-1.5 text-gray-600 hover:text-gray-800 flex-shrink-0 border border-gray-300 rounded bg-white hover:bg-gray-50">
      <Icon className="w-4 h-4" />
    </button>
  );

  const TableHeader = ({ header }) => (
    <th className={`py-2 px-3 text-xs font-medium text-gray-700 ${
      header.center ? 'text-center w-20' : 'text-left'
    } ${header.key === 'no' ? 'min-w-16' : header.key === 'employeeType' ? 'min-w-32' : 'min-w-28'}`}>
      <div className="flex items-center">
        {header.hasCheckbox && <input type="checkbox" className="mr-2 scale-75" />}
        <span>{header.label}</span>
        {header.searchable && <Search className="w-3 h-3 text-gray-500 ml-1" />}
      </div>
    </th>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white">
        <div className="flex flex-wrap items-center justify-between border-b border-gray-300 w-full">
          <div className="flex flex-wrap items-center w-full sm:w-auto">
            <button className="px-4 py-2 text-sm text-gray-600 bg-gray-100 border-r border-gray-300 whitespace-nowrap">
              Employee Master
            </button>
            <button className="px-4 py-2 text-sm text-gray-900 font-medium bg-white whitespace-nowrap">
              Employee Creation
            </button>
            <button className="px-3 py-2 border-l border-gray-300 flex items-center justify-center bg-white whitespace-nowrap">
              <Plus size={16} color='gray' />
            </button>
          </div>
          <button className="hidden lg:flex text-blue-500 text-sm items-center mr-5">
            <span className="mr-1">←</span> Back
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className='pb-5'></div>
      <div className="bg-blue-100 mx-2">
        <div className="px-4 py-2">
          <h1 className="text-gray-700 mx-3">Employee Creation</h1>
        </div>
      </div>

      {/* Tabs and Menu */}
      <div className="flex items-center justify-between px-4 pt-4 mx-4">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map(tab => (
            <TabButton key={tab.id} tab={tab} />
          ))}
        </div>
        <div className="flex-shrink-0">
          <button className="text-black text-lg font-bold bg-gray-100 w-5 h-5 flex items-center justify-center">
            ⋮
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="mx-2 bg-white border border-gray-300 shadow-sm">
        {/* Employee Details Form */}
        <div className="px-4 py-5">
          {/* Employee ID and Type Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <InputField
              name="employeeId"
              label="Employee ID"
              placeholder="(Not yet created)"
              required={true}
              disabled={true}
            />
            <SelectField
              name="employeeType"
              label="Employee Type"
              options={employeeTypeOptions}
              required={true}
            />
          </div>

          {/* Name Fields Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {nameFields.map(field => (
              <InputField
                key={field.name}
                name={field.name}
                label={field.label}
                required={field.required}
              />
            ))}
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="mb-6">
          <h3 className="text-gray-900 font-medium mb-4 text-base bg-gray-100 py-2 px-4">
            Personal Details
          </h3>
          <div className="px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personalDetailsFields.map(field => (
                field.type === 'select' ? (
                  <SelectField
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    options={field.options}
                  />
                ) : (
                  <InputField
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                  />
                )
              ))}
            </div>
          </div>
        </div>

        {/* Privacy Notice and Action Buttons */}
        <div className="bg-blue-50 px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex-1">
              <p className="text-xs text-gray-700 py-4">
                <strong>Note:</strong> You acknowledge that you have read and understood our Privacy Policy, <br />
                outlining how we collect, use, and protect your personal information.
              </p>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
              <button
                onClick={handleCancel}
                className="px-4 py-1.5 border border-red-500 text-red-500 rounded hover:bg-red-50 text-xs bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
              >
                Create Employee
              </button>
            </div>
          </div>
        </div>

        {/* Employee Details Table */}
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="px-4 py-3">
            {/* Table Header with Search and Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 space-y-2 sm:space-y-0">
              <h3 className="text-gray-900 font-medium text-sm">Added Employee Details</h3>
              <div className="flex items-center space-x-1 overflow-x-auto">
                {/* Search Input */}
                <div className="relative flex-shrink-0">
                  <input
                    type="text"
                    placeholder="Search By"
                    className="hidden md:block pl-8 pr-3 py-1.5 border border-gray-300 rounded text-xs w-48 sm:w-56 md:w-64 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="block md:hidden p-1.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded bg-white hover:bg-gray-50">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                {/* Toolbar Buttons */}
                {toolbarButtons.map((button, index) => (
                  <ToolbarButton key={index} icon={button.icon} label={button.label} />
                ))}
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-full bg-white border border-gray-200 rounded">
                <thead>
                  <tr className="bg-blue-50 border-b border-gray-200">
                    {tableHeaders.map(header => (
                      <TableHeader key={header.key} header={header} />
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-3 text-xs text-gray-900">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2 scale-75" />
                        <span>01</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-xs text-gray-900">XXXX</td>
                    <td className="py-2 px-3 text-xs text-gray-900">XXXXXX</td>
                    <td className="py-2 px-3 text-xs text-gray-900">XXXXX</td>
                    <td className="py-2 px-3 text-xs text-gray-900">
                      <div className="flex justify-center space-x-1">
                        <button className="p-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-50 mr-2">
                          <PencilLine className="w-3 h-3" />
                        </button>
                        <button className="p-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-50">
                          <Trash className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreationForm;