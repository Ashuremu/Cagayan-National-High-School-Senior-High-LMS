import { useMemo, useState } from 'react'
import { DashboardSummaryCards, PaginationControls } from '../../../../components'
import { AssignTeacherModal } from './assign-teacher/assign-teacher-modal'
import {
  academicPeriodOptions,
  getOptionLabel,
  gradeOptions,
  roomOptions,
  scheduleDayOptions,
  scheduleTimeOptions,
  sectionOptions,
  subjectOptions,
  teacherOptions,
} from './form-options'
import type {
  AssignTeacherFormValues,
  TeacherAssignment,
  UpdateAssignmentFormValues,
} from './types'
import { UpdateTeacherAssignmentModal } from './update-teacher/update-teacher-assignment-modal'
import { ViewTeacherAssignmentModal } from './view-teacher/view-teacher-assignment-modal'

const summaryCards = [
  { label: 'Total Subjects', value: '1,250' },
  { label: 'Total Teachers Assigned', value: '500' },
  { label: 'Unassigned Subjects', value: '12' },
]

const createAssignment = (overrides: Partial<TeacherAssignment> & Pick<TeacherAssignment, 'id'>): TeacherAssignment => ({
  employeeId: 'T2026-005',
  teacherName: 'Park Santos',
  subject: 'Oral Communication',
  strandGrade: '11',
  section: 'Einstein',
  semester: '1st Semester',
  scheduleDays: 'MWF',
  scheduleTime: '8:00 AM - 9:00 AM',
  schedule: 'MWF\n8:00 AM - 9:00 AM',
  room: 'Room 101',
  ...overrides,
})

const initialAssignments: TeacherAssignment[] = [
  createAssignment({ id: '1' }),
  createAssignment({ id: '2' }),
  createAssignment({ id: '3' }),
]

const formatSchedule = (days: string, time: string) => `${days}\n${time}`

export const SubjectsPage = () => {
  const [assignments, setAssignments] = useState(initialAssignments)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [viewingAssignment, setViewingAssignment] = useState<TeacherAssignment | null>(null)
  const [editingAssignment, setEditingAssignment] = useState<TeacherAssignment | null>(null)

  const isModalOpen = isAssignModalOpen || Boolean(viewingAssignment) || Boolean(editingAssignment)

  const filteredAssignments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return assignments
    }

    return assignments.filter((assignment) =>
      [
        assignment.teacherName,
        assignment.subject,
        assignment.strandGrade,
        assignment.section,
        assignment.semester,
        assignment.schedule,
        assignment.room,
      ].some((value) => value.toLowerCase().includes(query))
    )
  }, [assignments, searchQuery])

  const handleAssignSubmit = (values: AssignTeacherFormValues) => {
    const teacherName = getOptionLabel(teacherOptions, values.teacher)
    const subject = getOptionLabel(subjectOptions, values.subject)
    const grade = getOptionLabel(gradeOptions, values.grade)
    const section = getOptionLabel(sectionOptions, values.section)
    const semester = getOptionLabel(academicPeriodOptions, values.academicPeriod)
    const room = values.room ? getOptionLabel(roomOptions, values.room) : ''
    const scheduleDays = getOptionLabel(scheduleDayOptions, values.scheduleDays)
    const scheduleTime = getOptionLabel(scheduleTimeOptions, values.scheduleTime)

    setAssignments((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        employeeId: 'T2026-005',
        teacherName,
        subject,
        strandGrade: grade,
        section,
        semester,
        scheduleDays,
        scheduleTime,
        schedule: formatSchedule(scheduleDays, scheduleTime),
        room,
      },
    ])
  }

  const handleUpdateSubmit = (assignmentId: string, values: UpdateAssignmentFormValues) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              subject: values.subject,
              strandGrade: values.grade,
              section: values.section,
              semester: values.academicPeriod,
              scheduleDays: values.scheduleDays,
              scheduleTime: values.scheduleTime,
              schedule: formatSchedule(values.scheduleDays, values.scheduleTime),
              room: values.room,
            }
          : assignment
      )
    )
  }

  return (
    <>
      <section className={`coordinator-main subjects-page${isModalOpen ? ' is-dimmed' : ''}`}>
        <div className="subjects-header">
          <h2>Subject Management</h2>
          <button
            type="button"
            className="subjects-assign-btn"
            onClick={() => setIsAssignModalOpen(true)}
          >
            Assign Teacher
          </button>
        </div>

        <DashboardSummaryCards cards={summaryCards} />

        <section className="subjects-list-card" aria-label="Teacher assignment list">
          <div className="subjects-list-card__top">
            <h3>Teacher Assignment List</h3>
            <div className="subjects-list-toolbar">
              <label className="subjects-search">
                <input
                  type="search"
                  placeholder="Search"
                  aria-label="Search teacher assignments"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                <span aria-hidden="true">⌕</span>
              </label>
              <button type="button" className="subjects-filter-btn">
                <span aria-hidden="true">☰</span>
                Filter
              </button>
            </div>
          </div>

          <div className="subjects-table-wrap">
            <table className="subjects-table">
              <thead>
                <tr>
                  <th>Teacher Name</th>
                  <th>Subject</th>
                  <th>Strand/Grade</th>
                  <th>Section</th>
                  <th>Semester</th>
                  <th>Schedule</th>
                  <th>Room</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td>{assignment.teacherName}</td>
                    <td>{assignment.subject}</td>
                    <td>{assignment.strandGrade}</td>
                    <td>{assignment.section}</td>
                    <td>{assignment.semester}</td>
                    <td className="subjects-table__schedule">{assignment.schedule}</td>
                    <td>{assignment.room}</td>
                    <td>
                      <div className="subjects-actions">
                        <button type="button" onClick={() => setViewingAssignment(assignment)}>
                          VIEW
                        </button>
                        <span aria-hidden="true">|</span>
                        <button type="button" onClick={() => setEditingAssignment(assignment)}>
                          UPDATE
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PaginationControls
            className="subjects-pagination"
            fieldClassName="subjects-pagination__field"
          />
        </section>
      </section>

      <AssignTeacherModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onSubmit={handleAssignSubmit}
      />

      <ViewTeacherAssignmentModal
        isOpen={Boolean(viewingAssignment)}
        assignment={viewingAssignment}
        onClose={() => setViewingAssignment(null)}
      />

      <UpdateTeacherAssignmentModal
        isOpen={Boolean(editingAssignment)}
        assignment={editingAssignment}
        onClose={() => setEditingAssignment(null)}
        onSubmit={handleUpdateSubmit}
      />
    </>
  )
}
