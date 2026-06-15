import {
  admitTypeOptions,
  programOptions,
  termOptions,
} from '../add-student/form-options'
import { formatStudentName } from '../add-student/format-student-name'
import type { AddStudentFormValues } from '../add-student/types'
import { buildScheduleRows } from './default-schedules'
import type { RegistrationFormData } from './types'

type BuildRegistrationFormInput = {
  form: AddStudentFormValues
  studentId: string
  subjects: string[]
  registrationDate?: Date
}

const getOptionLabel = (
  options: { value: string; label: string }[],
  value: string,
  fallback = ''
) => options.find((option) => option.value === value)?.label ?? fallback

const formatSchoolYear = (schoolYear: string) =>
  schoolYear.replace(/\s*-\s*/, ' - ')

const formatTermLabel = (term: string) => {
  const label = getOptionLabel(termOptions, term, term)

  if (label.toLowerCase().includes('1st')) return '1ST SEM'
  if (label.toLowerCase().includes('2nd')) return '2ND SEM'

  return label.toUpperCase()
}

const formatStudentTypeLabel = (admitType: string) => {
  const label = getOptionLabel(admitTypeOptions, admitType, admitType)

  if (label.toLowerCase() === 'new') return 'New Student'

  return label
}

const formatParentName = (form: AddStudentFormValues) => {
  const mother = form.mother
  const guardian = form.guardian

  if (mother.firstName || mother.lastName) {
    return [mother.firstName, mother.lastName].filter(Boolean).join(' ')
  }

  if (guardian.firstName || guardian.lastName) {
    return [guardian.firstName, guardian.lastName].filter(Boolean).join(' ')
  }

  return ''
}

const formatRelationship = (form: AddStudentFormValues) => {
  if (form.mother.firstName || form.mother.lastName) {
    return 'Mother'
  }

  return form.guardian.relationship || ''
}

const formatEmergencyContactName = (form: AddStudentFormValues) => formatParentName(form)

const formatEmergencyPhone = (form: AddStudentFormValues) => {
  if (form.mother.mobile) return form.mother.mobile
  if (form.guardian.mobile) return form.guardian.mobile
  return form.mobile
}

const buildUsername = (form: AddStudentFormValues, studentId: string) => {
  const lastName = form.lastName.trim().toLowerCase().replace(/\s+/g, '')
  const paddedId = studentId.padStart(3, '0')

  return `${lastName}.${paddedId}@cnhs.cagayagan.edu.ph`
}

const buildPasswordHint = (form: AddStudentFormValues) => {
  const lastName = form.lastName.replace(/\s+/g, '')
  const capitalizedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()

  return `Your password is ${capitalizedLastName}YYYMMDD where YYYMMDD is your birthdate.`
}

const formatRegistrationDateParts = (date: Date) => ({
  day: String(date.getDate()).padStart(2, '0'),
  month: String(date.getMonth() + 1).padStart(2, '0'),
  year: String(date.getFullYear()),
})

export const buildRegistrationFormData = ({
  form,
  studentId,
  subjects,
  registrationDate = new Date(),
}: BuildRegistrationFormInput): RegistrationFormData => ({
  fullName: formatStudentName(form),
  schoolYear: formatSchoolYear(form.schoolYear),
  program: getOptionLabel(programOptions, form.seniorHighProgram, form.seniorHighProgram.toUpperCase()),
  term: formatTermLabel(form.term),
  studentType: formatStudentTypeLabel(form.admitType),
  studentNumber: studentId,
  parentGuardianName: formatParentName(form),
  telephone: form.telephone,
  mobile: form.mobile || form.mother.mobile || form.guardian.mobile,
  emergencyContactName: formatEmergencyContactName(form),
  emergencyPhone: formatEmergencyPhone(form),
  relationshipToStudent: formatRelationship(form),
  alternatePhone: '',
  schedule: buildScheduleRows(subjects),
  username: buildUsername(form, studentId),
  passwordHint: buildPasswordHint(form),
  registrationDate: formatRegistrationDateParts(registrationDate),
})
