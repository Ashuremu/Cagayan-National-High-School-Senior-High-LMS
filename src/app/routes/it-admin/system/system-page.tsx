import { useCallback, useEffect, useState } from 'react'
import { DashboardSummaryCards } from '../../../../components'
import {
  ACTIVITY_LOG_ACTIONS,
  fetchActivityLogs,
  toSystemLogRow,
} from '../../../../api/logs/logs-api'

const summaryCards = [
  { label: 'Active System Alerts', value: '3' },
  { label: 'Pending Maintenance Tasks', value: '2' },
]

const maintenanceTasks = [
  {
    task: 'Patch Update',
    schedule: '05-Mar-26 03:00',
    duration: '45 mins',
    status: 'Pending',
    action: 'START',
  },
  {
    task: 'Server Reboot',
    schedule: '01-Mar-26 23:59',
    duration: '30 mins',
    status: 'Pending',
    action: 'START',
  },
  {
    task: 'DB Backup',
    schedule: '28-Feb-26 23:59',
    duration: '15 mins',
    status: 'Completed',
    action: 'VIEW',
  },
]

export const SystemPage = () => {
  const [logs, setLogs] = useState<ReturnType<typeof toSystemLogRow>[]>([])
  const [isLoadingLogs, setIsLoadingLogs] = useState(true)
  const [logsError, setLogsError] = useState('')
  const [totalLogs, setTotalLogs] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const [actionFilter, setActionFilter] = useState('all')
  const [emailFilter, setEmailFilter] = useState('')
  const [fromFilter, setFromFilter] = useState('')
  const [toFilter, setToFilter] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const loadLogs = useCallback(async () => {
    setIsLoadingLogs(true)
    setLogsError('')

    const result = await fetchActivityLogs({
      action: actionFilter,
      email: emailFilter,
      from: fromFilter || undefined,
      to: toFilter || undefined,
      page: currentPage,
      limit: itemsPerPage,
    })

    if (!result.ok) {
      setLogsError(result.error.message)
      setLogs([])
      setTotalLogs(0)
      setTotalPages(1)
      setIsLoadingLogs(false)
      return
    }

    setLogs(result.data.logs.map(toSystemLogRow))
    setTotalLogs(result.data.pagination.total)
    setTotalPages(Math.max(1, result.data.pagination.totalPages))
    setIsLoadingLogs(false)
  }, [actionFilter, emailFilter, fromFilter, toFilter, currentPage, itemsPerPage])

  useEffect(() => {
    void loadLogs()
  }, [loadLogs])

  const handleFilterChange = (setter: (value: string) => void) => {
    return (value: string) => {
      setter(value)
      setCurrentPage(1)
    }
  }

  return (
    <section className="itadmin-main system-page">
      <h2 className="system-page__title">System Logs &amp; Maintenance</h2>

      <section className="system-summary-grid" aria-label="System summary">
        <DashboardSummaryCards cards={summaryCards} />
        <article className="dashboard-summary-card system-summary-card--uptime">
          <p>System Uptime</p>
          <strong>99 %</strong>
          <span className="system-summary-card__subtext">12 days 4 hrs</span>
        </article>
      </section>

      <section className="system-table-card" aria-label="System logs">
        <h3>System Logs</h3>
        <p className="system-table-card__subtitle">
          Monitor all system activity and track user actions in real time.
        </p>

        <div className="system-filters" role="search">
          <label className="system-pagination__field">
            <span>Action</span>
            <select
              value={actionFilter}
              aria-label="Filter by action"
              onChange={(event) => handleFilterChange(setActionFilter)(event.target.value)}
            >
              {ACTIVITY_LOG_ACTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="system-pagination__field">
            <span>Email</span>
            <input
              type="search"
              placeholder="Search by email"
              value={emailFilter}
              aria-label="Search logs by email"
              onChange={(event) => setEmailFilter(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') setCurrentPage(1)
              }}
            />
          </label>

          <label className="system-pagination__field">
            <span>From</span>
            <input
              type="date"
              value={fromFilter}
              aria-label="Filter from date"
              onChange={(event) => handleFilterChange(setFromFilter)(event.target.value)}
            />
          </label>

          <label className="system-pagination__field">
            <span>To</span>
            <input
              type="date"
              value={toFilter}
              aria-label="Filter to date"
              onChange={(event) => handleFilterChange(setToFilter)(event.target.value)}
            />
          </label>
        </div>

        {isLoadingLogs && <p className="system-logs-status">Loading logs…</p>}
        {!isLoadingLogs && logsError && (
          <p className="system-logs-status system-logs-status--error">{logsError}</p>
        )}

        <div className="system-table-wrap">
          <table className="system-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Action</th>
                <th>Timestamp</th>
                <th>Status</th>
                <th>IP Address</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {!isLoadingLogs && !logsError && logs.length === 0 && (
                <tr>
                  <td colSpan={7}>No system logs found.</td>
                </tr>
              )}
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.user}</td>
                  <td>{log.role}</td>
                  <td>{log.action}</td>
                  <td>{log.timestamp}</td>
                  <td>{log.status}</td>
                  <td>{log.ipAddress}</td>
                  <td>{log.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="system-pagination">
          <span className="system-pagination__total">
            {totalLogs} log{totalLogs === 1 ? '' : 's'}
          </span>

          <label className="system-pagination__field">
            <span>Items</span>
            <select
              value={String(itemsPerPage)}
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

          <button
            type="button"
            disabled={currentPage <= 1 || isLoadingLogs}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          >
            Prev
          </button>

          <label className="system-pagination__field">
            <span>Page</span>
            <select
              value={String(currentPage)}
              aria-label="Current page"
              onChange={(event) => setCurrentPage(Number(event.target.value))}
            >
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
            <span>of {totalPages}</span>
          </label>

          <button
            type="button"
            disabled={currentPage >= totalPages || isLoadingLogs}
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          >
            Next
          </button>
        </div>
      </section>

      <section className="system-table-card" aria-label="Maintenance tasks">
        <h3>Maintenance Tasks</h3>
        <p className="system-table-card__subtitle">
          Manage, schedule, and execute critical system maintenance tasks.
        </p>

        <div className="system-table-wrap">
          <table className="system-table system-table--maintenance">
            <thead>
              <tr>
                <th>Task</th>
                <th>Schedule</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceTasks.map((task) => (
                <tr key={task.task}>
                  <td>{task.task}</td>
                  <td>{task.schedule}</td>
                  <td>{task.duration}</td>
                  <td>{task.status}</td>
                  <td>
                    <button type="button" className="system-table__action-btn">
                      {task.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}
