import Modal from '../../../../../components/Modal'
import type { TeacherAssignment } from '../types'

type ViewTeacherAssignmentModalProps = {
  isOpen: boolean
  assignment: TeacherAssignment | null
  onClose: () => void
}

const readOnlyFields = [
  { label: 'Subject', valueKey: 'subject' as const },
  { label: 'Grade', valueKey: 'strandGrade' as const },
  { label: 'Section', valueKey: 'section' as const },
  { label: 'Schedule', valueKey: 'scheduleDisplay' as const },
  { label: 'Academic Period', valueKey: 'semester' as const },
  { label: 'Room', valueKey: 'room' as const },
]

export const ViewTeacherAssignmentModal = ({
  isOpen,
  assignment,
  onClose,
}: ViewTeacherAssignmentModalProps) => {
  if (!isOpen || !assignment) {
    return null
  }

  const scheduleDisplay = `${assignment.scheduleDays} ${assignment.scheduleTime}`.trim()
  const displayValues = {
    ...assignment,
    scheduleDisplay,
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      showCloseButton={false}
      className="subjects-modal"
    >
      <div className="subjects-modal__content">
        <button
          type="button"
          onClick={onClose}
          className="subjects-modal__close"
          aria-label="Close view assignment modal"
        >
          ×
        </button>

        <h2 className="subjects-modal__title">Update Teacher Assignment</h2>

        <div className="subjects-modal__teacher-info">
          <p>
            <strong>Employee ID:</strong> {assignment.employeeId}
          </p>
          <p>
            <strong>Teacher:</strong> {assignment.teacherName}
          </p>
        </div>

        <div className="subjects-modal__view-grid">
          {readOnlyFields.map((field) => (
            <div key={field.label} className="subjects-modal__view-field">
              <span>{field.label}</span>
              <div>{displayValues[field.valueKey]}</div>
            </div>
          ))}
        </div>

        <div className="subjects-modal__actions subjects-modal__actions--single">
          <button type="button" className="subjects-modal__cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}
