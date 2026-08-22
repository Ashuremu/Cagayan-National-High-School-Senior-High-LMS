export type TeacherStatus = 'active' | 'low-engagement' | 'inactive'

export type TeacherActivity = {
  id: string
  teacherName: string
  email: string
  lessons: number | null
  activity: number | null
  grade: number | null
  lastActivity: string
  pendingGrades: number | null
  status: TeacherStatus
}

export const teacherStatusLabels: Record<TeacherStatus, string> = {
  active: 'Active',
  'low-engagement': 'Low Engagement',
  inactive: 'Inactive',
}
