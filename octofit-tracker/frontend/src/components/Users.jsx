import { useEffect, useState } from 'react'

// VITE_CODESPACE_NAME must be defined in .env.local when running in Codespaces
// Example: VITE_CODESPACE_NAME=your-codespace-name
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/users/`)
      .then((res) => res.json())
      .then((data) => {
        // Handle both array and paginated responses
        setUsers(Array.isArray(data) ? data : data.data ?? data.results ?? [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-4">Loading users...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p className="text-muted">No users found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id ?? idx}>
                <td>{user.name ?? user.username ?? '-'}</td>
                <td>{user.email ?? '-'}</td>
                <td>{user.points ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Users
