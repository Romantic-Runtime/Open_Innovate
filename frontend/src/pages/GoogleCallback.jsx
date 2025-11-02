import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'

const GoogleCallback = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { checkAuth } = useAuth()

  useEffect(() => {
    const handleCallback = async () => {
      const status = searchParams.get('status')
      
      if (status === 'failure') {
        const error = searchParams.get('error') || 'Google authentication failed'
        navigate(`/login?error=${error}`)
        return
      }

      // If success, fetch user data and redirect to their workspace
      try {
        // Fetch current user data from backend
        const response = await authAPI.getCurrentUser()
        const user = response.data.user
        
        // Update auth context
        await checkAuth()
        
        // Redirect to user's current workspace if they have one
        if (user.currentWorkspace) {
          navigate(`/workspace/${user.currentWorkspace}`)
        } else {
          // If no workspace, go to dashboard
          navigate('/dashboard')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        navigate('/login?error=Authentication failed')
      }
    }

    handleCallback()
  }, [searchParams, navigate, checkAuth])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#7FFF00] mx-auto mb-4"></div>
        <p className="text-xl">Completing authentication...</p>
      </div>
    </div>
  )
}

export default GoogleCallback
