import React, { useState } from 'react';

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
    <div className="bg-gray-50 p-8">
      {/* Form Content */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create Employee</h2>

        {/* First Row - Employee ID and Type */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Employee ID <span className="text-gray-400">(Not yet created)</span><span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded appearance-none bg-white pr-8"
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
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
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
              className="w-full px-3 py-2 border border-gray-300 rounded"
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
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="mb-6">
          <h3 className="text-gray-900 font-medium mb-4">Personal Details</h3>
          
          {/* Third Row - Contact Info */}
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Mobile Phone
              </label>
              <input
                type="text"
                name="mobilePhone"
                value={formData.mobilePhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
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
                className="w-full px-3 py-2 border border-gray-300 rounded"
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
                className="w-full px-3 py-2 border border-gray-300 rounded"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded appearance-none bg-white pr-8 text-gray-500"
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
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreationForm;