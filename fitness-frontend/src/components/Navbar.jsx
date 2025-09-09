import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Check if current page is login page
  const isLoginPage = location.pathname === '/login';
  
  // Hide entire navbar on login page
  if (isLoginPage) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      position="fixed"
      elevation={4}
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
      }}
    >
      <Toolbar sx={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        
        {/* Left Spacer - ensures the title is perfectly centered */}
        <Box sx={{ width: { xs: 'auto', sm: '150px' } }} />

        {/* Centered "FitTracker" Brand - Updated to match LoginPage styling */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FitnessCenterIcon sx={{ 
            color: '#00e5ff', // Same blue color as LoginPage
            fontSize: { xs: '1.8rem', sm: '2.2rem' }, 
            mr: 1.5 
          }} />
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: "'Montserrat', sans-serif", // Same font as LoginPage
              fontSize: { xs: '1.8rem', sm: '2.5rem' },
              fontWeight: 800, // Bold weight to match
              background: 'linear-gradient(45deg, #00e5ff 30%, #00b8d4 90%)', // Same gradient
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.05em',
              textShadow: '0 2px 4px rgba(0, 229, 255, 0.3)',
            }}
          >
            FitTracker
          </Typography>
        </Box>

        {/* Logout Button - only appears if authenticated */}
        <Box sx={{ width: { xs: 'auto', sm: '150px' }, display: 'flex', justifyContent: 'flex-end' }}>
          {isAuthenticated && (
            <Button
              onClick={handleLogout}
              variant="contained"
              startIcon={<LogoutIcon />}
              sx={{
                fontSize: '0.9rem',
                fontWeight: '600',
                backgroundColor: '#dc2626',
                color: 'white',
                borderRadius: '8px',
                px: 3,
                py: 1,
                transition: 'background-color 0.2s, transform 0.2s',
                '&:hover': {
                  backgroundColor: '#b91c1c',
                  transform: 'scale(1.05)',
                },
                '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 } },
                '& .MuiButton-label': { display: { xs: 'none', sm: 'block' } }
              }}
            >
              Sign Out
            </Button>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;