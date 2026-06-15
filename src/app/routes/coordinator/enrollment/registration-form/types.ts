export type RegistrationScheduleRow = {
  subject: string
  days: string
  time: string
  room: string
  instructor: string
}

export type RegistrationFormData = {
  fullName: string
  schoolYear: string
  program: string
  term: string
  studentType: string
  studentNumber: string
  parentGuardianName: string
  telephone: string
  mobile: string
  emergencyContactName: string
  emergencyPhone: string
  relationshipToStudent: string
  alternatePhone: string
  schedule: RegistrationScheduleRow[]
  username: string
  passwordHint: string
  registrationDate: {
    day: string
    month: string
    year: string
  }
}
