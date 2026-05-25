import { useEffect, useState, type FormEvent } from 'react'
import Modal from '../../../../../components/Modal'

export type CreateUserFormValues = {
  firstName: string
  middleName: string
  lastName: string
  suffix: string
  email: string
  role: string
}

type CreateUserModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (values: CreateUserFormValues) => void
}

const roleOptions = [
  { value: '', label: 'Select role' },
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'parent', label: 'Parent' },
  { value: 'coordinator', label: 'Coordinator' },
  { value: 'it-admin', label: 'IT Admin' },
  { value: 'principal', label: 'Principal' },
]

const emptyForm: CreateUserFormValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  email: '',
  role: '',
}

export const CreateUserModal = ({ isOpen, onClose, onSubmit }: CreateUserModalProps) => {
  const [form, setForm] = useState<CreateUserFormValues>(emptyForm)
  const [noSuffix, setNoSuffix] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setForm(emptyForm)
      setNoSuffix(false)
    }
  }, [isOpen])

  const updateField = (field: keyof CreateUserFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.({
      ...form,
      suffix: noSuffix ? '' : form.suffix,
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      showCloseButton={false}
      className="create-user-modal"
    >
      <div className="create-user-modal__content">
        <button
          type="button"
          onClick={onClose}
          className="create-user-modal__close"
          aria-label="Close create user modal"
        >
          ×
        </button>

        <h2 className="create-user-modal__title">Create New User</h2>

        <form className="create-user-modal__form" onSubmit={handleSubmit}>
          <div className="create-user-modal__name-row">
            <label className="create-user-modal__field create-user-modal__field--first">
              <span>First Name *</span>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
              />
            </label>

            <label className="create-user-modal__field create-user-modal__field--middle">
              <span>Middle Name *</span>
              <input
                type="text"
                required
                value={form.middleName}
                onChange={(e) => updateField('middleName', e.target.value)}
              />
            </label>

            <label className="create-user-modal__field create-user-modal__field--last">
              <span>Last Name *</span>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
              />
            </label>

            <div className="create-user-modal__suffix-group">
              <label className="create-user-modal__field create-user-modal__field--suffix">
                <span>Suffix Name</span>
                <input
                  type="text"
                  value={form.suffix}
                  disabled={noSuffix}
                  onChange={(e) => updateField('suffix', e.target.value)}
                />
              </label>

              <label className="create-user-modal__no-suffix">
                <input
                  type="checkbox"
                  checked={noSuffix}
                  onChange={(e) => setNoSuffix(e.target.checked)}
                />
                <span>No Suffix Name</span>
              </label>
            </div>
          </div>

          <label className="create-user-modal__field">
            <span>Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
          </label>

          <label className="create-user-modal__field">
            <span>Role</span>
            <select
              required
              value={form.role}
              onChange={(e) => updateField('role', e.target.value)}
            >
              {roleOptions.map((option) => (
                <option key={option.value || 'placeholder'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="create-user-modal__actions">
            <button type="submit" className="create-user-modal__submit">
              Submit
            </button>
            <button type="button" className="create-user-modal__cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
