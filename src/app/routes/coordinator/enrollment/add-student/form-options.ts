import type { SelectOption } from '../../../../../components/form/types'

export const admitTypeOptions: SelectOption[] = [
  { value: 'new', label: 'New' },
  { value: 'transferee', label: 'Transferee' },
  { value: 'returnee', label: 'Returnee' },
]

export const schoolYearOptions: SelectOption[] = [
  { value: '2025-2026', label: '2025-2026' },
  { value: '2026-2027', label: '2026-2027' },
]

export const schoolYearExtendedOptions: SelectOption[] = [
  { value: '2024-2025', label: '2024-2025' },
  ...schoolYearOptions,
]

export const termOptions: SelectOption[] = [
  { value: '1', label: '1st Semester' },
  { value: '2', label: '2nd Semester' },
]

export const studentTypeOptions: SelectOption[] = [
  { value: 'regular', label: 'Regular' },
  { value: 'irregular', label: 'Irregular' },
]

export const gradeOptions: SelectOption[] = [
  { value: '11', label: 'Grade 11' },
  { value: '12', label: 'Grade 12' },
]

export const programOptions: SelectOption[] = [
  { value: 'stem', label: 'STEM' },
  { value: 'abm', label: 'ABM' },
  { value: 'humss', label: 'HUMSS' },
  { value: 'gas', label: 'GAS' },
  { value: 'tvl', label: 'TVL' },
]

export const genderOptions: SelectOption[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

export const statusOptions: SelectOption[] = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
]

export const schoolTypeOptions: SelectOption[] = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
]
