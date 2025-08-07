import React from 'react';

const InputField = ({ 
  name, 
  label, 
  type = 'text', 
  required = false, 
  disabled = false, 
  placeholder = '', 
  value, 
  onChange, 
  error 
}) => (
  <div>
    <label className="block text-sm text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded text-sm ${
        disabled ? 'bg-gray-50 text-gray-500' : 'bg-white'
      } ${error ? 'border-red-500' : ''}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default InputField; 