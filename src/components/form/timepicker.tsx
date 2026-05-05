import type { ChangeEvent } from 'react';
import { Input as HeroInput } from '@heroui/input';

export interface TimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export default function TimePicker({
  value = '',
  onChange,
  label,
  placeholder,
  className = '',
  description,
  required = false,
  disabled = false,
  error,
}: TimePickerProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <HeroInput
        type="time"
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        size="sm"
        variant="bordered"
        isDisabled={disabled}
        isInvalid={!!error}
        required={required}
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