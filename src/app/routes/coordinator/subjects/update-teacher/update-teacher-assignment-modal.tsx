import { useEffect, useState, type FormEvent } from 'react'
import Modal from '../../../../../components/Modal'
import {
  academicPeriodOptions,
  gradeOptions,
  roomOptions,
  scheduleDayOptions,
  scheduleTimeOptions,
  sectionOptions,
  subjectOptions,
} from '../form-options'
import type { TeacherAssignment, UpdateAssignmentFormValues } from '../types'

type UpdateTeacherAssignmentModalProps = {
  isOpen: boolean
  assignment: TeacherAssignment | null
  onClose: () => void
  onSubmit?: (assignmentId: string, values: UpdateAssignmentFormValues) => void
}

const buildFormFromAssignment = (assignment: TeacherAssignment): UpdateAssignmentFormValues => ({
  subject: assignment.subject,
  grade: assignment.strandGrade,
  section: assignment.section,
  scheduleDays: assignment.scheduleDays,
  scheduleTime: assignment.scheduleTime,
  academicPeriod: assignment.semester,
  room: assignment.room,
})

export const UpdateTeacherAssignmentModal = ({
  isOpen,
  assignment,
  onClose,
  onSubmit,
}: UpdateTeacherAssignmentModalProps) => {
  const [form, setForm] = useState<UpdateAssignmentFormValues | null>(null)

  useEffect(() => {
    if (isOpen && assignment) {
      setForm(buildFormFromAssignment(assignment))
    } else if (!isOpen) {
      setForm(null)
    }
  }, [isOpen, assignment])

  if (!isOpen || !assignment || !form) {
    return null
  }

  const updateField = <K extends keyof UpdateAssignmentFormValues>(
    field: K,
    value: UpdateAssignmentFormValues[K]
  ) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.(assignment.id, form)
    onClose()
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
          aria-label="Close update assignment modal"
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

        <form className="subjects-modal__form" onSubmit={handleSubmit}>
          <div className="subjects-modal__columns">
            <div className="subjects-modal__column">
              <label className="subjects-modal__field">
                <span>Subject *</span>
                <select
                  required
                  value={form.subject}
                  onChange={(event) => updateField('subject', event.target.value)}
                >
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="subjects-modal__field">
                <span>Grade *</span>
                <select
                  required
                  value={form.grade}
                  onChange={(event) => updateField('grade', event.target.value)}
                >
                  {gradeOptions.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="subjects-modal__field">
                <span>Section *</span>
                <select
                  required
                  value={form.section}
                  onChange={(event) => updateField('section', event.target.value)}
                >
                  {sectionOptions.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="subjects-modal__column">
              <div className="subjects-modal__schedule-group">
                <span className="subjects-modal__schedule-label">Schedule *</span>
                <div className="subjects-modal__row subjects-modal__row--split">
                  <label className="subjects-modal__field">
                    <select
                      required
                      value={form.scheduleDays}
                      onChange={(event) => updateField('scheduleDays', event.target.value)}
                      aria-label="Schedule days"
                    >
                      {scheduleDayOptions.map((option) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="subjects-modal__field subjects-modal__field--time">
                    <div className="subjects-modal__time-input">
                      <select
                        required
                        value={form.scheduleTime}
                        onChange={(event) => updateField('scheduleTime', event.target.value)}
                        aria-label="Schedule time"
                      >
                        {scheduleTimeOptions.map((option) => (
                          <option key={option.value} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <span className="subjects-modal__clock" aria-hidden="true">
                        ◷
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <button type="button" className="subjects-modal__add-schedule">
                + Add Another Schedule
              </button>

              <label className="subjects-modal__field">
                <span>Academic Period *</span>
                <select
                  required
                  value={form.academicPeriod}
                  onChange={(event) => updateField('academicPeriod', event.target.value)}
                >
                  {academicPeriodOptions.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="subjects-modal__field">
                <span>Room</span>
                <select value={form.room} onChange={(event) => updateField('room', event.target.value)}>
                  {roomOptions.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="subjects-modal__actions">
            <button type="submit" className="subjects-modal__submit">
              Update Changes
            </button>
            <button type="button" className="subjects-modal__cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
