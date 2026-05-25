import { useState } from 'react'
import { DashboardSummaryCards } from '../../../../components'
import { CreateUserModal } from './create-user'
import { EditUserModal } from './edit-user'
import type { ManageUser } from './types'

const summaryCards = [
  { label: 'Total Users', value: '1,250' },
  { label: 'Active Users', value: '85' },
  { label: 'Recently Added Users', value: '3' },
]

const users: ManageUser[] = [
  {
    id: '10001045',
    name: 'Park Santos',
    role: 'Teacher',
    email: 'park@lms.edu',
    status: 'Active',
    lastLogin: '28-Feb-26 08:30',
  },
  {
    id: '10001046',
    name: 'A Dela Cruz',
    role: 'Student',
    email: 'delacruz@lms.edu',
    status: 'Inactive',
    lastLogin: '23-Feb-26 08:30',
  },
  {
    id: '10001047',
    name: 'Sarah Cruz',
    role: 'Student',
    email: 'cruz@lms.edu',
    status: 'Inactive',
    lastLogin: '21-Feb-26 08:30',
  },
]

export const ManageUsersPage = () => {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<ManageUser | null>(null)
  const isPageDimmed = isCreateUserOpen || editingUser !== null

  return (
    <>
      <section className={`itadmin-main manage-users-main ${isPageDimmed ? 'is-dimmed' : ''}`}>
        <div className="manage-users-header">
          <h2>Manage User Account</h2>
          <button
            type="button"
            className="manage-users-add-btn"
            onClick={() => setIsCreateUserOpen(true)}
          >
            Add New User
          </button>
        </div>

        <DashboardSummaryCards cards={summaryCards} />

        <section className="manage-users-list-card" aria-label="User list">
          <div className="manage-users-list-card__top">
            <h3>User List</h3>
            <div className="manage-users-list-toolbar">
              <label className="manage-users-search">
                <input type="search" placeholder="Search" aria-label="Search users" />
                <span aria-hidden="true">⌕</span>
              </label>
              <button type="button" className="manage-users-filter-btn">
                <span aria-hidden="true">☰</span>
                Filter
              </button>
            </div>
          </div>

          <div className="manage-users-table-wrap">
            <table className="manage-users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <button
                        type="button"
                        className="manage-users-edit-btn"
                        onClick={() => setEditingUser(user)}
                      >
                        EDIT
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="manage-users-pagination">
            <label className="manage-users-pagination__field">
              <span>Items</span>
              <select defaultValue="10" aria-label="Items per page">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </label>

            <label className="manage-users-pagination__field">
              <span>Page</span>
              <select defaultValue="1" aria-label="Current page">
                <option value="1">1</option>
              </select>
              <span>of 1</span>
            </label>
          </div>
        </section>
      </section>

      <CreateUserModal
        isOpen={isCreateUserOpen}
        onClose={() => setIsCreateUserOpen(false)}
      />

      <EditUserModal
        isOpen={editingUser !== null}
        user={editingUser}
        onClose={() => setEditingUser(null)}
      />
    </>
  )
}
