// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// Import components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ActivityDetail from "./components/ActivityDetail";
import ActivityList from "./components/ActivityList";

// Import pages
import HomePage from "./pages/HomePage"; // ✅ Import the new HomePage
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

// Import auth actions
import { initializeAuth } from "./store/authSlice";

// This layout component will help us conditionally show the Navbar
const AppLayout = () => {
  const location = useLocation();
  // ✅ The global Navbar will be hidden only on the homepage ('/')
  const showNavbar = location.pathname !== '/';

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      {/* The main content area */}
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/activities/:id" element={<ProtectedRoute><ActivityDetail /></ProtectedRoute>} />
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;