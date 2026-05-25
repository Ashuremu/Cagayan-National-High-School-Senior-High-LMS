import { FormField } from './field'

export type TextFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  type?: 'text' | 'email' | 'tel'
  disabled?: boolean
  className?: string
}

export const TextField = ({
  label,
  value,
  onChange,
  required,
  type = 'text',
  disabled,
  className,
}: TextFieldProps) => (
  <FormField label={label} required={required} className={className}>
    <input
      type={type}
      required={required}
      disabled={disabled}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </FormField>
)
