import React, { useState } from 'react';

import { Plus } from 'lucide-react';

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
      {/* Header */}
      <div>
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
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="px-4 py-3">
          <h1 className="text-gray-900 font-medium text-base">Employee Creation</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4">
          <div className="flex space-x-8 overflow-x-auto">
            <button className="py-4 text-blue-600 border-b-2 border-blue-600 font-medium text-sm whitespace-nowrap">
              Employee Details
            </button>
            <button className="py-4 text-gray-500 text-sm hover:text-gray-700 whitespace-nowrap">
              Address
            </button>
            <button className="py-4 text-gray-500 text-sm hover:text-gray-700 whitespace-nowrap">
              Skill Set
            </button>
          </div>
          <div className="flex justify-end py-2">
            <button className="text-gray-400">⋮</button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white">
        <div className="px-4 py-6">
          {/* First Row - Employee ID and Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Employee ID <span className="text-gray-400">(Not yet created)</span><span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500 text-sm"
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
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Names */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
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

          {/* Personal Details Section */}
          <div className="mb-6">
            <h3 className="text-gray-900 font-medium mb-4 text-base">Personal Details</h3>

            {/* Third Row - Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy Note */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> You acknowledge that you have read and understood our Privacy Policy,
              outlining how we collect, use, and protect your personal information.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Create Employee
            </button>
          </div>
        </div>
      </div>

      {/* Employee Table Section */}
      <div className="bg-white mt-6">
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
            <h3 className="text-gray-900 font-medium text-base">Added Employee Details</h3>
            <div className="flex items-center space-x-2 overflow-x-auto">
              <div className="relative flex-shrink-0">
                <input
                  type="text"
                  placeholder="Search By"
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded text-sm w-32 sm:w-auto"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 flex-shrink-0">+</button>
              <button className="p-2 text-gray-400 hover:text-gray-600 flex-shrink-0">↓</button>
              <button className="p-2 text-gray-400 hover:text-gray-600 flex-shrink-0">↗</button>
              <button className="p-2 text-gray-400 hover:text-gray-600 flex-shrink-0">📋</button>
              <button className="p-2 text-gray-400 hover:text-gray-600 flex-shrink-0">⋮</button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    <input type="checkbox" className="mr-2" />
                    <span className="hidden sm:inline">No</span>
                    <span className="sm:hidden">#</span>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    <span className="hidden sm:inline">Employee Type</span>
                    <span className="sm:hidden">Type</span>
                    <button className="ml-1 text-gray-400">↕</button>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    <span className="hidden sm:inline">First Name</span>
                    <span className="sm:hidden">First</span>
                    <button className="ml-1 text-gray-400">↕</button>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    <span className="hidden sm:inline">Last Name</span>
                    <span className="sm:hidden">Last</span>
                    <button className="ml-1 text-gray-400">↕</button>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 text-sm text-gray-900">
                    <input type="checkbox" className="mr-2" />
                    01
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">XXXX</td>
                  <td className="py-3 px-4 text-sm text-gray-900">XXXXXX</td>
                  <td className="py-3 px-4 text-sm text-gray-900">XXXXX</td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">✏️</button>
                      <button className="text-gray-400 hover:text-gray-600">🗑️</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreationForm;