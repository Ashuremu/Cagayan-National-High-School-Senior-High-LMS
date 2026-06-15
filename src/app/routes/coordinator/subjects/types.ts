export type TeacherAssignment = {
  id: string
  employeeId: string
  teacherName: string
  subject: string
  strandGrade: string
  section: string
  semester: string
  schedule: string
  scheduleDays: string
  scheduleTime: string
  room: string
}

export type AssignTeacherFormValues = {
  teacher: string
  grade: string
  section: string
  academicPeriod: string
  subject: string
  room: string
  scheduleDays: string
  scheduleTime: string
}

export type UpdateAssignmentFormValues = {
  subject: string
  grade: string
  section: string
  scheduleDays: string
  scheduleTime: string
  academicPeriod: string
  room: string
}
