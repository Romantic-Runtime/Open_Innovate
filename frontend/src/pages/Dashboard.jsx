import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <span className="logo-open">Open</span>
          <span className="logo-innovate">Innovate</span>
        </div>
        <div className="header-actions">
          <div className="user-info">
            <span>Welcome, {user?.name || 'User'}!</span>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h1>Welcome to Your Dashboard</h1>
          <p>You've successfully logged in!</p>
          <div className="user-card">
            <h3>Your Profile</h3>
            <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <div className="action-card">
              <h3>Register a Project</h3>
              <p>Start a new project and find team members</p>
              <button className="btn-action">Create Project</button>
            </div>
            <div className="action-card">
              <h3>Browse Projects</h3>
              <p>Find exciting projects to join</p>
              <button className="btn-action">Explore</button>
            </div>
            <div className="action-card">
              <h3>My Team</h3>
              <p>Manage your team members</p>
              <button className="btn-action">View Team</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
