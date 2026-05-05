'use client';

import type { ReactNode } from 'react';
import { Checkbox as HeroCheckbox } from '@heroui/checkbox';

export interface CheckboxProps {
  isSelected?: boolean;
  onValueChange: (checked: boolean) => void;
  children?: ReactNode;
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function Checkbox({
  isSelected = false,
  onValueChange,
  children,
  label,
  description,
  className = '',
  disabled = false,
  required = false
}: CheckboxProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center">
        {label && (
          <label className="text-sm font-medium text-gray-700 cursor-pointer">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <HeroCheckbox
          isSelected={isSelected}
          onValueChange={onValueChange}
          isDisabled={disabled}
          classNames={{
            base: ' bg-content1 m-0 w-2 h-2',
            label: 'text-black font-normal',
            wrapper: 'before:border-gray-300 w-4 h-4',
            icon: 'w-2 h-2 rounded-full',
          }}
        >
          {children}
        </HeroCheckbox>
      </div>
      {description && (
        <p className="text-sm text-gray-600 mt-1 ml-6">{description}</p>
      )}
    </div>
  );
}
