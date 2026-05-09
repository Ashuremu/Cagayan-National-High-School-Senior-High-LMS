import { useState } from 'react'
import {
  AppSidebar,
  CalendarCard,
  DashboardSummaryCards,
  SegmentTabs,
} from '../../../components'
import { RouteNavbar } from '../navbar'

const sidebarItems = [
  { id: 'home', label: 'Home' },
  { id: 'manage-users', label: 'Manage Users' },
  { id: 'system', label: 'System' },
]

const topTabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'news', label: 'News' },
]

const summaryCards = [
  { label: 'Total Users', value: '1,250' },
  { label: 'Active Users', value: '85' },
  { label: 'System Uptime', value: '99 %' },
]

const users = [
  { name: 'Park Santos', role: 'Teacher', email: 'park@lms.edu', status: 'Active', lastLogin: '2 hrs ago' },
  { name: 'A Dela Cruz', role: 'Student', email: 'delacruz@lms.edu', status: 'Inactive', lastLogin: '5 days ago' },
  { name: 'Sarah Cruz', role: 'Student', email: 'cruz@lms.edu', status: 'Inactive', lastLogin: '7 days ago' },
]

const alerts = [
  { title: 'High memory usage on Server 2', time: '10 mins ago', tone: 'warning' },
  { title: 'Scheduled maintenance tonight at 2 AM', time: '1 hour ago', tone: 'info' },
  { title: 'Database backup completed', time: '2 hours ago', tone: 'success' },
]

const health = [
  { label: 'Server Load', value: 50 },
  { label: 'Storage Usage', value: 80 },
  { label: 'Memory Usage', value: 70 },
  { label: 'Network Traffic', value: 30 },
]

export const ItAdminPage = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState('home')

  return (
    <div className="student-layout">
      <AppSidebar
        items={sidebarItems}
        activeItemId={activeSidebarItem}
        logoAlt="CNHS logo"
        onItemClick={setActiveSidebarItem}
      />

      <div className="student-main">
        <RouteNavbar userName="IT Admin" />
        <SegmentTabs items={topTabs} activeTabId="dashboard" ariaLabel="IT Admin top tabs" />

        <main className="student-content itadmin-content">
          <section className="itadmin-main">
            <DashboardSummaryCards cards={summaryCards} />

            <section className="itadmin-users-card">
              <h3>Manage Users Account</h3>
              <p>Create, modify, and delete user accounts</p>

              <div className="itadmin-users-table-wrap">
                <table className="itadmin-users-table">
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
                      <tr key={user.email}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td>{user.status}</td>
                        <td>{user.lastLogin}</td>
                        <td>EDIT</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="itadmin-users-footer">
                <span>Showing 3 of 1,250 users</span>
                <button type="button">View All Users</button>
              </div>
            </section>

            <div className="itadmin-bottom-grid">
              <section className="itadmin-card">
                <h3>System Health</h3>
                <p>Server and resource monitoring</p>
                <div className="itadmin-health-list">
                  {health.map((metric) => (
                    <div key={metric.label} className="itadmin-health-item">
                      <div>
                        <strong>{metric.label}</strong>
                        <span>{metric.value}%</span>
                      </div>
                      <div className="itadmin-progress">
                        <div style={{ width: `${metric.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="itadmin-ghost-button">
                  View Detailed Metrics
                </button>
              </section>

              <section className="itadmin-card">
                <h3>System Alerts</h3>
                <p>Recent notifications and warnings</p>
                <div className="itadmin-alert-list">
                  {alerts.map((alert) => (
                    <article key={alert.title} className="itadmin-alert-item">
                      <span className={`itadmin-alert-dot is-${alert.tone}`} />
                      <div>
                        <h4>{alert.title}</h4>
                        <p>{alert.time}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </section>

          <aside className="student-content__side">
            <CalendarCard title="Calendar" />
            <section className="student-info-card">
              <h3>Announcement</h3>
              <p>Dear CNHS Community, Please be advised.</p>
            </section>
          </aside>
        </main>
      </div>
    </div>
  )
}
