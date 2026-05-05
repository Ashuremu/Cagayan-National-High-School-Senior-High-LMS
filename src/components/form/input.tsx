'use client';

import type { ChangeEvent, ReactNode } from 'react';
import { Input as HeroInput } from '@heroui/input';

export interface InputProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  className?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

export default function Input({
  value = '',
  onChange,
  label,
  placeholder,
  type = 'text',
  className = '',
  description,
  required = false,
  disabled = false,
  error,
  startContent,
  endContent
}: InputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <HeroInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        size="sm"
        variant="bordered"
        isDisabled={disabled}
        isInvalid={!!error}
        required={required}
        startContent={startContent}
        endContent={endContent}
        classNames={{
          inputWrapper: `bg-white border rounded-md ${
            error ? 'border-red-300' : 'border-gray-300'
          }`,
          input: 'text-black',
        }}
        description={description}
        errorMessage={error}
      />
    </div>
  );
}
