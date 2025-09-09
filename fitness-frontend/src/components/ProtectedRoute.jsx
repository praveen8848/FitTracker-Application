import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

// This component protects routes that require authentication
const ProtectedRoute = ({ children }) => {
  // Get the authentication state from Redux
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Show nothing while checking authentication status
  if (loading) {
    return null; // Or you can return a loading spinner here later
  }

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;