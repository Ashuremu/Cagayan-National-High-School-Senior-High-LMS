type AddStudentStepSuccessProps = {
  studentId: string
  studentName: string
  onClose: () => void
  onAssignSubjects?: () => void
}

export const AddStudentStepSuccess = ({
  studentId,
  studentName,
  onClose,
  onAssignSubjects,
}: AddStudentStepSuccessProps) => (
  <div className="add-student-modal__success">
    <h2 className="add-student-modal__success-title">Enrollment Submitted Successfully!</h2>

    <div className="add-student-modal__success-details">
      <p className="add-student-modal__success-detail add-student-modal__success-detail--strong">
        Student ID: {studentId}
      </p>
      <p className="add-student-modal__success-detail">Student Name: {studentName}</p>
      <p className="add-student-modal__success-detail">Status: Pending for Approval</p>
    </div>

    <p className="add-student-modal__success-message">
      Enrollment has been successfully submitted. Please verify the required enrollment
      documents once submitted before approving the enrollment.
    </p>

    <div className="add-student-modal__success-actions">
      <button
        type="button"
        className="add-student-modal__assign-btn"
        onClick={onAssignSubjects ?? onClose}
      >
        Assign Subjects &amp; Section
      </button>
      <button type="button" className="add-student-modal__success-close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  </div>
)
