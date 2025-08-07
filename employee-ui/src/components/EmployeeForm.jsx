import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';

const EmployeeForm = ({ 
  formData, 
  errors, 
  onInputChange, 
  onCreate, 
  onCancel,
  employeeTypeOptions,
  nameFields,
  personalDetailsFields 
}) => {
  return (
    <div className="bg-white">
      <div className="px-4 py-6">
        {/* First Row - Employee ID and Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <InputField
            name="employeeId"
            label="Employee ID"
            placeholder="(Not yet created)"
            required={true}
            disabled={true}
            value={formData.employeeId}
            onChange={onInputChange}
            error={errors.employeeId}
          />
          <SelectField
            name="employeeType"
            label="Employee Type"
            options={employeeTypeOptions}
            required={true}
            value={formData.employeeType}
            onChange={onInputChange}
            error={errors.employeeType}
          />
        </div>

        {/* Second Row - Names */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {nameFields.map(field => (
            <InputField
              key={field.name}
              name={field.name}
              label={field.label}
              required={field.required}
              value={formData[field.name]}
              onChange={onInputChange}
              error={errors[field.name]}
            />
          ))}
        </div>

        {/* Personal Details Section */}
        <div className="mb-6">
          <h3 className="text-gray-900 font-medium mb-4 text-base">Personal Details</h3>
          <div className="px-4 mr-0 lg:mr-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personalDetailsFields.map(field => (
                field.type === 'select' ? (
                  <SelectField
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    options={field.options}
                    value={formData[field.name]}
                    onChange={onInputChange}
                    error={errors[field.name]}
                  />
                ) : (
                  <InputField
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={onInputChange}
                    error={errors[field.name]}
                  />
                )
              ))}
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
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Create Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm; 