'use client';

import React from 'react';
import { Input } from '@heroui/input';

export interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  description?: string;
  min?: string;
  max?: string;
  required?: boolean;
}

export default function DatePicker({
  value = '',
  onChange,
  label,
  placeholder,
  className = '',
  description,
  min,
  max,
  required = false
}: DatePickerProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Input
        type="date"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="sm"
        variant="bordered"
        min={min}
        max={max}
        required={required}
        classNames={{
          inputWrapper: 'bg-white border border-gray-300 rounded-md',
          input: 'text-black',
        }}
        description={description}
      />
    </div>
  );
}
