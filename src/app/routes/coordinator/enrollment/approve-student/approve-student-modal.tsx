import { useState, type FormEvent } from 'react'
import Modal from '../../../../../components/Modal'
import { ReviewAccordion, TextField } from '../../../../../components'
import { buildReviewSections } from '../add-student/build-review-sections'
import type { AddStudentFormValues } from '../add-student/types'
import type { ApprovalDetails } from '../types'
import {
  EnrollmentApprovedSuccess,
  type EnrollmentApprovedSummary,
} from './enrollment-approved-success'
import { formatApprovalDateTime, formatGradeSectionLabel } from './format-grade-section'
import {
  buildRegistrationFormData,
  printRegistrationForm,
} from '../registration-form'
import {
  defaultSelectedSubjectIds,
  defaultStemSubjects,
  type SubjectOption,
} from './subject-options'

export type ApproveStudentModalProps = {
  isOpen: boolean
  onClose: () => void
  form: AddStudentFormValues
  studentId: string
  studentName: string
  onConfirm?: (details: ApprovalDetails) => void
  subjects?: SubjectOption[]
  defaultSection?: string
}

export const ApproveStudentModal = ({
  isOpen,
  onClose,
  form,
  studentId,
  studentName,
  onConfirm,
  subjects = defaultStemSubjects,
  defaultSection = 'Einstein',
}: ApproveStudentModalProps) => {
  const [step, setStep] = useState<'approve' | 'success'>('approve')
  const [section, setSection] = useState(defaultSection)
  const [remarks, setRemarks] = useState('')
  const [approvedSummary, setApprovedSummary] = useState<EnrollmentApprovedSummary | null>(
    null
  )
  const [selectedSubjects, setSelectedSubjects] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(defaultSelectedSubjectIds.map((id) => [id, true]))
  )

  const toggleSubject = (id: string, checked: boolean) => {
    setSelectedSubjects((current) => ({ ...current, [id]: checked }))
  }

  const handleClose = () => {
    setStep('approve')
    setApprovedSummary(null)
    onClose()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const activeSubjects = subjects
      .filter((subject) => selectedSubjects[subject.id])
      .map((subject) => subject.label)

    if (activeSubjects.length === 0) {
      return
    }

    const details: ApprovalDetails = {
      section,
      subjects: activeSubjects,
      remarks,
    }

    const summary: EnrollmentApprovedSummary = {
      studentId,
      studentName,
      gradeSection: formatGradeSectionLabel(form, section),
      subjects: activeSubjects,
      approvedBy: 'Coordinator',
      approvedAt: formatApprovalDateTime(),
    }

    setApprovedSummary(summary)
    setStep('success')
    onConfirm?.(details)
  }

  const handlePrintRegistrationForm = () => {
    if (!approvedSummary) {
      return
    }

    printRegistrationForm(
      buildRegistrationFormData({
        form,
        studentId,
        subjects: approvedSummary.subjects,
      })
    )
  }

  const reviewSections = buildReviewSections(form)
  const isSuccessStep = step === 'success' && approvedSummary !== null

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="xl"
      showCloseButton={false}
      className={`approve-enrollment-modal ${
        isSuccessStep ? 'approve-enrollment-modal--success' : ''
      }`}
    >
      <div className="approve-enrollment-modal__content">
        <button
          type="button"
          onClick={handleClose}
          className="approve-enrollment-modal__close"
          aria-label="Close approve enrollment modal"
        >
          ×
        </button>

        {isSuccessStep ? (
          <EnrollmentApprovedSuccess
            summary={approvedSummary}
            onClose={handleClose}
            onPrint={handlePrintRegistrationForm}
          />
        ) : (
          <>
            <h2 className="approve-enrollment-modal__title">Approve Enrollment</h2>

            <form className="approve-enrollment-modal__form" onSubmit={handleSubmit}>
              <ReviewAccordion
                sections={reviewSections}
                intro=""
                defaultOpenId="school"
                className="approve-enrollment-modal__review"
              />

              <TextField
                label="Section"
                value={section}
                onChange={setSection}
                className="approve-enrollment-modal__section-field"
              />

              <fieldset className="approve-enrollment-modal__subjects">
                <legend>Subjects *</legend>
                <div className="approve-enrollment-modal__subjects-grid">
                  {subjects.map((subject) => (
                    <label key={subject.id} className="approve-enrollment-modal__subject-item">
                      <input
                        type="checkbox"
                        checked={selectedSubjects[subject.id] ?? false}
                        onChange={(event) => toggleSubject(subject.id, event.target.checked)}
                      />
                      <span>{subject.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <TextField
                label="Remarks"
                value={remarks}
                onChange={setRemarks}
                className="approve-enrollment-modal__remarks-field"
              />

              <div className="approve-enrollment-modal__actions">
                <button type="submit" className="approve-enrollment-modal__confirm-btn">
                  Confirm Approval
                </button>
                <button
                  type="button"
                  className="approve-enrollment-modal__close-btn"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  )
}
