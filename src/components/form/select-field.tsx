import { FormField } from './field'
import type { SelectOption } from './types'

export type SelectFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  required?: boolean
  className?: string
}

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required,
  className,
}: SelectFieldProps) => (
  <FormField label={label} required={required} className={className}>
    <select
      required={required}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </FormField>
)
