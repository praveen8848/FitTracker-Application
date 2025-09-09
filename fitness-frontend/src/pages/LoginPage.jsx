import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import keycloak from '../authConfig';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Fade, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  CircularProgress,
  useScrollTrigger,
  Zoom,
  AppBar,
  Toolbar,
  Avatar,
  Rating
} from '@mui/material';
import { 
  FitnessCenter, 
  TrackChanges, 
  Insights, 
  TrendingUp, 
  Login,
  AppRegistration,
  ArrowDownward,
  HealthAndSafety,
  Dashboard,
  Person
} from '@mui/icons-material';

// Scroll reveal component
function ScrollReveal({ children, threshold = 0.1 }) {
  const trigger = useScrollTrigger({
    threshold: threshold,
    disableHysteresis: true
  });

  return (
    <Zoom in={trigger} style={{ transitionDelay: trigger ? '200ms' : '0ms' }}>
      {children}
    </Zoom>
  );
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    dispatch(login());
  };

  const handleSignUp = () => {
    keycloak.register();
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} thickness={4} sx={{ color: '#00e5ff', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'white', fontFamily: "'Montserrat', sans-serif" }}>
            Redirecting to FitTracker...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        color: 'white',
        padding: 0,
        overflowX: 'hidden',
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      {/* App Bar with centered title only */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: 'transparent',
          py: 3
        }}
      >
        <Toolbar>
          <Typography 
            variant="h3" 
            component="div" 
            sx={{ 
              width: '100%',
              textAlign: 'center',
              fontWeight: 800,
              fontFamily: "'Montserrat', sans-serif",
              background: 'linear-gradient(45deg, #00e5ff 30%, #00b8d4 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '1px'
            }}
          >
            FitTracker
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Hero Section with Get Started */}
      <Box 
        sx={{ 
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          mt: 4,
          mb: 15
        }}
      >
        {/* Animated background elements */}
        <Box 
          sx={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%)',
            animation: 'pulse 8s infinite alternate'
          }}
        />
        <Box 
          sx={{
            position: 'absolute',
            bottom: '-10%',
            left: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 184, 212, 0.1) 0%, transparent 70%)',
            animation: 'pulse 10s infinite alternate-reverse'
          }}
        />
        
        <Container maxWidth="md">
          <Fade in={true} timeout={1500}>
            <Paper 
              elevation={24}
              sx={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                p: { xs: 4, md: 6 },
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 60px 0 rgba(0, 229, 255, 0.25)',
                textAlign: 'center',
                mx: 'auto',
                maxWidth: '600px'
              }}
            >
              <FitnessCenter sx={{ fontSize: 60, color: '#00e5ff', mb: 3, mx: 'auto' }} />
              
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, fontFamily: "'Montserrat', sans-serif" }}>
                Welcome to <Box component="span" sx={{ color: '#00e5ff' }}>FitTracker</Box>
              </Typography>
              
              <Typography variant="h6" sx={{ color: '#cbd5e1', mb: 4, fontFamily: "'Montserrat', sans-serif" }}>
                Your journey to better health starts here
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                <Button
                  onClick={handleLogin}
                  disabled={loading}
                  variant="contained"
                  size="large"
                  startIcon={<Login />}
                  sx={{
                    background: 'linear-gradient(45deg, #00e5ff 30%, #00b8d4 90%)',
                    borderRadius: '12px',
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    fontFamily: "'Montserrat', sans-serif",
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00b8d4 30%, #008ba3 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px 0 rgba(0, 229, 255, 0.5)'
                    },
                    transition: 'all 0.3s ease',
                    '&:disabled': {
                      background: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Sign In
                </Button>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#94a3b8', fontFamily: "'Montserrat', sans-serif" }}>
                    Don't have an account?{' '}
                    <Button 
                      onClick={handleSignUp} 
                      sx={{ 
                        color: '#00e5ff', 
                        fontWeight: 'bold',
                        fontFamily: "'Montserrat', sans-serif",
                        '&:hover': {
                          background: 'rgba(0, 229, 255, 0.1)'
                        }
                      }}
                      startIcon={<AppRegistration />}
                    >
                      Sign Up
                    </Button>
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 6, animation: 'bounce 2s infinite' }}>
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, fontFamily: "'Montserrat', sans-serif" }}>
                  Scroll to explore features
                </Typography>
                <ArrowDownward sx={{ color: '#00e5ff' }} />
              </Box>
            </Paper>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 15, px: 2, mb: 15 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 10, fontWeight: 'bold', fontFamily: "'Montserrat', sans-serif" }}>
            Why Choose <Box component="span" sx={{ color: '#00e5ff' }}>FitTracker</Box>?
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: <TrackChanges sx={{ color: '#00e5ff', fontSize: 60, mb: 3 }} />,
                title: "Precision Tracking",
                description: "Track every aspect of your fitness journey with military-grade precision. Our advanced algorithms ensure no rep goes uncounted and no calorie goes unmeasured."
              },
              {
                icon: <Insights sx={{ color: '#00e5ff', fontSize: 60, mb: 3 }} />,
                title: "AI-Powered Insights",
                description: "Get personalized recommendations powered by cutting-edge artificial intelligence. Our system learns from your progress to optimize your workout and nutrition plans."
              },
              {
                icon: <TrendingUp sx={{ color: '#00e5ff', fontSize: 60, mb: 3 }} />,
                title: "Beautiful Analytics",
                description: "Visualize your progress with stunning charts and graphs. Understand your fitness journey at a glance with our intuitive dashboard."
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <ScrollReveal>
                  <Card sx={{ 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    p: 4,
                    height: '100%',
                    minHeight: '380px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 15px 35px 0 rgba(0, 229, 255, 0.2)'
                    }
                  }}>
                    <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        {feature.icon}
                        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', fontFamily: "'Montserrat', sans-serif" }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#cbd5e1', fontFamily: "'Montserrat', sans-serif" }}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonial Section */}
      <Box sx={{ py: 15, px: 2, background: 'rgba(0, 0, 0, 0.2)', mb: 15 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 8, fontWeight: 'bold', fontFamily: "'Montserrat', sans-serif" }}>
            What Our Users Say
          </Typography>
          
          <Grid container spacing={4}>
            {[
              {
                name: "Sarah Johnson",
                role: "Fitness Enthusiast",
                avatar: "S",
                testimonial: "FitTracker helped me lose 15kg and maintain my fitness routine with personalized AI recommendations that actually work!",
                rating: 5
              },
              {
                name: "Kishan Kumar Maurya",
                role: "Professional Athlete",
                avatar: "K",
                testimonial: "The AI recommendations completely transformed my training regimen. I've achieved peak performance thanks to personalized insights.",
                rating: 5
              },
              {
                name: "Pankaj Baggha",
                role: "Fitness Coach",
                avatar: "P",
                testimonial: "As a coach, I recommend FitTracker to all my clients. The AI-powered suggestions complement my training programs perfectly.",
                rating: 5
              },
              {
                name: "Virat Bhai",
                role: "Bodybuilder",
                avatar: "V",
                testimonial: "Incredible app! The calorie and duration tracking with AI analysis helped me break through my plateau and gain muscle efficiently.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <ScrollReveal>
                  <Paper sx={{ 
                    p: 4, 
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <HealthAndSafety sx={{ color: '#00e5ff', fontSize: 40, mb: 2, mx: 'auto' }} />
                    <Typography variant="h5" sx={{ mb: 3, fontStyle: 'italic', fontWeight: 300, fontFamily: "'Montserrat', sans-serif" }}>
                      "{testimonial.testimonial}"
                    </Typography>
                    <Box>
                      <Rating value={testimonial.rating} readOnly sx={{ color: '#00e5ff', mb: 2 }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                        <Avatar sx={{ bgcolor: '#00e5ff', mr: 2, width: 40, height: 40 }}>
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ color: '#00e5ff', fontFamily: "'Montserrat', sans-serif" }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#cbd5e1', fontFamily: "'Montserrat', sans-serif" }}>
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </ScrollReveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box sx={{ py: 15, px: 2, mb: 15 }}>
        <Container maxWidth="md">
          <ScrollReveal>
            <Paper sx={{ 
              p: 6, 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px'
            }}>
              <Dashboard sx={{ color: '#00e5ff', fontSize: 60, mb: 3 }} />
              <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold', fontFamily: "'Montserrat', sans-serif" }}>
                Ready to Transform Your Fitness Journey?
              </Typography>
              <Typography variant="h6" sx={{ color: '#cbd5e1', mb: 4, fontFamily: "'Montserrat', sans-serif" }}>
                Join thousands of users who have achieved their fitness goals with FitTracker
              </Typography>
              <Button
                onClick={handleLogin}
                variant="contained"
                size="large"
                startIcon={<Login />}
                sx={{
                  background: 'linear-gradient(45deg, #00e5ff 30%, #00b8d4 90%)',
                  borderRadius: '12px',
                  py: 1.5,
                  px: 4,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  fontFamily: "'Montserrat', sans-serif",
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00b8d4 30%, #008ba3 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px 0 rgba(0, 229, 255, 0.5)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Get Started Now
              </Button>
            </Paper>
          </ScrollReveal>
        </Container>
      </Box>

      {/* Global Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
          
          @keyframes pulse {
            0% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
            100% { opacity: 0.6; transform: scale(1); }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}
      </style>
    </Box>
  );
};

export default LoginPage;