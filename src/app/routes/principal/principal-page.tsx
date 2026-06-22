import { useState } from 'react'
import { AppSidebar, CalendarCard, DashboardSummaryCards, SegmentTabs } from '../../../components'
import { RouteNavbar } from '../navbar'
import { MonitorActivityPage } from './monitor-activity'
import { LogsReportsPage } from './logs-reports'

const sidebarItems = [
  { id: 'home', label: 'Home' },
  { id: 'monitor-activity', label: 'Monitor Activity' },
  { id: 'logs-reports', label: 'Logs & Reports' },
]

const topTabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'news', label: 'News' },
]

const summaryCards = [
  { label: 'Total Teachers', value: '75' },
  { label: 'Total Students', value: '1,250' },
  { label: 'Users Engagement Rate', value: '88%' },
  { label: 'Performance Overview', value: '88.75%' },
]

const activityFeed = [
  {
    actor: 'Park Santos',
    details: 'Uploaded lesson: Oral Communication Module 1: Nature and Elements of Communication (1st Sem)',
    time: '10 mins ago',
    role: 'Teacher',
  },
  {
    actor: 'David Lopez',
    details: 'Enrolled 5 students in Earth Life & Science Subject',
    time: '25 mins ago',
    role: 'Coordinator',
  },
  {
    actor: 'Sarah Williams',
    details: 'Posted grades for 28 students',
    time: '30 mins ago',
    role: 'Teacher',
  },
]

const departmentPerformance = [
  { department: 'STEM', percent: 95 },
  { department: 'HUMSS', percent: 90 },
  { department: 'ABM', percent: 80 },
  { department: 'GAS', percent: 90 },
  { department: 'TVL', percent: 90 },
]

const tableRows = [
  { department: 'STEM', students: '284', teachers: '12', avgGrade: '88%', passRate: '95%', action: 'VIEW' },
  { department: 'HUMSS', students: '260', teachers: '10', avgGrade: '86%', passRate: '90%', action: 'VIEW' },
  { department: 'ABM', students: '215', teachers: '9', avgGrade: '82%', passRate: '80%', action: 'VIEW' },
  { department: 'GAS', students: '241', teachers: '10', avgGrade: '85%', passRate: '90%', action: 'VIEW' },
]

export const PrincipalPage = () => {
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
        <RouteNavbar userName="Principal" />
        {activeSidebarItem === 'home' && (
          <SegmentTabs items={topTabs} activeTabId="dashboard" ariaLabel="Principal top tabs" />
        )}

        <main className="student-content principal-content">
          {activeSidebarItem === 'monitor-activity' ? (
            <MonitorActivityPage />
          ) : activeSidebarItem === 'logs-reports' ? (
            <LogsReportsPage />
          ) : activeSidebarItem === 'home' ? (
          <section className="principal-main">
            <DashboardSummaryCards cards={summaryCards} />

            <div className="principal-panels">
              <section className="principal-panel">
                <h3>Monitor Activity</h3>
                <p>Real-time oversight of school operations</p>
                <div className="principal-activity-list">
                  {activityFeed.map((item) => (
                    <article key={`${item.actor}-${item.time}`} className="principal-activity-item">
                      <div className="principal-activity-item__head">
                        <h4>{item.actor}</h4>
                        <span>{item.role}</span>
                      </div>
                      <p>{item.details}</p>
                      <small>{item.time}</small>
                    </article>
                  ))}
                </div>
                <button type="button" className="principal-ghost-button">
                  View Activity Logs
                </button>
              </section>

              <section className="principal-panel">
                <h3>Department Performance Report</h3>
                <p>Server and resource monitoring</p>
                <div className="principal-progress-list">
                  {departmentPerformance.map((row) => (
                    <div key={row.department} className="principal-progress-item">
                      <div>
                        <strong>{row.department}</strong>
                        <span>{row.percent}%</span>
                      </div>
                      <div className="principal-progress-bar">
                        <div style={{ width: `${row.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="principal-ghost-button">
                  View Reports
                </button>
              </section>
            </div>

            <section className="principal-table-card">
              <div className="principal-table-card__header">
                <h3>Department Performance Report</h3>
                <button type="button">View Detailed Report</button>
              </div>

              <div className="principal-table-wrap">
                <table className="principal-table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Students</th>
                      <th>Teachers</th>
                      <th>Avg Grade</th>
                      <th>Pass Rate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row) => (
                      <tr key={row.department}>
                        <td>{row.department}</td>
                        <td>{row.students}</td>
                        <td>{row.teachers}</td>
                        <td>{row.avgGrade}</td>
                        <td>{row.passRate}</td>
                        <td>{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
          ) : null}

          <aside className="student-content__side">
            <CalendarCard
              title="Calendar"
              month={
                activeSidebarItem === 'monitor-activity' ||
                activeSidebarItem === 'logs-reports'
                  ? 1
                  : undefined
              }
              year={
                activeSidebarItem === 'monitor-activity' ||
                activeSidebarItem === 'logs-reports'
                  ? 2026
                  : undefined
              }
              activeDay={
                activeSidebarItem === 'monitor-activity' ||
                activeSidebarItem === 'logs-reports'
                  ? 14
                  : undefined
              }
            />
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
