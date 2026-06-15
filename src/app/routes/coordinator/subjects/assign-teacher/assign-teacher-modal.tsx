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
  teacherOptions,
} from '../form-options'
import type { AssignTeacherFormValues } from '../types'

type AssignTeacherModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (values: AssignTeacherFormValues) => void
}

const emptyForm: AssignTeacherFormValues = {
  teacher: '',
  grade: '',
  section: '',
  academicPeriod: '',
  subject: '',
  room: '',
  scheduleDays: '',
  scheduleTime: '',
}

export const AssignTeacherModal = ({ isOpen, onClose, onSubmit }: AssignTeacherModalProps) => {
  const [form, setForm] = useState<AssignTeacherFormValues>(emptyForm)

  useEffect(() => {
    if (!isOpen) {
      setForm(emptyForm)
    }
  }, [isOpen])

  const updateField = <K extends keyof AssignTeacherFormValues>(
    field: K,
    value: AssignTeacherFormValues[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.(form)
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
          aria-label="Close assign teacher modal"
        >
          ×
        </button>

        <h2 className="subjects-modal__title">Assign Teacher to Subject</h2>

        <form className="subjects-modal__form" onSubmit={handleSubmit}>
          <div className="subjects-modal__row subjects-modal__row--3">
            <label className="subjects-modal__field subjects-modal__field--wide">
              <span>Teacher *</span>
              <select
                required
                value={form.teacher}
                onChange={(event) => updateField('teacher', event.target.value)}
              >
                <option value="">Select teacher</option>
                {teacherOptions.map((option) => (
                  <option key={option.value} value={option.value}>
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
                <option value="">Select grade</option>
                {gradeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
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
                <option value="">Select section</option>
                {sectionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="subjects-modal__row subjects-modal__row--2">
            <label className="subjects-modal__field">
              <span>Academic Period *</span>
              <select
                required
                value={form.academicPeriod}
                onChange={(event) => updateField('academicPeriod', event.target.value)}
              >
                <option value="">Select period</option>
                {academicPeriodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="subjects-modal__field">
              <span>Subject *</span>
              <select
                required
                value={form.subject}
                onChange={(event) => updateField('subject', event.target.value)}
              >
                <option value="">Select subject</option>
                {subjectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="subjects-modal__row subjects-modal__row--schedule">
            <label className="subjects-modal__field subjects-modal__field--wide">
              <span>Room</span>
              <select
                value={form.room}
                onChange={(event) => updateField('room', event.target.value)}
              >
                <option value="">Select room</option>
                {roomOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="subjects-modal__field">
              <span>Schedule *</span>
              <select
                required
                value={form.scheduleDays}
                onChange={(event) => updateField('scheduleDays', event.target.value)}
              >
                <option value="">Select days</option>
                {scheduleDayOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="subjects-modal__field subjects-modal__field--time">
              <span>Time *</span>
              <div className="subjects-modal__time-input">
                <select
                  required
                  value={form.scheduleTime}
                  onChange={(event) => updateField('scheduleTime', event.target.value)}
                >
                  <option value="">Select time</option>
                  {scheduleTimeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
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

          <button type="button" className="subjects-modal__add-schedule">
            + Add Another Schedule
          </button>

          <div className="subjects-modal__actions">
            <button type="submit" className="subjects-modal__submit">
              Save
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
