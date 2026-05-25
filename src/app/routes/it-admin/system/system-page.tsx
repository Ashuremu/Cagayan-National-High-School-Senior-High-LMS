import { DashboardSummaryCards } from '../../../../components'

const summaryCards = [
  { label: 'Active System Alerts', value: '3' },
  { label: 'Pending Maintenance Tasks', value: '2' },
]

const systemLogs = [
  {
    user: 'System',
    role: 'Server',
    action: 'Backup Done',
    timestamp: '28-Feb-26 08:30',
    status: 'Success',
    ipAddress: '-',
  },
  {
    user: 'Park Santos',
    role: 'Teacher',
    action: 'Login',
    timestamp: '28-Feb-26 08:30',
    status: 'Success',
    ipAddress: '192.168.1.5',
  },
  {
    user: 'A Dela Cruz',
    role: 'Student',
    action: 'Login Failed',
    timestamp: '23-Feb-26 08:30',
    status: 'Failed',
    ipAddress: '192.168.1.8',
  },
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

const TablePagination = () => (
  <div className="system-pagination">
    <label className="system-pagination__field">
      <span>Items</span>
      <select defaultValue="10" aria-label="Items per page">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </label>

    <label className="system-pagination__field">
      <span>Page</span>
      <select defaultValue="1" aria-label="Current page">
        <option value="1">1</option>
      </select>
      <span>of 1</span>
    </label>
  </div>
)

export const SystemPage = () => {
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
              </tr>
            </thead>
            <tbody>
              {systemLogs.map((log) => (
                <tr key={`${log.user}-${log.timestamp}-${log.action}`}>
                  <td>{log.user}</td>
                  <td>{log.role}</td>
                  <td>{log.action}</td>
                  <td>{log.timestamp}</td>
                  <td>{log.status}</td>
                  <td>{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TablePagination />
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

        <TablePagination />
      </section>
    </section>
  )
}
