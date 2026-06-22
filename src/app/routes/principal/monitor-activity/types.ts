export type ActivityLog = {
  id: string
  user: string
  role: 'Teacher' | 'Student' | 'Coordinator'
  action: string
  timestamp: string
  status: string
  strandSection: string
}
