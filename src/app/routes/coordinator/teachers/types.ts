export type TeacherStatus = 'active' | 'low-engagement' | 'inactive'

export type TeacherActivity = {
  id: string
  teacherName: string
  lessons: number
  activity: number
  grade: number
  lastActivity: string
  pendingGrades: number
  status: TeacherStatus
}

export const teacherStatusLabels: Record<TeacherStatus, string> = {
  active: 'Active',
  'low-engagement': 'Low Engagement',
  inactive: 'Inactive',
}
