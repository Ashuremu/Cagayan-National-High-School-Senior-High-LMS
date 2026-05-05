'use client';

import type { ChangeEvent } from 'react';
import { Input } from '@heroui/input';

export interface SearchProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function Search({
  value = '',
  onChange,
  label,
  placeholder = 'Search...',
  className = '',
  description,
  required = false,
  disabled = false
}: SearchProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        size="sm"
        variant="bordered"
        isDisabled={disabled}
        required={required}
        startContent={
          <svg 
            className="w-4 h-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        }
        classNames={{
          inputWrapper: 'bg-white border border-gray-300 rounded-md',
          input: 'text-black',
        }}
        description={description}
      />
    </div>
  );
}
