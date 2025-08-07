import React, { useState } from 'react';
import { Plus, ChevronDown, ListFilter, Download, Upload, Trash, EllipsisVertical, Search, PencilLine } from 'lucide-react';

// Move reusable components OUTSIDE the main component
const InputField = ({ name, label, type = 'text', required = false, disabled = false, placeholder = '', value, onChange, error }) => (
  <div>
    <label className="block text-sm text-gray-700 mb-1">
      {label}
      {placeholder && <span className="text-gray-400"> {placeholder}</span>}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-3 py-2 border rounded text-sm ${
        disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'
      } ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const SelectField = ({ name, label, options, required = false, value, onChange, error }) => (
  <div>
    <label className="block text-sm text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded appearance-none bg-white pr-8 text-sm ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
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
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const TabButton = ({ tab, activeTab, onClick }) => (
  <button 
    onClick={() => onClick(tab.id)}
    className={`py-2 text-sm whitespace-nowrap ${
      activeTab === tab.id
        ? 'text-blue-500 border-b-2 border-blue-500 font-medium' 
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    {tab.label}
  </button>
);

const ToolbarButton = ({ icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="p-1.5 text-gray-600 hover:text-gray-800 flex-shrink-0 border border-gray-300 rounded bg-white hover:bg-gray-50"
    title={label}
  >
    <Icon className="w-4 h-4" />
  </button>
);

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

const EmployeeCreationForm = () => {
  // Main navigation state
  const [activeMainTab, setActiveMainTab] = useState('employee-creation');
  const [mainTabs, setMainTabs] = useState([
    { id: 'employee-master', label: 'Employee Master', closeable: false },
    { id: 'employee-creation', label: 'Employee Creation', closeable: true }
  ]);

  // Sub-tab state (for form tabs within employee creation)
  const [activeTab, setActiveTab] = useState('employee-details');
  const [employees, setEmployees] = useState([
    { id: 1, employeeType: 'XXXX', firstName: 'XXXXXX', lastName: 'XXXXX' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

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

  // Validation functions
  const validateMobilePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (data) => {
    const newErrors = {};
    
    if (!data.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!data.lastName.trim()) newErrors.lastName = 'Last Name is required';
    
    if (data.mobilePhone && !validateMobilePhone(data.mobilePhone)) {
      newErrors.mobilePhone = 'Mobile phone must be 10 digits';
    }
    
    if (data.homePhone && !validateMobilePhone(data.homePhone)) {
      newErrors.homePhone = 'Home phone must be 10 digits';
    }
    
    if (data.personalEmail && !validateEmail(data.personalEmail)) {
      newErrors.personalEmail = 'Please enter a valid email address';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Process mobile/home phone to only allow numbers
    if (name === 'mobilePhone' || name === 'homePhone') {
      processedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    }

    const newFormData = { ...formData, [name]: processedValue };
    setFormData(newFormData);

    // Real-time validation
    const newErrors = validateForm(newFormData);
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0 && newFormData.firstName && newFormData.lastName);
  };

  const handleCreate = () => {
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!formData.firstName || !formData.lastName) {
      alert('Please fill in required fields');
      return;
    }

    if (editingEmployee) {
      // Update existing employee
      const updatedEmployees = employees.map(emp => 
        emp.id === editingEmployee 
          ? { ...formData, id: editingEmployee }
          : emp
      );
      setEmployees(updatedEmployees);
      setEditingEmployee(null);
      alert('Employee updated successfully!');
    } else {
      // Create new employee
      const newEmployee = {
        id: employees.length + 1,
        employeeId: `EMP${String(employees.length + 1).padStart(3, '0')}`,
        ...formData
      };
      setEmployees([...employees, newEmployee]);
      alert('Employee created successfully!');
    }

    // Reset form
    setFormData({
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
    setErrors({});
    setIsFormValid(false);
  };

  const handleCancel = () => {
    setFormData({
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
    setErrors({});
    setIsFormValid(false);
    setEditingEmployee(null);
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingEmployee(employee.id);
    setActiveTab('employee-details');
  };

  const handleDelete = (employeeId) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
      setSelectedRows(selectedRows.filter(id => id !== employeeId));
    }
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      alert('Please select employees to delete');
      return;
    }
    
    if (confirm(`Are you sure you want to delete ${selectedRows.length} employee(s)?`)) {
      setEmployees(employees.filter(emp => !selectedRows.includes(emp.id)));
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (employeeId) => {
    setSelectedRows(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedRows(checked ? filteredEmployees.map(emp => emp.id) : []);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Employee Type,First Name,Middle Name,Last Name,Mobile Phone,Email\n"
      + employees.map(emp => 
          `${emp.employeeId || emp.id},${emp.employeeType},${emp.firstName},${emp.middleName || ''},${emp.lastName},${emp.mobilePhone || ''},${emp.personalEmail || ''}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employees.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Main tab functions
  const handleMainTabClick = (tabId) => {
    setActiveMainTab(tabId);
  };

  const handleAddNewTab = () => {
    const newTabId = `employee-creation-${Date.now()}`;
    const newTab = {
      id: newTabId,
      label: 'Employee Creation',
      closeable: true
    };
    setMainTabs([...mainTabs, newTab]);
    setActiveMainTab(newTabId);
    // Reset form when creating new tab
    handleCancel();
  };

  const handleCloseTab = (tabId, e) => {
    e.stopPropagation();
    if (mainTabs.length <= 1) return; // Prevent closing last tab
    
    const updatedTabs = mainTabs.filter(tab => tab.id !== tabId);
    setMainTabs(updatedTabs);
    
    // If closing active tab, switch to the first available tab
    if (activeMainTab === tabId) {
      setActiveMainTab(updatedTabs[0].id);
    }
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter(emp => 
    emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeType.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    { icon: ListFilter, label: 'Filter', onClick: () => alert('Filter functionality') },
    { icon: Plus, label: 'Add', onClick: () => setActiveTab('employee-details') },
    { icon: Download, label: 'Download', onClick: handleExport },
    { icon: Upload, label: 'Upload', onClick: () => alert('Upload functionality') },
    { icon: Trash, label: 'Delete', onClick: handleBulkDelete },
    { icon: EllipsisVertical, label: 'More', onClick: () => alert('More options') }
  ];

  const tabs = [
    { id: 'employee-details', label: 'Employee Details' },
    { id: 'address', label: 'Address' },
    { id: 'skill-set', label: 'Skill Set' }
  ];

  // Employee Master Page Component
  const renderEmployeeMasterPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className='pb-5'></div>
      <div className="bg-blue-100 mx-2">
        <div className="px-4 py-2">
          <h1 className="text-gray-700 mx-3">Employee Master</h1>
        </div>
      </div>

      {/* Employee Master Content */}
      <div className="mx-2 mt-4 bg-white border border-gray-300 shadow-sm">
        <div className="px-4 py-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-xl font-medium text-gray-800 mb-2">Welcome to Employee Master</h2>
              <p className="text-gray-600 text-sm">
                This is the main dashboard for managing all your employees. Here you can view, search, and manage your employee database.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button 
                onClick={() => handleAddNewTab()}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Employee</span>
              </button>
              
              <button 
                className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Search className="w-4 h-4" />
                <span>Search Employees</span>
              </button>
            </div>

            {/* Employee Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{employees.length}</div>
                <div className="text-xs text-gray-500">Total Employees</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {employees.filter(emp => emp.employeeType === 'Own').length}
                </div>
                <div className="text-xs text-gray-500">Own Employees</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {employees.filter(emp => emp.employeeType === 'Contract').length}
                </div>
                <div className="text-xs text-gray-500">Contract</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {employees.filter(emp => emp.employeeType === 'Consultant').length}
                </div>
                <div className="text-xs text-gray-500">Consultants</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main content renderer based on active main tab
  const renderMainContent = () => {
    if (activeMainTab === 'employee-master') {
      return renderEmployeeMasterPage();
    } else {
      // Employee Creation page (default)
      return renderEmployeeCreationPage();
    }
  };

  const renderEmployeeCreationPage = () => (
    <div className="min-h-screen bg-gray-50">
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
            <TabButton key={tab.id} tab={tab} activeTab={activeTab} onClick={setActiveTab} />
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
        {/* Dynamic Tab Content */}
        {renderTabContent()}

        {/* Personal Details Section - Only show on Employee Details tab */}
        {activeTab === 'employee-details' && (
          <div className="mb-6">
            <h3 className="text-gray-900 font-medium mb-4 text-base bg-gray-100 py-2 px-4">
              Personal Details
            </h3>
            <div className="px-4 mr-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {personalDetailsFields.map(field => (
                  field.type === 'select' ? (
                    <SelectField
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      options={field.options}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      error={errors[field.name]}
                    />
                  ) : (
                    <InputField
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      error={errors[field.name]}
                    />
                  )
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Privacy Notice and Action Buttons - Only show on Employee Details tab */}
        {activeTab === 'employee-details' && (
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
                  disabled={!isFormValid}
                  className={`px-4 py-1.5 rounded text-xs ${
                    isFormValid 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {editingEmployee ? 'Update Employee' : 'Create Employee'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Employee Details Table */}
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="px-4 py-3">
            {/* Table Header with Search and Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 space-y-2 sm:space-y-0">
              <h3 className="text-gray-900 font-medium text-sm">
                Added Employee Details ({filteredEmployees.length})
              </h3>
              <div className="flex items-center space-x-1 overflow-x-auto">
                {/* Search Input */}
                <div className="relative flex-shrink-0">
                  <input
                    type="text"
                    placeholder="Search By"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                  <ToolbarButton key={index} icon={button.icon} label={button.label} onClick={button.onClick} />
                ))}
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-full bg-white border border-gray-200 rounded">
                <thead>
                  <tr className="bg-blue-50 border-b border-gray-200">
                    {tableHeaders.map(header => (
                      <TableHeader 
                        key={header.key} 
                        header={header} 
                        selectedRows={selectedRows}
                        filteredEmployees={filteredEmployees}
                        onSelectAll={handleSelectAll}
                      />
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee, index) => (
                    <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-3 text-xs text-gray-900">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="mr-2 scale-75"
                            checked={selectedRows.includes(employee.id)}
                            onChange={() => handleRowSelect(employee.id)}
                          />
                          <span>{String(index + 1).padStart(2, '0')}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-xs text-gray-900">{employee.employeeType}</td>
                      <td className="py-2 px-3 text-xs text-gray-900">{employee.firstName}</td>
                      <td className="py-2 px-3 text-xs text-gray-900">{employee.lastName}</td>
                      <td className="py-2 px-3 text-xs text-gray-900">
                        <div className="flex justify-center space-x-1">
                          <button 
                            onClick={() => handleEdit(employee)}
                            className="p-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-50 mr-2"
                            title="Edit Employee"
                          >
                            <PencilLine className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => handleDelete(employee.id)}
                            className="p-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-50"
                            title="Delete Employee"
                          >
                            <Trash className="w-3 h-3" />
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
          </div>
        </div>
              </div>
      </div>
    );

  // Tab content renderer
  const renderTabContent = () => {
    switch(activeTab) {
      case 'employee-details':
        return (
          <div className="px-4 py-5 mr-20">
            {/* Employee ID and Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
              <InputField
                name="employeeId"
                label="Employee ID"
                placeholder="(Not yet created)"
                required={true}
                disabled={true}
                value={formData.employeeId}
                onChange={handleInputChange}
                error={errors.employeeId}
              />
              <SelectField
                name="employeeType"
                label="Employee Type"
                options={employeeTypeOptions}
                required={true}
                value={formData.employeeType}
                onChange={handleInputChange}
                error={errors.employeeType}
              />
            </div>

            {/* Name Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {nameFields.map(field => (
                <InputField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  error={errors[field.name]}
                />
              ))}
            </div>
          </div>
        );
      
      case 'address':
        return (
          <div className="px-4 py-5 text-center">
            <h2 className="text-xl text-gray-600">Address Tab</h2>
            <p className="text-gray-500 mt-2">Address form fields would go here</p>
          </div>
        );
      
      case 'skill-set':
        return (
          <div className="px-4 py-5 text-center">
            <h2 className="text-xl text-gray-600">Skill Set Tab</h2>
            <p className="text-gray-500 mt-2">Skill set form fields would go here</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white">
        <div className="flex items-center justify-between border-b border-gray-300 w-full overflow-x-auto">
          <div className="flex items-center min-w-0 flex-1">
            {/* Dynamic Tabs */}
            <div className="flex items-center min-w-0">
              {mainTabs.map((tab, index) => (
                <div key={tab.id} className="flex items-center flex-shrink-0">
                  <button 
                    onClick={() => handleMainTabClick(tab.id)}
                    className={`flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm border-r border-gray-300 whitespace-nowrap min-w-0 ${
                      activeMainTab === tab.id 
                        ? 'text-gray-900 font-medium bg-white' 
                        : 'text-gray-600 bg-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <span className="truncate max-w-[100px] sm:max-w-none">{tab.label}</span>
                    {tab.closeable && mainTabs.length > 1 && (
                      <button 
                        onClick={(e) => handleCloseTab(tab.id, e)}
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
              onClick={handleAddNewTab}
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

      {/* Main Content */}
      {renderMainContent()}
    </div>
  );
};

export default EmployeeCreationForm;