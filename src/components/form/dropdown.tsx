'use client';

import type { Key } from 'react';
import { Select, SelectItem } from '@heroui/select';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'bordered' | 'flat' | 'faded';
}

export default function Dropdown({
  options,
  value,
  onChange,
  label,
  placeholder,
  className = '',
  size = 'sm',
  variant = 'bordered'
}: DropdownProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Select
        selectedKeys={value ? new Set([value]) : new Set()}
        onSelectionChange={(keys: 'all' | Set<Key>) => {
          if (keys === 'all') return;
          const selected = Array.from(keys)[0];
          if (!selected) return;
          onChange(String(selected));
        }}
        size={size}
        variant={variant}
        className="w-full"
        selectionMode="single"
        disallowEmptySelection
        placeholder={placeholder}
        classNames={{
          trigger: 'relative pr-8 bg-white text-black border border-gray-300 rounded-md',
          value: 'text-black',
          listbox: 'bg-white text-black',
          popoverContent: 'bg-white border border-gray-200',
          selectorIcon: 'absolute right-3 text-gray-700',
        }}
      >
        {options.map((option) => (
          <SelectItem key={option.value} textValue={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
