import { use } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate, useLocation } from 'react-router'

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext)

  const location = useLocation()

  if (loading) {
    return <p>Loading...</p>
  }

  if (user && user?.email) {
    return children
  }
  return <Navigate state={location.pathname} to='/auth/login'></Navigate>
}

export default PrivateRoute
