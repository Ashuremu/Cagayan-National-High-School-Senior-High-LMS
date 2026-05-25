import { useMemo, useState } from 'react'
import {
  DashboardSummaryCards,
  FilterChipGroup,
  PaginationControls,
} from '../../../../components'
import { AddStudentModal } from './add-student'

type EnrollmentStatus = 'PENDING' | 'ENROLLED' | 'REJECTED'

type EnrollmentRecord = {
  id: string
  name: string
  studentId: string
  gradeSection: string
  enrollmentDate: string
  status: EnrollmentStatus
}

type FilterId = 'all' | 'enrolled' | 'pending' | 'rejected'

const summaryCards = [
  { label: 'Total Students', value: '1,250' },
  { label: 'Enrolled Students', value: '500' },
  { label: 'Pending Enrollments', value: '12' },
]

const enrollments: EnrollmentRecord[] = [
  {
    id: '1',
    name: 'Juan Aguilar',
    studentId: '001',
    gradeSection: 'STEM 11 - section not assigned',
    enrollmentDate: '1/05/2026',
    status: 'PENDING',
  },
  {
    id: '2',
    name: 'Anne Santos',
    studentId: '002',
    gradeSection: 'STEM 11 - section not assigned',
    enrollmentDate: '1/06/2026',
    status: 'PENDING',
  },
  {
    id: '3',
    name: 'Maria Cruz',
    studentId: '003',
    gradeSection: 'ABM 12 - Section A',
    enrollmentDate: '12/15/2025',
    status: 'ENROLLED',
  },
  {
    id: '4',
    name: 'Luis Reyes',
    studentId: '004',
    gradeSection: 'HUMSS 11 - Section B',
    enrollmentDate: '11/20/2025',
    status: 'ENROLLED',
  },
]

const filterOptions: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All (1250)' },
  { id: 'enrolled', label: 'Enrolled (500)' },
  { id: 'pending', label: 'Pending (12)' },
  { id: 'rejected', label: 'Rejected (0)' },
]

const matchesFilter = (record: EnrollmentRecord, filter: FilterId) => {
  if (filter === 'all') return true
  if (filter === 'enrolled') return record.status === 'ENROLLED'
  if (filter === 'pending') return record.status === 'PENDING'
  return record.status === 'REJECTED'
}

export const EnrollmentPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterId>('pending')
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const isPageDimmed = isAddStudentOpen

  const filteredEnrollments = useMemo(
    () => enrollments.filter((record) => matchesFilter(record, activeFilter)),
    [activeFilter]
  )

  return (
    <>
      <section className={`coordinator-main enrollment-page ${isPageDimmed ? 'is-dimmed' : ''}`}>
        <div className="enrollment-header">
          <h2>Student Enrollment</h2>
          <button
            type="button"
            className="enrollment-add-btn"
            onClick={() => setIsAddStudentOpen(true)}
          >
            Add New Student
          </button>
        </div>

        <DashboardSummaryCards cards={summaryCards} />

        <section className="enrollment-list-card" aria-label="Enrollment list">
          <div className="enrollment-list-card__top">
            <h3>Enrollment List</h3>
            <FilterChipGroup
              options={filterOptions}
              activeId={activeFilter}
              onChange={setActiveFilter}
              ariaLabel="Enrollment filters"
            />
          </div>

          <div className="enrollment-table-wrap">
            <table className="enrollment-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Student ID</th>
                  <th>Grade &amp; Section</th>
                  <th>Enrollment Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((record) => (
                  <tr key={record.id}>
                    <td>{record.name}</td>
                    <td>{record.studentId}</td>
                    <td className="enrollment-table__grade">{record.gradeSection}</td>
                    <td>{record.enrollmentDate}</td>
                    <td>
                      <span
                        className={`enrollment-status ${
                          record.status === 'PENDING' ? 'is-pending' : ''
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td>
                      {record.status === 'PENDING' ? (
                        <div className="enrollment-actions">
                          <button type="button">APPROVE</button>
                          <span aria-hidden="true">|</span>
                          <button type="button">REJECT</button>
                        </div>
                      ) : (
                        <span className="enrollment-actions-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PaginationControls />
        </section>
      </section>

      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
      />
    </>
  )
}
