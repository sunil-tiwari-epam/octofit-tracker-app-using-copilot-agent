import { useEffect, useState } from 'react'

// VITE_CODESPACE_NAME must be defined in .env.local when running in Codespaces
// Example: VITE_CODESPACE_NAME=your-codespace-name
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/`)
      .then((res) => res.json())
      .then((data) => {
        // Handle both array and paginated responses
        setTeams(Array.isArray(data) ? data : data.data ?? data.results ?? [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-4">Loading teams...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p className="text-muted">No teams found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team._id ?? idx}>
                <td>{team.name ?? '-'}</td>
                <td>{team.description ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Teams
