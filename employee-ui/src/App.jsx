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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreate = () => {
    console.log('Create Employee:', formData);
  };

  const handleCancel = () => {
    console.log('Cancel');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
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

      {/* Blue header bar */}
      <div className='pb-5'></div>
      <div className="bg-blue-100 mx-2">
        <div className="px-4 py-2">
          <h1 className="text-gray-700 mx-3" >Employee Creation</h1>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 pt-4 mx-4">
            {/* Tabs */}
            <div className="flex space-x-8 overflow-x-auto">
              <button className="py-2 text-blue-500 border-b-2 border-blue-500 font-medium text-sm whitespace-nowrap">
                Employee Details
              </button>
              <button className=" py-2 text-gray-500 text-sm hover:text-gray-700 whitespace-nowrap">
                Address
              </button>
              <button className=" py-2 text-gray-500 text-sm hover:text-gray-700 whitespace-nowrap">
                Skill Set
              </button>
            </div>
            
            {/* Three Dots Menu */}
            <div className="flex-shrink-0">
              <button className="text-black text-lg font-bold bg-gray-100 w-5 h-5 flex items-center justify-center">
                ⋮
              </button>
            </div>
          </div>
      {/* Content Box Container */}
      <div className="mx-2 bg-white border border-gray-300 shadow-sm">
        {/* Tabs Header with Three Dots in Same Row */}

        {/* Form Content */}
        <div className="px-4 py-5">
          {/* First Row - Employee ID and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Employee ID <span className="text-gray-400">(Not yet created)</span><span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-500 text-sm"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Employee Type<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="employeeType"
                  value={formData.employeeType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded appearance-none bg-white pr-8 text-sm"
                >
                  <option value="Own">Own</option>
                  <option value="Contract">Contract</option>
                  <option value="Consultant">Consultant</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown />
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Names */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Personal Details Section - Moved outside the padded container */}
        <div className="mb-6">
          <h3 className="text-gray-900 font-medium mb-4 text-base bg-gray-100 py-2 px-4">Personal Details</h3>

          {/* Contact Info Row - Back inside padded container */}
          <div className="px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Mobile Phone
                </label>
                <input
                  type="text"
                  name="mobilePhone"
                  value={formData.mobilePhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Home Phone
                </label>
                <input
                  type="text"
                  name="homePhone"
                  value={formData.homePhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Personal Email
                </label>
                <input
                  type="email"
                  name="personalEmail"
                  value={formData.personalEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Physically Handicapped
                </label>
                <div className="relative">
                  <select
                    name="physicallyHandicapped"
                    value={formData.physicallyHandicapped}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded appearance-none bg-white pr-8 text-gray-500 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note and Buttons Section with Blue Background - Same Line */}
        <div className="bg-blue-50 px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            {/* Privacy Policy Note */}
            <div className="flex-1">
              <p className="text-xs text-gray-700 py-4" >
                <strong>Note:</strong> You acknowledge that you have read and understood our Privacy Policy, <br /> outlining how we collect, use, and protect your personal information.
              </p>
            </div>

            {/* Action Buttons */}
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

        {/* Added Employee Details Table - Fixed UI */}
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="px-4 py-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 space-y-2 sm:space-y-0">
              <h3 className="text-gray-900 font-medium text-sm">Added Employee Details</h3>
              <div className="flex items-center space-x-1 overflow-x-auto">
                {/* Search input - hidden on mobile, show only icon */}
                <div className="relative flex-shrink-0">
                  <input
                    type="text"
                    placeholder="Search By"
                    className="hidden md:block pl-8 pr-3 py-1.5 border border-gray-300 rounded text-xs w-48 sm:w-56 md:w-64 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                  {/* Show only search icon on mobile */}
                  <button className="block md:hidden p-1.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded bg-white hover:bg-gray-50">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-1.5 text-gray-600 hover:text-gray-800 flex-shrink-0 border border-gray-300 rounded bg-white hover:bg-gray-50">
                  <ListFilter className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-600 hover:text-gray-800 flex-shrink-0 border border-gray-300 rounded bg-white hover:bg-gray-50">
                  <Plus className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-600 hover:text-gray-800 flex-shrink-0 border border-gray-300 rounded bg-white hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-600 hover:text-gray-800 flex-shrink-0 border border-gray-300 rounded bg-white hover:bg-gray-50">
                  <Upload className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-600 hover:text-gray-800 flex-shrink-0 border border-gray-300 rounded bg-white hover:bg-gray-50">
                  <Trash className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-600 hover:text-gray-800 flex-shrink-0 border border-gray-300 rounded bg-white hover:bg-gray-50">
                  <EllipsisVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-full bg-white border border-gray-200 rounded">
                <thead>
                  <tr className="bg-blue-50 border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-700 min-w-16">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2 scale-75" />
                        <span>No</span>
                      </div>
                    </th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-700 min-w-32">
                      <div className="flex items-center">
                        <span>Employee Type</span>
                        <Search className="w-3 h-3 text-gray-500 ml-1" />
                      </div>
                    </th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-700 min-w-28">
                      <div className="flex items-center">
                        <span>First Name</span>
                        <Search className="w-3 h-3 text-gray-500 ml-1" />
                      </div>
                    </th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-700 min-w-28">
                      <div className="flex items-center">
                        <span>Last Name</span>
                        <Search className="w-3 h-3 text-gray-500 ml-1" />
                      </div>
                    </th>
                    <th className="text-center py-2 px-3 text-xs font-medium text-gray-700 w-20">
                      Action
                    </th>
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
                        <button className=" p-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-50 mr-2">
                          <PencilLine className="w-3 h-3" />
                        </button>
                        <button className=" p-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-50">
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