import { useEffect, useState } from 'react'

// VITE_CODESPACE_NAME must be defined in .env.local when running in Codespaces
// Example: VITE_CODESPACE_NAME=your-codespace-name
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/workouts/`)
      .then((res) => res.json())
      .then((data) => {
        // Handle both array and paginated responses
        setWorkouts(Array.isArray(data) ? data : data.data ?? data.results ?? [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-4">Loading workouts...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-muted">No workout suggestions yet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, idx) => (
              <tr key={workout._id ?? idx}>
                <td>{workout.name ?? '-'}</td>
                <td>{workout.description ?? '-'}</td>
                <td>{workout.difficulty ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Workouts
