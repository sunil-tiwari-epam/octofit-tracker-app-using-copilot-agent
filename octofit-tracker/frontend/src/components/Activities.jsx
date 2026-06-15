import { useEffect, useState } from 'react'

// VITE_CODESPACE_NAME must be defined in .env.local when running in Codespaces
// Example: VITE_CODESPACE_NAME=your-codespace-name
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/`)
      .then((res) => res.json())
      .then((data) => {
        // Handle both array and paginated responses
        setActivities(Array.isArray(data) ? data : data.data ?? data.results ?? [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-4">Loading activities...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p className="text-muted">No activities found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Type</th>
              <th>Duration</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={activity._id ?? idx}>
                <td>{activity.type ?? activity.activity_type ?? '-'}</td>
                <td>{activity.duration ?? '-'}</td>
                <td>{activity.date ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Activities
