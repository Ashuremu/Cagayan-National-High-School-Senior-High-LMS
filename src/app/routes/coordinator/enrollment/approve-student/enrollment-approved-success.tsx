export type EnrollmentApprovedSummary = {
  studentId: string
  studentName: string
  gradeSection: string
  subjects: string[]
  approvedBy?: string
  approvedAt?: string
}

type EnrollmentApprovedSuccessProps = {
  summary: EnrollmentApprovedSummary
  onClose: () => void
  onPrint?: () => void
}

export const EnrollmentApprovedSuccess = ({
  summary,
  onClose,
  onPrint,
}: EnrollmentApprovedSuccessProps) => (
  <div className="enrollment-approved-modal__success">
    <h2 className="enrollment-approved-modal__success-title">
      Enrollment Completed Successfully!
    </h2>

    <div className="enrollment-approved-modal__success-details">
      <p className="enrollment-approved-modal__success-detail enrollment-approved-modal__success-detail--strong">
        Student ID: {summary.studentId}
      </p>
      <p className="enrollment-approved-modal__success-detail">
        Student Name: {summary.studentName}
      </p>
      <p className="enrollment-approved-modal__success-detail">
        Grade &amp; Section: {summary.gradeSection}
      </p>
      <p className="enrollment-approved-modal__success-detail enrollment-approved-modal__success-detail--subjects">
        Subjects Assigned: {summary.subjects.join(', ')}
      </p>
    </div>

    <p className="enrollment-approved-modal__success-message">
      All required documents have been verified.
      <br />
      <br />
      Enrollment approved by: {summary.approvedBy ?? 'Coordinator'}
      <br />
      Date of Approval: {summary.approvedAt}
    </p>

    <div className="enrollment-approved-modal__success-actions">
      <button
        type="button"
        className="enrollment-approved-modal__print-btn"
        onClick={onPrint ?? (() => window.print())}
      >
        Print Registration Form
      </button>
      <button
        type="button"
        className="enrollment-approved-modal__success-close-btn"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
)
