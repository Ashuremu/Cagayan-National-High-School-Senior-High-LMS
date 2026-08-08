import { useState } from 'react'
import type { ActiveActivity } from './types'

const initialActivities: ActiveActivity[] = [
  {
    id: '1',
    activityName: '01 Assignment 02 Nature & Elements of Communication',
    status: 'Ongoing',
    subject: 'Oral Communication',
    activityType: 'Assignment',
    submission: '2/60',
    deadline: '2/14/2026',
    action: 'VIEW',
  },
]

export const ActiveActivitiesPage = () => {
  const [activities] = useState(initialActivities)

  return (
    <section className="active-activities-page">
      <div className="active-activities-header">
        <h2>Active Activities</h2>
      </div>

      <section className="active-activities-table-card" aria-label="Active activities list">
        <div className="active-activities-table-card__toolbar">
          <button type="button" className="active-activities-filter-btn">
            <span aria-hidden="true">☰</span>
            Filter
          </button>
        </div>

        <div className="active-activities-table-wrap">
          <table className="active-activities-table">
            <thead>
              <tr>
                <th>ACTIVITY NAME</th>
                <th>STATUS</th>
                <th>SUBJECT</th>
                <th>ACTIVITY TYPE</th>
                <th>SUBMISSION</th>
                <th>DEADLINE</th>
                <th>ACTION BUTTON</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td className="active-activities-table__name">{activity.activityName}</td>
                  <td>{activity.status}</td>
                  <td>{activity.subject}</td>
                  <td>{activity.activityType}</td>
                  <td>{activity.submission}</td>
                  <td>{activity.deadline}</td>
                  <td>
                    <button type="button" className="active-activities-action-btn">
                      {activity.action}
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
