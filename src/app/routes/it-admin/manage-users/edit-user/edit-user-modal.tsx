import { useEffect, useState, type FormEvent } from 'react'
import Modal from '../../../../../components/Modal'
import { updateUserWithBackend } from '../../../../../api/users/users-api'
import type { CreateUserSuccess } from '../../../../../api/users/users-api'
import { fetchRoles, type RoleOption } from '../../../../../api/roles/roles-api'
import type { ManageUser } from '../types'

export type EditUserFormValues = {
  firstName: string
  middleName: string
  lastName: string
  suffix: string
  roleId: string
  status: string
  email: string
  password: string
  confirmPassword: string
  resetPasswordDefault: boolean
}

type EditUserModalProps = {
  isOpen: boolean
  user: ManageUser | null
  onClose: () => void
  onUpdated?: (result: CreateUserSuccess) => void
}

const statusOptions = ['Active', 'Inactive']

const buildFormFromUser = (user: ManageUser): EditUserFormValues => ({
  firstName: user.firstName,
  middleName: user.middleName,
  lastName: user.lastName,
  suffix: user.suffix,
  roleId: user.roleId || user.role,
  status: user.status === 'Inactive' ? 'Inactive' : 'Active',
  email: user.email,
  password: '',
  confirmPassword: '',
  resetPasswordDefault: false,
})

export const EditUserModal = ({ isOpen, user, onClose, onUpdated }: EditUserModalProps) => {
  const [form, setForm] = useState<EditUserFormValues | null>(() =>
    isOpen && user ? buildFormFromUser(user) : null,
  )
  const [roleOptions, setRoleOptions] = useState<RoleOption[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!isOpen) return

    let isMounted = true
    void fetchRoles().then((result) => {
      if (!isMounted) return
      if (result.ok) {
        setRoleOptions(result.data.roles)
      } else {
        setErrorMessage(result.error.message)
      }
    })

    return () => {
      isMounted = false
    }
  }, [isOpen])

  if (!isOpen || !user || !form) {
    return null
  }

  const updateField = <K extends keyof EditUserFormValues>(
    field: K,
    value: EditUserFormValues[K]
  ) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.firstName.trim() || !form.middleName.trim() || !form.lastName.trim()) {
      setErrorMessage('First name, middle name, and last name are required.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    if (form.password && form.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    const result = await updateUserWithBackend(user.id, {
      firstName: form.firstName,
      middleName: form.middleName,
      lastName: form.lastName,
      suffix: form.suffix || undefined,
      role: form.roleId,
      status: form.status === 'Inactive' ? 'inactive' : 'active',
      email: form.email,
      ...(form.resetPasswordDefault
        ? { resetPasswordDefault: true }
        : { password: form.password || undefined }),
    })

    setIsSubmitting(false)

    if (!result.ok) {
      setErrorMessage(result.error.message)
      return
    }

    onUpdated?.(result.data)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      showCloseButton={false}
      className="edit-user-modal"
    >
      <div className="edit-user-modal__content">
        <button
          type="button"
          onClick={onClose}
          className="edit-user-modal__close"
          aria-label="Close update user modal"
        >
          ×
        </button>

        <h2 className="edit-user-modal__title">Update User Account</h2>
        <p className="edit-user-modal__user-id">User ID: {user.id}</p>

        {errorMessage ? (
          <p className="manage-users-error" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <form className="edit-user-modal__form" onSubmit={handleSubmit}>
          <div className="edit-user-modal__row">
            <label className="edit-user-modal__field">
              <span>First Name *</span>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
              />
            </label>

            <label className="edit-user-modal__field">
              <span>Middle Name *</span>
              <input
                type="text"
                required
                value={form.middleName}
                onChange={(e) => updateField('middleName', e.target.value)}
              />
            </label>
          </div>

          <div className="edit-user-modal__row">
            <label className="edit-user-modal__field">
              <span>Last Name *</span>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
              />
            </label>

            <label className="edit-user-modal__field">
              <span>Suffix</span>
              <input
                type="text"
                value={form.suffix}
                onChange={(e) => updateField('suffix', e.target.value)}
              />
            </label>
          </div>

          <div className="edit-user-modal__row">
            <label className="edit-user-modal__field">
              <span>Role *</span>
              <select
                required
                value={form.roleId}
                onChange={(e) => updateField('roleId', e.target.value)}
              >
                {roleOptions.map((role) => (
                  <option key={role.code} value={role.code}>
                    {role.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="edit-user-modal__field">
              <span>Status</span>
              <select
                value={form.status}
                onChange={(e) => updateField('status', e.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="edit-user-modal__field">
            <span>Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
            />
          </label>

          <label className="edit-user-modal__field">
            <span>Last Login</span>
            <input type="text" readOnly value={user.lastLogin} />
          </label>

          <div className="edit-user-modal__row">
            <label className="edit-user-modal__field">
              <span>Password</span>
              <input
                type="password"
                placeholder="Leave blank to keep current password"
                value={form.resetPasswordDefault ? '' : form.password}
                disabled={form.resetPasswordDefault}
                onChange={(e) => updateField('password', e.target.value)}
              />
            </label>

            <label className="edit-user-modal__field">
              <span>Confirm Password</span>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={form.resetPasswordDefault ? '' : form.confirmPassword}
                disabled={form.resetPasswordDefault}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
              />
            </label>
          </div>

          <label className="edit-user-modal__reset-password">
            <input
              type="checkbox"
              checked={form.resetPasswordDefault}
              onChange={(e) => updateField('resetPasswordDefault', e.target.checked)}
            />
            <span>Reset Password to default</span>
          </label>

          <div className="edit-user-modal__actions">
            <button type="submit" className="edit-user-modal__submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Changes'}
            </button>
            <button
              type="button"
              className="edit-user-modal__cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
