import { useEffect, useState, type FormEvent } from 'react'
import Modal from '../../../../../components/Modal'
import type { ManageUser } from '../types'

export type EditUserFormValues = {
  name: string
  role: string
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
  onSubmit?: (userId: string, values: EditUserFormValues) => void
}

const roleOptions = ['Student', 'Teacher', 'Parent', 'Coordinator', 'IT Admin', 'Principal']
const statusOptions = ['Active', 'Inactive']

const buildFormFromUser = (user: ManageUser): EditUserFormValues => ({
  name: user.name,
  role: user.role,
  status: user.status,
  email: user.email,
  password: '********',
  confirmPassword: '********',
  resetPasswordDefault: false,
})

export const EditUserModal = ({ isOpen, user, onClose, onSubmit }: EditUserModalProps) => {
  const [form, setForm] = useState<EditUserFormValues | null>(null)

  useEffect(() => {
    if (isOpen && user) {
      setForm(buildFormFromUser(user))
    } else if (!isOpen) {
      setForm(null)
    }
  }, [isOpen, user])

  if (!isOpen || !user || !form) {
    return null
  }

  const updateField = <K extends keyof EditUserFormValues>(
    field: K,
    value: EditUserFormValues[K]
  ) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.(user.id, form)
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

        <form className="edit-user-modal__form" onSubmit={handleSubmit}>
          <label className="edit-user-modal__field">
            <span>Name</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
            />
          </label>

          <div className="edit-user-modal__row">
            <label className="edit-user-modal__field">
              <span>Role *</span>
              <select
                required
                value={form.role}
                onChange={(e) => updateField('role', e.target.value)}
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
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
                value={form.resetPasswordDefault ? '' : form.password}
                disabled={form.resetPasswordDefault}
                onChange={(e) => updateField('password', e.target.value)}
                onFocus={() => {
                  if (form.password === '********') {
                    updateField('password', '')
                  }
                }}
              />
            </label>

            <label className="edit-user-modal__field">
              <span>Confirm Password</span>
              <input
                type="password"
                value={form.resetPasswordDefault ? '' : form.confirmPassword}
                disabled={form.resetPasswordDefault}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                onFocus={() => {
                  if (form.confirmPassword === '********') {
                    updateField('confirmPassword', '')
                  }
                }}
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
            <button type="submit" className="edit-user-modal__submit">
              Update Changes
            </button>
            <button type="button" className="edit-user-modal__cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
