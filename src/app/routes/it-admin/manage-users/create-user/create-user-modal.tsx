import { useEffect, useState, type FormEvent } from 'react'
import Modal from '../../../../../components/Modal'
import { createUserWithBackend } from '../../../../../api/users/users-api'
import { fetchRoles, type RoleOption } from '../../../../../api/roles/roles-api'
import type { CreateUserSuccess } from '../../../../../api/users/users-api'

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
  onCreated?: (result: CreateUserSuccess) => void
}

const emptyForm: CreateUserFormValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  email: '',
  role: '',
}

export const CreateUserModal = ({ isOpen, onClose, onCreated }: CreateUserModalProps) => {
  const [form, setForm] = useState<CreateUserFormValues>(emptyForm)
  const [noSuffix, setNoSuffix] = useState(false)
  const [roleOptions, setRoleOptions] = useState<RoleOption[]>([])
  const [isLoadingRoles, setIsLoadingRoles] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setForm(emptyForm)
      setNoSuffix(false)
      setErrorMessage('')
      return
    }

    let isMounted = true
    setIsLoadingRoles(true)

    void fetchRoles().then((result) => {
      if (!isMounted) return
      if (result.ok) {
        setRoleOptions(result.data.roles)
      } else {
        setErrorMessage(result.error.message)
      }
      setIsLoadingRoles(false)
    })

    return () => {
      isMounted = false
    }
  }, [isOpen])

  const updateField = (field: keyof CreateUserFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    const result = await createUserWithBackend({
      ...form,
      suffix: noSuffix ? '' : form.suffix,
    })

    setIsSubmitting(false)

    if (!result.ok) {
      setErrorMessage(result.error.message)
      return
    }

    onCreated?.(result.data)
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
              disabled={isLoadingRoles}
              onChange={(e) => updateField('role', e.target.value)}
            >
              <option value="">
                {isLoadingRoles ? 'Loading roles...' : 'Select role'}
              </option>
              {roleOptions.map((option) => (
                <option key={option.id} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          {errorMessage ? (
            <p className="create-user-modal__error" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <div className="create-user-modal__actions">
            <button type="submit" className="create-user-modal__submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Submit'}
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
