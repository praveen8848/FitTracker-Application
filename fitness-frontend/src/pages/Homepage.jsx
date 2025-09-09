import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, Typography, Button, AppBar, Toolbar, Container, Fade, 
  IconButton, Tooltip
} from '@mui/material';
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const HomePage = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  // Collection of high-quality fitness/AI-themed background images
  const backgroundImages = [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f0b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ];

  // Function to cycle through backgrounds
  const changeBackground = () => {
    setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  };

  // Optional: Auto-cycle backgrounds every 10 seconds
  useEffect(() => {
    const interval = setInterval(changeBackground, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    
<AppBar
  position="sticky"
  elevation={0}
  sx={{
    background: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  }}
>
  <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
    {/* Left spacer for balance */}
    <Box sx={{ width: 40 }} />
    
    {/* Centered Logo */}
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      <FitnessCenter sx={{ 
        color: 'primary.main', 
        fontSize: '2.5rem',
        filter: 'drop-shadow(0 2px 4px rgba(0, 229, 255, 0.3))'
      }} />
      <Typography
        variant="h3"
        component="div"
        sx={{
          fontFamily: "'Montserrat', 'Poppins', sans-serif",
          fontWeight: 800,
          letterSpacing: '2px',
          background: 'linear-gradient(45deg, #00e5ff 0%, #3dd0ff 50%, #00b8d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          textShadow: '0 2px 8px rgba(0, 229, 255, 0.4)',
          fontSize: { xs: '1.8rem', md: '2.2rem' }
        }}
      >
        FITTRACKER
      </Typography>
    </Box>
    
    {/* Right side - Background changer */}
    <Tooltip title="Change background" arrow>
      <IconButton 
        onClick={changeBackground} 
        sx={{ 
          color: 'rgba(255, 255, 255, 0.8)',
          background: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#00e5ff',
            transform: 'rotate(45deg)',
            transition: 'all 0.3s ease'
          }
        }}
      >
        <ShuffleIcon />
      </IconButton>
    </Tooltip>
  </Toolbar>
</AppBar>

      {/* HERO SECTION with dynamic background */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transition: 'background-image 1s ease-in-out',
          // Gradient overlay
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(25, 118, 210, 0.6) 100%)',
          },
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Fade in={true} timeout={1500}>
            <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'white', 
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                }}
              >
                Transform Your Fitness with AI Intelligence
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  mb: 4,
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  lineHeight: 1.6
                }}
              >
                Just enter your activity's <Box component="span" sx={{ color: '#00e5ff', fontWeight: 'bold' }}>duration</Box> and <Box component="span" sx={{ color: '#00e5ff', fontWeight: 'bold' }}>calories burned</Box>. Our advanced AI analyzes your performance to deliver personalized recommendations that optimize your fitness journey.
              </Typography>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #00e5ff 0%, #3dd0ff 100%)',
                  borderRadius: '50px',
                  py: 2,
                  px: 6,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(0, 229, 255, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 15px 40px rgba(0, 229, 255, 0.6)',
                    background: 'linear-gradient(45deg, #00b8d4 0%, #29b6f6 100%)',
                  },
                }}
              >
                Start Your AI Fitness Journey
              </Button>
              
              {/* Feature highlights */}
              <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
                {[
                  { text: 'AI-Powered Insights', emoji: '🧠' },
                  { text: 'Personalized Workouts', emoji: '💪' },
                  { text: 'Smart Progress Tracking', emoji: '📊' }
                ].map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '1.5rem' }}>{feature.emoji}</Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 'medium' }}>
                      {feature.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
        <Container>
          <Typography variant="h3" sx={{ textAlign: 'center', color: 'white', mb: 6, fontWeight: 'bold' }}>
            How FitTracker AI Works
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {[
              {
                step: '1',
                title: 'Track Your Activity',
                description: 'Log your workout duration and calories burned with our simple interface.',
                icon: '⏱️'
              },
              {
                step: '2',
                title: 'AI Analysis',
                description: 'Our advanced algorithms analyze your data to understand your performance patterns.',
                icon: '🤖'
              },
              {
                step: '3',
                title: 'Get Recommendations',
                description: 'Receive personalized suggestions to optimize your fitness routine and results.',
                icon: '💡'
              }
            ].map((feature, index) => (
              <Box 
                key={index} 
                sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    background: 'rgba(255, 255, 255, 0.08)',
                  }
                }}
              >
                <Typography sx={{ fontSize: '3rem', mb: 2 }}>{feature.icon}</Typography>
                <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;