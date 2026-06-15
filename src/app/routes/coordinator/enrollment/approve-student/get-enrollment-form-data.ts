import { getTestStudentFormValues } from '../add-student/test-data'
import type { AddStudentFormValues } from '../add-student/types'
import type { EnrollmentRecord } from '../types'

export const getEnrollmentFormData = (record: EnrollmentRecord): AddStudentFormValues => {
  if (record.formData) {
    return record.formData
  }

  const testData = getTestStudentFormValues()

  return {
    ...testData,
    learnersReferenceNumber: '123456789012',
    schoolYear: '2026 - 2027',
    firstName: record.name.split(' ')[0] ?? testData.firstName,
    lastName: record.name.split(' ').slice(1).join(' ') || testData.lastName,
  }
}
