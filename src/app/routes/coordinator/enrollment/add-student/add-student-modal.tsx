import { useEffect, useRef, useState, type FormEvent } from 'react'
import Modal from '../../../../../components/Modal'
import { AddStudentStepOne } from './add-student-step-one'
import { AddStudentStepFour } from './add-student-step-four'
import { AddStudentStepSuccess } from './add-student-step-success'
import { AddStudentStepThree } from './add-student-step-three'
import { AddStudentStepTwo } from './add-student-step-two'
import { formatStudentName } from './format-student-name'
import { getTestStudentFormValues } from './test-data'
import type {
  AddStudentFormValues,
  AddressFields,
  JuniorSeniorRequirements,
  ParentGuardianInfo,
  SchoolAttendedFields,
  TransfereeRequirements,
} from './types'

export type { AddStudentFormValues, AddressFields } from './types'

type SubmittedEnrollment = {
  studentId: string
  studentName: string
  enrollmentId?: string
}

type AddStudentModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (values: AddStudentFormValues) => string | undefined
  onAssignSubjects?: (summary: SubmittedEnrollment) => void
}

const emptyAddress = (): AddressFields => ({
  streetUnit: '',
  street: '',
  subdivision: '',
  barangay: '',
  city: '',
  province: '',
  zipCode: '',
})

const emptyParent = (): ParentGuardianInfo => ({
  firstName: '',
  lastName: '',
  middleInitial: '',
  suffix: '',
  mobile: '',
  email: '',
  occupation: '',
  relationship: '',
})

const emptySchoolAttended = (): SchoolAttendedFields => ({
  schoolType: '',
  schoolName: '',
  program: '',
  dateOfGraduation: '',
  schoolYear: '',
  yearLevel: '',
  term: '',
})

const emptyDocuments = () => ({
  juniorSenior: {
    form138: false,
    form137: false,
    birthCertificate: false,
    goodMoral: false,
  },
  transferee: {
    transferCertificate: false,
    form138Shs: false,
    form137Shs: false,
    birthCertificate: false,
    goodMoral: false,
  },
  uploadedFiles: [],
})

const emptyForm = (): AddStudentFormValues => ({
  admitType: '',
  schoolYear: '',
  term: '',
  studentType: '',
  grade: '',
  seniorHighProgram: '',
  learnersReferenceNumber: '',
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  gender: '',
  status: '',
  citizenship: '',
  dateOfBirth: '',
  birthplace: '',
  religion: '',
  currentAddress: emptyAddress(),
  permanentAddress: emptyAddress(),
  sameAsCurrentAddress: false,
  telephone: '',
  mobile: '',
  email: '',
  schoolAttended: emptySchoolAttended(),
  father: emptyParent(),
  mother: emptyParent(),
  guardian: emptyParent(),
  documents: emptyDocuments(),
})

type AddressFieldKey = keyof AddressFields

const validateContainer = (container: HTMLElement | null) => {
  if (!container) return false

  const fields = container.querySelectorAll('input, select, textarea')
  let valid = true

  fields.forEach((field) => {
    if (
      field instanceof HTMLInputElement ||
      field instanceof HTMLSelectElement ||
      field instanceof HTMLTextAreaElement
    ) {
      if (!field.checkValidity()) {
        valid = false
        field.reportValidity()
      }
    }
  })

  return valid
}

