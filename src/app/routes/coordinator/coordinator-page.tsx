import { useEffect, useMemo, useState } from 'react'
import {
  ActivityOverviewTable,
  AppSidebar,
  CalendarCard,
  DashboardSummaryCards,
  SegmentTabs,
} from '../../../components'
import { fetchTeachers } from '../../../api/users/users-api'
import type { ManageUserRecord } from '../../../api/users/users-api'
import { RouteNavbar } from '../navbar'
import { EnrollmentPage } from './enrollment'
import { SubjectsPage } from './subjects'
import { TeachersPage } from './teachers'

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
  const [teachers, setTeachers] = useState<ManageUserRecord[]>([])

  useEffect(() => {
    let isMounted = true

    void fetchTeachers().then((result) => {
      if (!isMounted) return
      if (result.ok) {
        setTeachers(result.data.teachers)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  const activityRows = useMemo(
    () =>
      teachers.map((teacher) => ({
        teacher: teacher.name,
        lessonsUploaded: '—',
        activitiesPosted: '—',
        gradersPosted: '—',
        status: teacher.status,
        action: 'VIEW',
      })),
    [teachers]
  )

  const summaryCards = [
    { label: 'Total Teachers', value: String(teachers.length) },
    { label: 'Total Students', value: '1,250' },
    { label: 'Total Subjects', value: '45' },
    { label: 'Pending Enrollments', value: '12' },
  ]

  return (
    <div className="student-layout">
      <AppSidebar
        items={sidebarItems}
        activeItemId={activeSidebarItem}
        logoAlt="CNHS logo"
        onItemClick={setActiveSidebarItem}
      />

      <div className="student-main">
        <RouteNavbar />
        {activeSidebarItem === 'home' && (
          <SegmentTabs items={topTabs} activeTabId="dashboard" ariaLabel="Coordinator top tabs" />
        )}

        <main className="student-content coordinator-content">
          {activeSidebarItem === 'enrollment' ? (
            <EnrollmentPage />
          ) : activeSidebarItem === 'subjects' ? (
            <SubjectsPage />
          ) : activeSidebarItem === 'teachers' ? (
            <TeachersPage />
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
