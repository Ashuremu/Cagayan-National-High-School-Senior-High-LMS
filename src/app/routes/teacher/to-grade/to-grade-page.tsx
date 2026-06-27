import { useState } from 'react'
import type { GradeSubmission } from './types'

const initialSubmissions: GradeSubmission[] = Array.from({ length: 10 }, (_, index) => ({
  id: String(index + 1),
  name: 'Juan Aguilar',
  subject: 'Oral Communication',
  activity: '1 Assignment 02',
  dateSubmitted: '2/14/2026',
  deadline: '2/14/2026',
  status: 'Submitted',
  action: 'VIEW',
}))

export const ToGradePage = () => {
  const [submissions] = useState(initialSubmissions)

  return (
    <section className="to-grade-page">
      <div className="to-grade-header">
        <h2>To Grade</h2>
      </div>

      <section className="to-grade-table-card" aria-label="Submissions to grade">
        <div className="to-grade-table-card__toolbar">
          <button type="button" className="to-grade-filter-btn">
            <span aria-hidden="true">☰</span>
            Filter
          </button>
        </div>

        <div className="to-grade-table-wrap">
          <table className="to-grade-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>Subject</th>
                <th>ACTIVITY</th>
                <th>DATE SUBMITTED</th>
                <th>DEADLINE</th>
                <th>STATUS</th>
                <th>ACTION BUTTON</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={submission.id}>
                  <td>
                    {index + 1}. {submission.name}
                  </td>
                  <td>{submission.subject}</td>
                  <td>{submission.activity}</td>
                  <td>{submission.dateSubmitted}</td>
                  <td>{submission.deadline}</td>
                  <td>{submission.status}</td>
                  <td>
                    <button type="button" className="to-grade-action-btn">
                      {submission.action}
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
