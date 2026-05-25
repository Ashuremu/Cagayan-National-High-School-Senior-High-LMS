import type { ReactNode } from 'react'

export type FormFieldProps = {
  label: string
  required?: boolean
  children: ReactNode
  className?: string
  fieldClassName?: string
}

export const FormField = ({
  label,
  required,
  children,
  className = '',
  fieldClassName = 'form-field',
}: FormFieldProps) => (
  <label className={`${fieldClassName} ${className}`.trim()}>
    <span>
      {label}
      {required ? ' *' : ''}
    </span>
    {children}
  </label>
)
