import { useCallback, useEffect, useMemo, useState } from 'react'
import { DashboardSummaryCards } from '../../../../components'
import { fetchUsers, toManageUserRow } from '../../../../api/users/users-api'
import type { CreateUserSuccess } from '../../../../api/users/users-api'
import { CreateUserModal } from './create-user'
import { EditUserModal } from './edit-user'
import type { ManageUser } from './types'

export const ManageUsersPage = () => {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<ManageUser | null>(null)
  const [users, setUsers] = useState<ManageUser[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const [pageError, setPageError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const isPageDimmed = isCreateUserOpen || editingUser !== null

  const loadUsers = useCallback(async () => {
    setIsLoadingUsers(true)
    setPageError('')

    const result = await fetchUsers()
    if (!result.ok) {
      setPageError(result.error.message)
      setUsers([])
      setIsLoadingUsers(false)
      return
    }

    setUsers(result.data.users.map(toManageUserRow))
    setIsLoadingUsers(false)
  }, [])

  useEffect(() => {
    let isMounted = true
    void fetchUsers().then((result) => {
      if (!isMounted) return
      if (result.ok) {
        setUsers(result.data.users.map(toManageUserRow))
      } else {
        setPageError(result.error.message)
        setUsers([])
      }
      setIsLoadingUsers(false)
    })
    return () => {
      isMounted = false
    }
  }, [])

  const handleUserCreated = (result: CreateUserSuccess) => {
    void loadUsers()

    if (result.temporaryPassword) {
      setSuccessMessage(
        `User ${result.user.name} created. Default password: ${result.temporaryPassword}`,
      )
      return
    }

    setSuccessMessage(`User ${result.user.name} created successfully.`)
  }

  const handleUserUpdated = (result: CreateUserSuccess) => {
    void loadUsers()

    if (result.temporaryPassword) {
      setSuccessMessage(
        `User ${result.user.name} updated. Temporary password: ${result.temporaryPassword}`,
      )
      return
    }

    setSuccessMessage(`User ${result.user.name} updated successfully.`)
  }

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return users
    return users.filter((user) =>
      [user.name, user.role, user.email, user.status, user.lastLogin]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    )
  }, [users, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const pageStart = (safePage - 1) * itemsPerPage
  const pageUsers = filteredUsers.slice(pageStart, pageStart + itemsPerPage)

  const summaryCards = [
    { label: 'Total Users', value: String(users.length) },
    {
      label: 'Active Users',
      value: String(users.filter((user) => user.status === 'Active').length),
    },
    {
      label: 'Recently Added Users',
      value: String(Math.min(users.length, 3)),
    },
  ]

  return (
    <>
      <section className={`itadmin-main manage-users-main ${isPageDimmed ? 'is-dimmed' : ''}`}>
        <div className="manage-users-header">
          <h2>Manage User Account</h2>
          <button
            type="button"
            className="manage-users-add-btn"
            onClick={() => {
              setSuccessMessage('')
              setIsCreateUserOpen(true)
            }}
          >
            Add New User
          </button>
        </div>

        {successMessage ? (
          <p className="manage-users-success" role="status">
            {successMessage}
          </p>
        ) : null}

        {pageError ? (
          <p className="manage-users-error" role="alert">
            {pageError}
          </p>
        ) : null}

        <DashboardSummaryCards cards={summaryCards} />

        <section className="manage-users-list-card" aria-label="User list">
          <div className="manage-users-list-card__top">
            <h3>User List</h3>
            <div className="manage-users-list-toolbar">
              <label className="manage-users-search">
                <input
                  type="search"
                  placeholder="Search"
                  aria-label="Search users"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value)
                    setCurrentPage(1)
                  }}
                />
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
                {isLoadingUsers ? (
                  <tr>
                    <td colSpan={6}>Loading users...</td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6}>No users found.</td>
                  </tr>
                ) : (
                  pageUsers.map((user) => (
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="manage-users-pagination">
            <label className="manage-users-pagination__field">
              <span>Items</span>
              <select
                value={itemsPerPage}
                aria-label="Items per page"
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value))
                  setCurrentPage(1)
                }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </label>

            <div className="manage-users-pagination__field">
              <button
                type="button"
                aria-label="Previous page"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                ‹
              </button>
              <span>Page {safePage} of {totalPages}</span>
              <button
                type="button"
                aria-label="Next page"
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </section>

      <CreateUserModal
        isOpen={isCreateUserOpen}
        onClose={() => setIsCreateUserOpen(false)}
        onCreated={handleUserCreated}
      />

      <EditUserModal
        key={editingUser ? `open-${editingUser.id}` : 'closed'}
        isOpen={editingUser !== null}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onUpdated={handleUserUpdated}
      />
    </>
  )
}
