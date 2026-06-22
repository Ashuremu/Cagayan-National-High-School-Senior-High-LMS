import { useMemo, useState } from 'react'
import { DashboardSummaryCards, PaginationControls } from '../../../../components'
import type { ActivityLog } from './types'

const summaryCards = [
  { label: 'Total Teachers', value: '75' },
  { label: 'Total Students', value: '1,250' },
  { label: 'Users Engagement Rate', value: '88%' },
]

const initialActivityLogs: ActivityLog[] = [
  {
    id: '1',
    user: 'Sarah Williams',
    role: 'Teacher',
    action: 'Uploaded Lesson',
    timestamp: '28-Feb-26 08:30',
    status: 'Success',
    strandSection: 'STEM 11 - Einstein',
  },
  {
    id: '2',
    user: 'Park Santos',
    role: 'Teacher',
    action: 'Posted Assignment',
    timestamp: '28-Feb-26 09:20',
    status: 'Success',
    strandSection: 'STEM 11 - Einstein',
  },
  {
    id: '3',
    user: 'Juan Aguilar',
    role: 'Student',
    action: 'Submitted Assignment',
    timestamp: '28-Feb-26 10:05',
    status: 'Success',
    strandSection: 'STEM 11 - Einstein',
  },
]

export const MonitorActivityPage = () => {
  const [activityLogs] = useState(initialActivityLogs)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return activityLogs
    }

    return activityLogs.filter((log) =>
      [
        log.user,
        log.role,
        log.action,
        log.timestamp,
        log.status,
        log.strandSection,
      ].some((value) => value.toLowerCase().includes(query))
    )
  }, [activityLogs, searchQuery])

  return (
    <section className="principal-main monitor-activity-page">
      <div className="monitor-activity-header">
        <h2>Monitor Activity</h2>
      </div>

      <DashboardSummaryCards cards={summaryCards} />

      <section className="monitor-activity-list-card" aria-label="Activity logs">
        <div className="monitor-activity-list-card__top">
          <h3>Activity logs</h3>
          <div className="monitor-activity-toolbar">
            <label className="monitor-activity-search">
              <input
                type="search"
                placeholder="Search"
                aria-label="Search activity logs"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <span aria-hidden="true">⌕</span>
            </label>
            <button type="button" className="monitor-activity-filter-btn">
              <span aria-hidden="true">☰</span>
              Filter
            </button>
          </div>
        </div>

        <div className="monitor-activity-table-wrap">
          <table className="monitor-activity-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Action</th>
                <th>Timestamp</th>
                <th>Status</th>
                <th>Strand/Section</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.user}</td>
                  <td>{log.role}</td>
                  <td>{log.action}</td>
                  <td>{log.timestamp}</td>
                  <td>{log.status}</td>
                  <td>{log.strandSection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationControls
          className="monitor-activity-pagination"
          fieldClassName="monitor-activity-pagination__field"
        />
      </section>
    </section>
  )
}
