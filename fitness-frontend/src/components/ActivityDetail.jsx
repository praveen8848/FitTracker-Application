// src/components/ActivityDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Container,
  CircularProgress,
  Button,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  useTheme
} from '@mui/material';
import {
  ArrowBack,
  DirectionsRun,
  LocalFireDepartment,
  Timer,
  CalendarToday,
  Insights,
  ModelTraining,
  HealthAndSafety,
  CheckCircleOutline,
  LabelImportant,
  TrendingUp,
  AutoAwesome,
  Recommend,
  Schedule,
  Whatshot,
  TrendingFlat,
  FitnessCenter
} from '@mui/icons-material';
import { getActivityDetail } from '../services/api';

// A reusable component for the main stat boxes
const StatCard = ({ icon, title, value, unit, color = 'primary' }) => {
  const theme = useTheme();
  
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        transition: 'all 0.3s ease',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          borderColor: `${color}.main`
        }
      }}
    >
      <Avatar sx={{ 
        bgcolor: `${color}.main`, 
        mb: 2,
        width: 60, 
        height: 60,
        background: `linear-gradient(45deg, ${theme.palette[color].main}, ${theme.palette[color].dark})`
      }}>
        {icon}
      </Avatar>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium', mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
        {unit}
      </Typography>
    </Paper>
  );
};

