import { useEffect, useMemo, useState } from 'react'
import { DashboardSummaryCards, PaginationControls } from '../../../../components'
import { fetchTeachers } from '../../../../api/users/users-api'
import type { ManageUserRecord } from '../../../../api/users/users-api'
import type { TeacherActivity } from './types'
import { teacherStatusLabels } from './types'

function formatLastActivity(value: string | null): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'

  const datePart = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  const timePart = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${datePart}\n${timePart}`
}

function toTeacherActivity(user: ManageUserRecord): TeacherActivity {
  return {
    id: user.id,
    teacherName: user.name,
    email: user.email,
    lessons: null,
    activity: null,
    grade: null,
    lastActivity: formatLastActivity(user.lastLogin),
    pendingGrades: null,
    status: user.status === 'Inactive' ? 'inactive' : 'active',
  }
}

export const TeachersPage = () => {
  const [teachers, setTeachers] = useState<TeacherActivity[]>([])
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(true)
  const [pageError, setPageError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let isMounted = true

    void fetchTeachers().then((result) => {
      if (!isMounted) return
      if (result.ok) {
        setTeachers(result.data.teachers.map(toTeacherActivity))
        setPageError('')
      } else {
        setPageError(result.error.message)
        setTeachers([])
      }
      setIsLoadingTeachers(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const filteredTeachers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return teachers
    }

    return teachers.filter((teacher) =>
      [
        teacher.teacherName,
        teacher.email,
        teacherStatusLabels[teacher.status],
        String(teacher.lessons ?? ''),
        String(teacher.activity ?? ''),
        String(teacher.grade ?? ''),
        teacher.lastActivity.replace('\n', ' '),
        String(teacher.pendingGrades ?? ''),
      ].some((value) => value.toLowerCase().includes(query))
    )
  }, [teachers, searchQuery])

  const summaryCards = useMemo(
    () => [
      { label: 'Total Teachers', value: String(teachers.length) },
      {
        label: 'Active Teachers',
        value: String(teachers.filter((teacher) => teacher.status !== 'inactive').length),
      },
      {
        label: 'Inactive Teachers',
        value: String(teachers.filter((teacher) => teacher.status === 'inactive').length),
      },
    ],
    [teachers]
  )

  return (
    <section className="coordinator-main teachers-page">
      <div className="teachers-header">
        <h2>Teacher Monitoring</h2>
      </div>

      <DashboardSummaryCards cards={summaryCards} />

      {pageError ? (
        <p className="manage-users-error" role="alert">
          {pageError}
        </p>
      ) : null}

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
                <th>Email</th>
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
              {isLoadingTeachers ? (
                <tr>
                  <td colSpan={9}>Loading teachers...</td>
                </tr>
              ) : filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={9}>No teachers found.</td>
                </tr>
              ) : (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.teacherName}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.lessons ?? '—'}</td>
                    <td>{teacher.activity ?? '—'}</td>
                    <td>{teacher.grade ?? '—'}</td>
                    <td className="teachers-table__last-activity">{teacher.lastActivity}</td>
                    <td>{teacher.pendingGrades ?? '—'}</td>
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
                ))
              )}
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
