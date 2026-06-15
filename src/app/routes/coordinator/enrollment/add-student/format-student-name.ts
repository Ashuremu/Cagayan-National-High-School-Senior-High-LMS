import type { AddStudentFormValues } from './types'

export const formatStudentName = (form: AddStudentFormValues) => {
  const parts = [form.firstName, form.middleName, form.lastName, form.suffix].filter(Boolean)
  return parts.join(' ')
}
