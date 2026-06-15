import type { AddStudentFormValues } from './add-student/types'

export type EnrollmentStatus = 'PENDING' | 'ENROLLED' | 'REJECTED'

export type EnrollmentRecord = {
  id: string
  name: string
  studentId: string
  gradeSection: string
  enrollmentDate: string
  status: EnrollmentStatus
  formData?: AddStudentFormValues
}

export type ApprovalDetails = {
  section: string
  subjects: string[]
  remarks: string
}
