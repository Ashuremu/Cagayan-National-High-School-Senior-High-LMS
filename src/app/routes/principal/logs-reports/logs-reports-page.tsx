import { useMemo, useState } from 'react'
import { PaginationControls } from '../../../../components'
import type { DepartmentReport } from './types'

const summaryCards = [
  { label: 'Top Performing Department', value: 'STEM: 95%' },
  { label: 'Least Performing Department', value: 'ABM: 80%' },
  { label: 'Performance Overview', value: '88.75%' },
]

const initialReports: DepartmentReport[] = [
  {
    id: '1',
    department: 'STEM',
    students: '284',
    teachers: '12',
    avgGrade: '88%',
    passRate: '95%',
    action: 'VIEW',
  },
  {
    id: '2',
    department: 'HUMSS',
    students: '310',
    teachers: '15',
    avgGrade: '88%',
    passRate: '90%',
    action: 'VIEW',
  },
  {
    id: '3',
    department: 'ABM',
    students: '295',
    teachers: '14',
    avgGrade: '88%',
    passRate: '80%',
    action: 'VIEW',
  },
]

export const LogsReportsPage = () => {
  const [reports] = useState(initialReports)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredReports = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return reports
    }

    return reports.filter((report) =>
      [
        report.department,
        report.students,
        report.teachers,
        report.avgGrade,
        report.passRate,
        report.action,
      ].some((value) => value.toLowerCase().includes(query))
    )
  }, [reports, searchQuery])

  return (
    <section className="principal-main logs-reports-page">
      <div className="logs-reports-header">
        <h2>Reports</h2>
        <button type="button" className="logs-reports-download-btn">
          Download Report
        </button>
      </div>

      <section className="logs-reports-summary-grid" aria-label="Report summary cards">
        {summaryCards.map((card) => (
          <article key={card.label} className="logs-reports-summary-card">
            <p>{card.label}</p>
            <strong>{card.value}</strong>
          </article>
        ))}
      </section>

      <section className="logs-reports-list-card" aria-label="Department performance report">
        <div className="logs-reports-list-card__top">
          <h3>Department Performance Report</h3>
          <div className="logs-reports-toolbar">
            <label className="logs-reports-search">
              <input
                type="search"
                placeholder="Search"
                aria-label="Search department reports"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <span aria-hidden="true">⌕</span>
            </label>
            <button type="button" className="logs-reports-filter-btn">
              <span aria-hidden="true">☰</span>
              Filter
            </button>
          </div>
        </div>

        <div className="logs-reports-table-wrap">
          <table className="logs-reports-table">
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
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.department}</td>
                  <td>{report.students}</td>
                  <td>{report.teachers}</td>
                  <td>{report.avgGrade}</td>
                  <td>{report.passRate}</td>
                  <td>{report.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationControls
          className="logs-reports-pagination"
          fieldClassName="logs-reports-pagination__field"
        />
      </section>
    </section>
  )
}