export const AddStudentModal = ({
  isOpen,
  onClose,
  onSubmit,
  onAssignSubjects,
}: AddStudentModalProps) => {
  const [form, setForm] = useState<AddStudentFormValues>(emptyForm)
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [submittedEnrollment, setSubmittedEnrollment] = useState<SubmittedEnrollment | null>(
    null
  )
  const stepOneRef = useRef<HTMLDivElement>(null)
  const stepTwoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      setForm(emptyForm())
      setStep(1)
      setSubmittedEnrollment(null)
    }
  }, [isOpen])

  useEffect(() => {
    if (form.sameAsCurrentAddress) {
      setForm((prev) => ({
        ...prev,
        permanentAddress: { ...prev.currentAddress },
      }))
    }
  }, [form.sameAsCurrentAddress, form.currentAddress])

  const updateField = <K extends keyof AddStudentFormValues>(
    field: K,
    value: AddStudentFormValues[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const updateCurrentAddress = (field: AddressFieldKey, value: string) => {
    setForm((prev) => {
      const currentAddress = { ...prev.currentAddress, [field]: value }
      return {
        ...prev,
        currentAddress,
        permanentAddress: prev.sameAsCurrentAddress
          ? { ...currentAddress }
          : prev.permanentAddress,
      }
    })
  }

  const updatePermanentAddress = (field: AddressFieldKey, value: string) => {
    setForm((prev) => ({
      ...prev,
      permanentAddress: { ...prev.permanentAddress, [field]: value },
      sameAsCurrentAddress: false,
    }))
  }

  const updateSchoolAttended = (field: keyof SchoolAttendedFields, value: string) => {
    setForm((prev) => ({
      ...prev,
      schoolAttended: { ...prev.schoolAttended, [field]: value },
    }))
  }

  const updateParent = (
    role: 'father' | 'mother' | 'guardian',
    field: keyof ParentGuardianInfo,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [role]: { ...prev[role], [field]: value },
    }))
  }

  const handleStepOneNext = () => {
    if (validateContainer(stepOneRef.current)) {
      setStep(2)
    }
  }

  const handleStepTwoNext = () => {
    if (validateContainer(stepTwoRef.current)) {
      setStep(3)
    }
  }

  const updateJuniorSeniorRequirement = (
    id: keyof JuniorSeniorRequirements,
    checked: boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        juniorSenior: { ...prev.documents.juniorSenior, [id]: checked },
      },
    }))
  }

  const updateTransfereeRequirement = (
    id: keyof TransfereeRequirements,
    checked: boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        transferee: { ...prev.documents.transferee, [id]: checked },
      },
    }))
  }

  const addUploadedFiles = (files: FileList | File[]) => {
    const nextFiles = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${crypto.randomUUID()}`,
      name: file.name,
      size: file.size,
    }))

    setForm((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        uploadedFiles: [...prev.documents.uploadedFiles, ...nextFiles],
      },
    }))
  }

  const removeUploadedFile = (id: string) => {
    setForm((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        uploadedFiles: prev.documents.uploadedFiles.filter((file) => file.id !== id),
      },
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (step === 1) {
      handleStepOneNext()
      return
    }

    if (step === 2) {
      handleStepTwoNext()
      return
    }

    if (step === 3) {
      setStep(4)
      return
    }

    const submittedId = onSubmit?.(form)
    setSubmittedEnrollment({
      studentId: submittedId ?? '001',
      studentName: formatStudentName(form),
    })
    setStep(5)
  }

  const handleSuccessClose = () => {
    onClose()
  }

  const handleAssignSubjects = () => {
    if (submittedEnrollment) {
      onAssignSubjects?.(submittedEnrollment)
    }
    onClose()
  }

  const handlePrevious = () => {
    setStep((current) => {
      if (current === 4) return 3
      if (current === 3) return 2
      if (current === 2) return 1
      return 1
    })
  }

  const isSuccessStep = step === 5

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      showCloseButton={false}
      className={`add-student-modal ${isSuccessStep ? 'add-student-modal--success' : ''}`}
    >
      <div className="add-student-modal__content">
        <button
          type="button"
          onClick={isSuccessStep ? handleSuccessClose : onClose}
          className="add-student-modal__close"
          aria-label="Close add student modal"
        >
          ×
        </button>

        {isSuccessStep && submittedEnrollment ? (
          <AddStudentStepSuccess
            studentId={submittedEnrollment.studentId}
            studentName={submittedEnrollment.studentName}
            onClose={handleSuccessClose}
            onAssignSubjects={handleAssignSubjects}
          />
        ) : (
          <>
            <div className="add-student-modal__header">
              <h2 className="add-student-modal__title">Add Student</h2>
              <button
                type="button"
                className="add-student-modal__test-btn"
                onClick={() => setForm(getTestStudentFormValues())}
              >
                Fill Test Data
              </button>
            </div>

            <form className="add-student-modal__form" onSubmit={handleSubmit}>
          {step === 1 && (
            <div ref={stepOneRef}>
              <AddStudentStepOne
                form={form}
                updateField={updateField}
                updateCurrentAddress={updateCurrentAddress}
                updatePermanentAddress={updatePermanentAddress}
              />
            </div>
          )}

          {step === 2 && (
            <div ref={stepTwoRef}>
              <AddStudentStepTwo
                schoolAttended={form.schoolAttended}
                father={form.father}
                mother={form.mother}
                guardian={form.guardian}
                onSchoolChange={updateSchoolAttended}
                onParentChange={updateParent}
              />
            </div>
          )}

          {step === 3 && (
            <AddStudentStepThree
              documents={form.documents}
              onJuniorSeniorChange={updateJuniorSeniorRequirement}
              onTransfereeChange={updateTransfereeRequirement}
              onFilesAdd={addUploadedFiles}
              onFileRemove={removeUploadedFile}
            />
          )}

          {step === 4 && <AddStudentStepFour form={form} />}

          <div
            className={`add-student-modal__actions ${
              step > 1 ? 'add-student-modal__actions--split' : ''
            } ${step === 4 ? 'add-student-modal__actions--review' : ''}`}
          >
            {step > 1 && (
              <button
                type="button"
                className="add-student-modal__previous"
                onClick={handlePrevious}
              >
                <span aria-hidden="true">←</span>
                Previous
              </button>
            )}

            {step === 4 ? (
              <button type="submit" className="add-student-modal__submit">
                Submit
              </button>
            ) : (
              <button type="submit" className="add-student-modal__next">
                Next
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
            </form>
          </>
        )}
      </div>
    </Modal>
  )
}
