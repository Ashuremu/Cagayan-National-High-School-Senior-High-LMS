import { useMemo, useState } from 'react'
import { DashboardSummaryCards, PaginationControls } from '../../../../components'
import type { TeacherActivity } from './types'
import { teacherStatusLabels } from './types'

const summaryCards = [
  { label: 'Teacher Engagement Rate', value: '82%' },
  { label: 'Inactive Teachers', value: '3' },
  { label: 'Pending Grade Submissions', value: '12' },
]

const initialTeachers: TeacherActivity[] = [
  {
    id: '1',
    teacherName: 'Park Santos',
    lessons: 15,
    activity: 15,
    grade: 45,
    lastActivity: 'Feb 20, 2026\n8:00 AM',
    pendingGrades: 2,
    status: 'active',
  },
  {
    id: '2',
    teacherName: 'Sarah Williams',
    lessons: 12,
    activity: 9,
    grade: 20,
    lastActivity: 'Feb 18, 2026\n10:30 AM',
    pendingGrades: 5,
    status: 'low-engagement',
  },
  {
    id: '3',
    teacherName: 'James Rivera',
    lessons: 4,
    activity: 2,
    grade: 8,
    lastActivity: 'Jan 30, 2026\n2:00 PM',
    pendingGrades: 8,
    status: 'inactive',
  },
]

export const TeachersPage = () => {
  const [teachers] = useState(initialTeachers)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTeachers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return teachers
    }

    return teachers.filter((teacher) =>
      [
        teacher.teacherName,
        teacherStatusLabels[teacher.status],
        String(teacher.lessons),
        String(teacher.activity),
        String(teacher.grade),
        teacher.lastActivity.replace('\n', ' '),
        String(teacher.pendingGrades),
      ].some((value) => value.toLowerCase().includes(query))
    )
  }, [teachers, searchQuery])

  return (
    <section className="coordinator-main teachers-page">
      <div className="teachers-header">
        <h2>Teacher Monitoring</h2>
      </div>

      <DashboardSummaryCards cards={summaryCards} />

      <section className="teachers-list-card" aria-label="Teacher performance activity">
        <div className="teachers-list-card__top">
          <h3>Teacher Performance Activity</h3>
          <div className="teachers-list-toolbar">
            <label className="teachers-search">
              <input
                type="search"
                placeholder="Search"
                aria-label="Search teachers"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <span aria-hidden="true">⌕</span>
            </label>
            <button type="button" className="teachers-filter-btn">
              <span aria-hidden="true">☰</span>
              Filter
            </button>
          </div>
        </div>

        <div className="teachers-table-wrap">
          <table className="teachers-table">
            <thead>
              <tr>
                <th>Teacher Name</th>
                <th>Lessons</th>
                <th>Activity</th>
                <th>Grade</th>
                <th>Last Activity</th>
                <th>Pending Grades</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.teacherName}</td>
                  <td>{teacher.lessons}</td>
                  <td>{teacher.activity}</td>
                  <td>{teacher.grade}</td>
                  <td className="teachers-table__last-activity">{teacher.lastActivity}</td>
                  <td>{teacher.pendingGrades}</td>
                  <td>
                    <span className={`teachers-status teachers-status--${teacher.status}`}>
                      <span className="teachers-status__dot" aria-hidden="true" />
                      {teacherStatusLabels[teacher.status]}
                    </span>
                  </td>
                  <td>
                    <div className="teachers-actions">
                      <button type="button">VIEW</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationControls
          className="teachers-pagination"
          fieldClassName="teachers-pagination__field"
        />
      </section>
    </section>
  )
}
