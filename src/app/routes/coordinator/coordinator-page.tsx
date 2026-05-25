import { useState } from 'react'
import {
  ActivityOverviewTable,
  AppSidebar,
  CalendarCard,
  DashboardSummaryCards,
  SegmentTabs,
} from '../../../components'
import { RouteNavbar } from '../navbar'
import { EnrollmentPage } from './enrollment'

const sidebarItems = [
  { id: 'home', label: 'Home' },
  { id: 'enrollment', label: 'Enrollment' },
  { id: 'subjects', label: 'Subjects' },
  { id: 'teachers', label: 'Teachers' },
]

const topTabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'news', label: 'News' },
]

const summaryCards = [
  { label: 'Total Teachers', value: '75' },
  { label: 'Total Students', value: '1,250' },
  { label: 'Total Subjects', value: '45' },
  { label: 'Pending Enrollments', value: '12' },
]

const activityRows = [
  {
    teacher: 'Prof. Park Santos',
    lessonsUploaded: '15',
    activitiesPosted: '15',
    gradersPosted: '45',
    status: 'Active',
    action: 'VIEW',
  },
  {
    teacher: 'Sarah Williams',
    lessonsUploaded: '12',
    activitiesPosted: '9',
    gradersPosted: '20',
    status: 'Active',
    action: 'VIEW',
  },
]

const subjectAssignments = [
  {
    subject: 'Oral Communication',
    teacher: 'Park Santos',
    enrolled: '60 Students Enrolled',
    status: 'Assigned',
  },
  {
    subject: 'Earth and Life Science',
    teacher: 'Sarah Williams',
    enrolled: '60 Students Enrolled',
    status: 'Assigned',
  },
  {
    subject: 'General Mathematics',
    teacher: 'No Assigned Teacher Yet',
    enrolled: '0 Students Enrolled',
    status: 'Pending',
  },
]

const enrollmentRequests = [
  { name: 'A Dela Cruz', subject: 'Oral Communication', requested: 'Requested: 2026-01-05' },
  { name: 'A Dela Cruz', subject: 'Earth and Life Science', requested: 'Requested: 2026-01-05' },
  { name: 'A Dela Cruz', subject: 'General Mathematics', requested: 'Requested: 2026-01-05' },
]

export const CoordinatorPage = () => {
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
        <RouteNavbar userName="Coordinator" />
        {activeSidebarItem === 'home' && (
          <SegmentTabs items={topTabs} activeTabId="dashboard" ariaLabel="Coordinator top tabs" />
        )}

        <main className="student-content coordinator-content">
          {activeSidebarItem === 'enrollment' ? (
            <EnrollmentPage />
          ) : activeSidebarItem === 'home' ? (
          <section className="coordinator-main">
            <DashboardSummaryCards cards={summaryCards} />

            <div className="coordinator-panels">
              <section className="coordinator-panel">
                <h3>Subject Assignments</h3>
                <p>Assign teachers to subjects</p>
                <div className="coordinator-list">
                  {subjectAssignments.map((item) => (
                    <article key={item.subject} className="coordinator-list-item">
                      <h4>{item.subject}</h4>
                      <p>{item.teacher}</p>
                      <div className="coordinator-list-item__footer">
                        <span>{item.enrolled}</span>
                        <div className="coordinator-actions">
                          <span
                            className={`coordinator-chip ${
                              item.status === 'Assigned'
                                ? 'coordinator-chip--success'
                                : 'coordinator-chip--warning'
                            }`}
                          >
                            {item.status}
                          </span>
                          <button type="button">
                            {item.status === 'Assigned' ? 'Reassign' : 'Assign Teacher'}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <button type="button" className="coordinator-ghost-button">
                  Manage All Subjects
                </button>
              </section>

              <section className="coordinator-panel">
                <h3>Student Enrollment</h3>
                <p>Pending enrollment requests</p>
                <div className="coordinator-list">
                  {enrollmentRequests.map((item, index) => (
                    <article key={`${item.name}-${item.subject}-${index}`} className="coordinator-list-item">
                      <h4>{item.name}</h4>
                      <p>{item.subject}</p>
                      <div className="coordinator-list-item__footer">
                        <span>{item.requested}</span>
                        <div className="coordinator-actions">
                          <button type="button" className="coordinator-chip coordinator-chip--success-solid">
                            Approved
                          </button>
                          <button type="button" className="coordinator-chip coordinator-chip--danger-solid">
                            Decline
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="coordinator-panel-buttons">
                  <button type="button" className="coordinator-ghost-button">
                    Add Students
                  </button>
                  <button type="button" className="coordinator-ghost-button">
                    View All
                  </button>
                </div>
              </section>
            </div>

            <ActivityOverviewTable rows={activityRows} />
          </section>
          ) : null}

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
