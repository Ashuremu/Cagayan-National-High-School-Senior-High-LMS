type ActivityOverviewRow = {
  teacher: string
  lessonsUploaded: string
  activitiesPosted: string
  gradersPosted: string
  status: string
  action: string
}

type ActivityOverviewTableProps = {
  rows: ActivityOverviewRow[]
}

export const ActivityOverviewTable = ({ rows }: ActivityOverviewTableProps) => {
  return (
    <section className="dashboard-table-card">
      <div className="dashboard-table-card__header">
        <div>
          <h3>Monitor Teacher Activity</h3>
          <p>Track teacher engagement and contributions</p>
        </div>
        <button type="button">View Detailed Report</button>
      </div>

      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Teacher</th>
              <th>Lessons Uploaded</th>
              <th>Activities Posted</th>
              <th>Graders Posted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.teacher}-${row.action}`}>
                <td>{row.teacher}</td>
                <td>{row.lessonsUploaded}</td>
                <td>{row.activitiesPosted}</td>
                <td>{row.gradersPosted}</td>
                <td>{row.status}</td>
                <td>{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
