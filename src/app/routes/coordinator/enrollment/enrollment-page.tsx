import { useMemo, useState } from 'react'
import {
  DashboardSummaryCards,
  FilterChipGroup,
  PaginationControls,
} from '../../../../components'
import { AddStudentModal } from './add-student'
import type { AddStudentFormValues } from './add-student'
import { formatStudentName } from './add-student/format-student-name'
import { ApproveStudentModal, formatGradeSectionLabel, getEnrollmentFormData } from './approve-student'
import type { ApprovalDetails, EnrollmentRecord } from './types'

type FilterId = 'all' | 'enrolled' | 'pending' | 'rejected'

type ApproveModalContext = {
  enrollmentId: string
  studentId: string
  studentName: string
  form: AddStudentFormValues
}

const summaryCards = [
  { label: 'Total Students', value: '1,250' },
  { label: 'Enrolled Students', value: '500' },
  { label: 'Pending Enrollments', value: '12' },
]

const initialEnrollments: EnrollmentRecord[] = [
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

const formatEnrollmentDate = () => {
  const now = new Date()
  return `${now.getMonth() + 1}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`
}

const buildGradeSection = (values: AddStudentFormValues, section: string) =>
  `${formatGradeSectionLabel(values, section).replace(' – ', ' - Section ')}`

export const EnrollmentPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterId>('pending')
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [approveModalContext, setApproveModalContext] = useState<ApproveModalContext | null>(null)
  const [enrollmentRecords, setEnrollmentRecords] = useState(initialEnrollments)
  const isPageDimmed = isAddStudentOpen || approveModalContext !== null

  const filteredEnrollments = useMemo(
    () => enrollmentRecords.filter((record) => matchesFilter(record, activeFilter)),
    [activeFilter, enrollmentRecords]
  )

  const openApproveModal = (enrollmentId: string) => {
    const record = enrollmentRecords.find((item) => item.id === enrollmentId)

    if (!record) {
      return
    }

    setApproveModalContext({
      enrollmentId,
      studentId: record.studentId,
      studentName: record.name,
      form: getEnrollmentFormData(record),
    })
  }

  const closeApproveModal = () => {
    setApproveModalContext(null)
  }

  const handleAddStudentSubmit = (values: AddStudentFormValues) => {
    const nextNumericId =
      enrollmentRecords.reduce((max, record) => Math.max(max, Number(record.studentId)), 0) + 1
    const studentId = String(nextNumericId).padStart(3, '0')
    const gradeLabel = values.grade || values.seniorHighProgram || 'Grade'

    setEnrollmentRecords((current) => [
      {
        id: crypto.randomUUID(),
        name: formatStudentName(values),
        studentId,
        gradeSection: `${gradeLabel} - section not assigned`,
        enrollmentDate: formatEnrollmentDate(),
        status: 'PENDING',
        formData: values,
      },
      ...current,
    ])

    return studentId
  }

  const handleAssignSubjects = ({
    studentId,
    enrollmentId,
  }: {
    studentId: string
    studentName: string
    enrollmentId?: string
  }) => {
    const recordId =
      enrollmentId ??
      enrollmentRecords.find((record) => record.studentId === studentId)?.id

    if (recordId) {
      openApproveModal(recordId)
    }
  }

  const handleConfirmApproval = (details: ApprovalDetails) => {
    if (!approveModalContext) {
      return
    }

    setEnrollmentRecords((current) =>
      current.map((record) =>
        record.id === approveModalContext.enrollmentId
          ? {
              ...record,
              status: 'ENROLLED',
              gradeSection: buildGradeSection(approveModalContext.form, details.section),
            }
          : record
      )
    )
  }

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
            <FilterChipGroup<FilterId>
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
                          <button type="button" onClick={() => openApproveModal(record.id)}>
                            APPROVE
                          </button>
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
        onSubmit={handleAddStudentSubmit}
        onAssignSubjects={handleAssignSubjects}
      />

      {approveModalContext && (
        <ApproveStudentModal
          isOpen
          onClose={closeApproveModal}
          form={approveModalContext.form}
          studentId={approveModalContext.studentId}
          studentName={approveModalContext.studentName}
          onConfirm={handleConfirmApproval}
        />
      )}
    </>
  )
}
