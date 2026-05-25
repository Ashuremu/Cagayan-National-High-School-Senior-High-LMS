import { FormField } from './field'

export type DateFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  className?: string
}

export const DateField = ({
  label,
  value,
  onChange,
  required,
  className,
}: DateFieldProps) => (
  <FormField label={label} required={required} className={className}>
    <input
      type="date"
      required={required}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </FormField>
)
