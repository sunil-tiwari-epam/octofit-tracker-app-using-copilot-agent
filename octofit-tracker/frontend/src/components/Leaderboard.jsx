import { useEffect, useState } from 'react'

// VITE_CODESPACE_NAME must be defined in .env.local when running in Codespaces
// Example: VITE_CODESPACE_NAME=your-codespace-name
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/leaderboard/`)
      .then((res) => res.json())
      .then((data) => {
        // Handle both array and paginated responses
        setEntries(Array.isArray(data) ? data : data.data ?? data.results ?? [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-4">Loading leaderboard...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2>Leaderboard</h2>
      {entries.length === 0 ? (
        <p className="text-muted">No leaderboard data yet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={entry._id ?? idx}>
                <td>{idx + 1}</td>
                <td>{entry.name ?? entry.username ?? '-'}</td>
                <td>{entry.points ?? entry.score ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Leaderboard