// Enhanced reusable component for each section of the AI recommendation
const RecommendationSection = ({ icon, title, children, color = 'primary' }) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        borderRadius: 3,
        background: `linear-gradient(145deg, ${theme.palette[color].light}15, ${theme.palette[color].dark}20)`,
        backdropFilter: 'blur(16px)',
        border: `1px solid ${theme.palette[color].main}30`,
        boxShadow: `0 12px 40px ${theme.palette[color].main}15`,
        transition: 'all 0.4s ease',
        overflow: 'hidden',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${theme.palette[color].main}, ${theme.palette[color].dark})`,
        },
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 20px 50px ${theme.palette[color].main}25`,
          borderColor: `${theme.palette[color].main}50`,
        }
      }}
    >
      <CardContent sx={{ p: 4, pt: 5 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Box sx={{ 
            background: `linear-gradient(45deg, ${theme.palette[color].main}, ${theme.palette[color].dark})`, 
            borderRadius: '50%', 
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 20px ${theme.palette[color].main}40`
          }}>
            {React.cloneElement(icon, { sx: { color: 'white', fontSize: 28 } })}
          </Box>
          <Typography variant="h5" sx={{ 
            fontWeight: '800', 
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            background: `linear-gradient(45deg, ${theme.palette[color].main}, ${theme.palette[color].light})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {title}
          </Typography>
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
};

// Component to parse and format AI analysis with bullet points and highlights
const AnalysisRenderer = ({ analysis }) => {
  if (!analysis) return null;
  
  // Split analysis into bullet points if it contains list-like structure
  const points = analysis.split(/\d+\.|\n-|\n•|\n\*|\.\s+(?=[A-Z])/).filter(point => point.trim().length > 0);
  
  if (points.length <= 1) {
    // Single paragraph - just highlight key phrases and ensure it ends with a period
    const highlightPatterns = [
      /\b(high|intense|excellent|great|well|good|improved|increased)\b/gi,
      /\b(moderate|average|consistent|steady|maintained)\b/gi,
      /\b(low|poor|decreased|reduced|limited)\b/gi,
      /\b(recommend|suggest|advise|consider|try|implement)\b/gi,
      /\b(important|crucial|essential|critical|vital|key)\b/gi
    ];
    
    let formattedText = analysis.trim();
    
    // Ensure the text ends with a period
    if (!formattedText.endsWith('.')) {
      formattedText += '.';
    }
    
    // Apply highlights
    formattedText = formattedText.replace(
      highlightPatterns[0], 
      '<span style="color: #4caf50; font-weight: bold;">$&</span>'
    );
    formattedText = formattedText.replace(
      highlightPatterns[1], 
      '<span style="color: #ff9800; font-weight: bold;">$&</span>'
    );
    formattedText = formattedText.replace(
      highlightPatterns[2], 
      '<span style="color: #f44336; font-weight: bold;">$&</span>'
    );
    formattedText = formattedText.replace(
      highlightPatterns[3], 
      '<span style="color: #2196f3; font-weight: bold;">$&</span>'
    );
    formattedText = formattedText.replace(
      highlightPatterns[4], 
      '<span style="color: #9c27b0; font-weight: bold;">$&</span>'
    );
    
    return (
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'rgba(255, 255, 255, 0.85)', 
          lineHeight: 1.8,
          fontSize: '1.05rem'
        }}
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    );
  }
  
  // Multiple bullet points - ensure each ends with a period
  return (
    <List dense sx={{ py: 0 }}>
      {points.map((point, index) => {
        // Ensure each point ends with a period
        let formattedPoint = point.trim();
        if (!formattedPoint.endsWith('.')) {
          formattedPoint += '.';
        }
        
        // Highlight key phrases in each point
        formattedPoint = formattedPoint.replace(
          /\b(high|intense|excellent|great|well|good|improved|increased)\b/gi, 
          '<span style="color: #4caf50; font-weight: bold;">$&</span>'
        );
        formattedPoint = formattedPoint.replace(
          /\b(moderate|average|consistent|steady|maintained)\b/gi, 
          '<span style="color: #ff9800; font-weight: bold;">$&</span>'
        );
        formattedPoint = formattedPoint.replace(
          /\b(low|poor|decreased|reduced|limited)\b/gi, 
          '<span style="color: #f44336; font-weight: bold;">$&</span>'
        );
        formattedPoint = formattedPoint.replace(
          /\b(recommend|suggest|advise|consider|try|implement)\b/gi, 
          '<span style="color: #2196f3; font-weight: bold;">$&</span>'
        );
        formattedPoint = formattedPoint.replace(
          /\b(important|crucial|essential|critical|vital|key)\b/gi, 
          '<span style="color: #9c27b0; font-weight: bold;">$&</span>'
        );
        
        return (
          <ListItem key={index} sx={{ 
            px: 0, 
            py: 1.5, 
            alignItems: 'flex-start',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
            borderRadius: 2,
            mb: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
            }
          }}>
            <ListItemIcon sx={{ minWidth: 36, pt: 0.5 }}>
              <LabelImportant sx={{ 
                color: 'primary.main', 
                fontSize: '1.2rem',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }} />
            </ListItemIcon>
            <ListItemText 
              primary={<span dangerouslySetInnerHTML={{ __html: formattedPoint }} />}
              primaryTypographyProps={{ 
                sx: { 
                  color: 'rgba(255, 255, 255, 0.85)', 
                  lineHeight: 1.6,
                  fontSize: '1.05rem'
                } 
              }} 
            />
          </ListItem>
        );
      })}
    </List>
  );
};

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
      } catch (error) {
        console.error("Failed to fetch activity:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivityDetail();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%)'
      }}>
        <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (!activity) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        mt: 4,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h6" color="text.secondary">
          Activity not found.
        </Typography>
      </Box>
    );
  }

  const {
    type,
    duration,
    durationMinutes,
    caloriesBurned,
    calories,
    createdAt,
    recommendation,
    suggestions,
    safety,
    improvements
  } = activity;

  // Calculate intensity based on duration and calories
  const calculateIntensity = () => {
    const totalDuration = duration || durationMinutes || 0;
    const totalCalories = caloriesBurned || calories || 0;
    
    if (!totalDuration || !totalCalories) return 'Unknown';
    
    const intensityRatio = totalCalories / totalDuration;
    if (intensityRatio < 5) return 'Low';
    if (intensityRatio < 8) return 'Moderate';
    if (intensityRatio < 12) return 'High';
    return 'Very High';
  };

  const intensity = calculateIntensity();
  const totalDuration = duration || durationMinutes || 0;
  const totalCalories = caloriesBurned || calories || 0;
  
  // Format time from createdAt
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Container maxWidth="xl" sx={{ 
      py: 4,
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%)',
      minHeight: '100vh'
    }}>
      <Button 
        component={RouterLink} 
        to="/dashboard" 
        startIcon={<ArrowBack />} 
        sx={{ 
          mb: 4,
          color: 'primary.main',
          '&:hover': {
            background: 'rgba(25, 118, 210, 0.1)'
          }
        }}
      >
        Back to Dashboard
      </Button>

      <Grid container spacing={4} justifyContent="center">
        {/* LEFT COLUMN: Activity Stats - Centered and enhanced */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'linear-gradient(145deg, rgba(14, 32, 56, 0.9) 0%, rgba(25, 118, 210, 0.2) 100%)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(135, 184, 255, 0.25)',
                width: '100%',
                maxWidth: '400px',
                position: 'sticky',
                top: '100px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)'
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #2196f3, #1976d2)',
                  mb: 2,
                  boxShadow: '0 6px 20px rgba(33, 150, 243, 0.4)'
                }}>
                  <DirectionsRun sx={{ fontSize: 44, color: 'white' }} />
                </Box>
                <Typography variant="h4" sx={{ 
                  fontWeight: '800', 
                  mb: 1, 
                  textTransform: 'capitalize', 
                  color: 'white',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}>
                  {type ? type.toLowerCase() : 'Activity'}
                </Typography>
                <Chip 
                  label={intensity + ' Intensity'} 
                  sx={{ 
                    background: `linear-gradient(45deg, ${intensity === 'High' || intensity === 'Very High' ? '#f44336' : intensity === 'Moderate' ? '#ff9800' : '#4caf50'}, ${intensity === 'High' || intensity === 'Very High' ? '#d32f2f' : intensity === 'Moderate' ? '#f57c00' : '#2e7d32'})`,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    height: '32px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }} 
                />
              </Box>

              <Divider sx={{ 
                my: 3, 
                borderColor: 'rgba(255, 255, 255, 0.15)',
                borderWidth: '1px'
              }} />

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <StatCard 
                    icon={<Schedule />} 
                    title="Time" 
                    value={formatTime(createdAt)} 
                    unit=""
                    color="info"
                  />
                </Grid>
                <Grid item xs={6}>
                  <StatCard 
                    icon={<CalendarToday />} 
                    title="Date" 
                    value={new Date(createdAt).toLocaleDateString()} 
                    unit=""
                    color="secondary"
                  />
                </Grid>
              </Grid>

              {/* Performance Metrics */}
              <Box sx={{ 
                p: 3, 
                background: 'rgba(255, 255, 255, 0.08)', 
                borderRadius: 3, 
                mb: 3,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: '700', 
                  mb: 2, 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}>
                  <TrendingFlat sx={{ mr: 1, color: 'primary.main' }} /> Performance Metrics
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Duration
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                      {totalDuration} min
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(100, totalDuration)} 
                    sx={{ 
                      height: 10, 
                      borderRadius: 5,
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(45deg, #2196f3, #1976d2)',
                        borderRadius: 5,
                        boxShadow: '0 0 10px rgba(33, 150, 243, 0.5)'
                      }
                    }} 
                  />
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Calories Burned
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                      {totalCalories} kcal
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(100, totalCalories / 2)} 
                    sx={{ 
                      height: 10, 
                      borderRadius: 5,
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(45deg, #f44336, #d32f2f)',
                        borderRadius: 5,
                        boxShadow: '0 0 10px rgba(244, 67, 54, 0.5)'
                      }
                    }} 
                  />
                </Box>
                
                {/* Efficiency Meter */}
                {totalDuration > 0 && totalCalories > 0 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Efficiency
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                        {Math.round((totalCalories / totalDuration) * 10)}/10
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(100, (totalCalories / totalDuration) * 10)} 
                      sx={{ 
                        height: 10, 
                        borderRadius: 5,
                        backgroundColor: 'rgba(255, 255, 255, 0.12)',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(45deg, #4caf50, #2e7d32)',
                          borderRadius: 5,
                          boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)'
                        }
                      }} 
                    />
                  </Box>
                )}
              </Box>
              
              {/* Activity Type Widget */}
              <Box sx={{ 
                p: 3, 
                background: 'linear-gradient(45deg, rgba(156, 39, 176, 0.15), rgba(103, 58, 183, 0.25))', 
                borderRadius: 3,
                border: '1px solid rgba(156, 39, 176, 0.4)',
                boxShadow: '0 8px 24px rgba(156, 39, 176, 0.2)'
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: '700', 
                  mb: 2, 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}>
                  <FitnessCenter sx={{ mr: 1, color: 'secondary.main' }} /> Activity Profile
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(255, 255, 255, 0.85)', 
                  lineHeight: 1.6,
                  fontSize: '0.95rem'
                }}>
                  {type === 'RUNNING' && 'Running improves cardiovascular health, builds endurance, and strengthens lower body muscles.'}
                  {type === 'WALKING' && 'Walking is a low-impact exercise that improves circulation, maintains healthy weight, and reduces stress.'}
                  {type === 'CYCLING' && 'Cycling builds leg strength, improves joint mobility, and enhances cardiovascular fitness.'}
                  {type === 'WEIGHT_TRAINING' && 'Weight training increases muscle mass, strengthens bones, and boosts metabolism.'}
                  {type === 'YOGA' && 'Yoga enhances flexibility, improves balance, reduces stress, and promotes mindfulness.'}
                  {type === 'CARDIO' && 'Cardiovascular exercise improves heart health, increases lung capacity, and burns calories.'}
                  {type === 'STRETCHING' && 'Stretching improves flexibility, increases range of motion, and reduces injury risk.'}
                  {!['RUNNING', 'WALKING', 'CYCLING', 'WEIGHT_TRAINING', 'YOGA', 'CARDIO', 'STRETCHING'].includes(type) && 
                    'This activity contributes to your overall fitness and wellbeing.'}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>

        {/* RIGHT COLUMN: AI Recommendation - Enhanced aesthetics */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={4}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Box sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #9c27b0, #673ab7)',
                mb: 2,
                boxShadow: '0 6px 20px rgba(156, 39, 176, 0.5)'
              }}>
                <AutoAwesome sx={{ fontSize: 36, color: 'white' }} />
              </Box>
              <Typography variant="h3" sx={{ 
                fontWeight: '800', 
                color: 'white', 
                mb: 1,
                background: 'linear-gradient(45deg, #9c27b0, #673ab7)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}>
                AI-Powered Analysis
              </Typography>
              <Typography variant="body1" sx={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                maxWidth: '600px', 
                mx: 'auto',
                fontSize: '1.1rem'
              }}>
                Personalized insights and recommendations based on your activity data.
              </Typography>
            </Box>

            {recommendation && (
              <RecommendationSection 
                icon={<Insights />} 
                title="Performance Analysis"
                color="primary"
              >
                <AnalysisRenderer analysis={recommendation.analysis || recommendation} />
              </RecommendationSection>
            )}

            {suggestions?.length > 0 && (
              <RecommendationSection 
                icon={<TrendingUp />} 
                title="Training Suggestions"
                color="secondary"
              >
                <List dense sx={{ py: 0 }}>
                  {suggestions.map((item, index) => {
                    // Ensure each suggestion ends with a period
                    let formattedSuggestion = item.trim();
                    if (!formattedSuggestion.endsWith('.')) {
                      formattedSuggestion += '.';
                    }
                    
                    return (
                      <ListItem key={index} sx={{ 
                        px: 0, 
                        py: 1.5,
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
                        borderRadius: 2,
                        mb: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
                        }
                      }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <LabelImportant sx={{ 
                            color: 'secondary.main',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                          }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={formattedSuggestion} 
                          primaryTypographyProps={{ 
                            sx: { 
                              color: 'rgba(255, 255, 255, 0.85)', 
                              fontWeight: 'medium',
                              fontSize: '1.05rem'
                            } 
                          }} 
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </RecommendationSection>
            )}

            {safety?.length > 0 && (
              <RecommendationSection 
                icon={<HealthAndSafety />} 
                title="Safety Guidelines"
                color="warning"
              >
                <List dense sx={{ py: 0 }}>
                  {safety.map((item, index) => {
                    // Ensure each safety guideline ends with a period
                    let formattedSafety = item.trim();
                    if (!formattedSafety.endsWith('.')) {
                      formattedSafety += '.';
                    }
                    
                    return (
                      <ListItem key={index} sx={{ 
                        px: 0, 
                        py: 1.5,
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
                        borderRadius: 2,
                        mb: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
                        }
                      }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <LabelImportant sx={{ 
                            color: 'warning.main',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                          }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={formattedSafety} 
                          primaryTypographyProps={{ 
                            sx: { 
                              color: 'rgba(255, 255, 255, 0.85)', 
                              fontWeight: 'medium',
                              fontSize: '1.05rem'
                            } 
                          }} 
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </RecommendationSection>
            )}
            
            {improvements?.length > 0 && (
              <RecommendationSection 
                icon={<CheckCircleOutline />} 
                title="Potential Improvements"
                color="success"
              >
                <List dense sx={{ py: 0 }}>
                  {improvements.map((item, index) => {
                    // Ensure each improvement ends with a period
                    let formattedImprovement = item.trim();
                    if (!formattedImprovement.endsWith('.')) {
                      formattedImprovement += '.';
                    }
                    
                    return (
                      <ListItem key={index} sx={{ 
                        px: 0, 
                        py: 1.5,
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
                        borderRadius: 2,
                        mb: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
                        }
                      }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <LabelImportant sx={{ 
                            color: 'success.main',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                          }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={formattedImprovement} 
                          primaryTypographyProps={{ 
                            sx: { 
                              color: 'rgba(255, 255, 255, 0.85)', 
                              fontWeight: 'medium',
                              fontSize: '1.05rem'
                            } 
                          }} 
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </RecommendationSection>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActivityDetail;