// src/components/ActivityCard.jsx
import React from 'react';
import { Card, CardActionArea, Typography, Box, IconButton, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ActivityCard = ({ activity, onDelete }) => {
  const { id, type, duration, caloriesBurned } = activity;

  const activityGradients = {
    RUNNING: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    CYCLING: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    WALKING: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)',
    WEIGHT_TRAINING: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
    YOGA: 'linear-gradient(135deg, #c2e59c 0%, #64b3f4 100%)',
    CARDIO: 'linear-gradient(135deg, #ff5858 0%, #f09819 100%)',
    STRETCHING: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    DEFAULT: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)'
  };

  const activityIcons = {
    RUNNING: <DirectionsRunIcon sx={{ fontSize: '1.8rem' }} />,
    CYCLING: <DirectionsBikeIcon sx={{ fontSize: '1.8rem' }} />,
    WALKING: <DirectionsWalkIcon sx={{ fontSize: '1.8rem' }} />,
    WEIGHT_TRAINING: <FitnessCenterIcon sx={{ fontSize: '1.8rem' }} />,
    YOGA: <SelfImprovementIcon sx={{ fontSize: '1.8rem' }} />,
    CARDIO: <FavoriteIcon sx={{ fontSize: '1.8rem' }} />,
    STRETCHING: <AccessibilityNewIcon sx={{ fontSize: '1.8rem' }} />,
    DEFAULT: <MoreHorizIcon sx={{ fontSize: '1.8rem' }} />
  };

  const formatTitle = (title = '') => 
    title.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());

  const formatNumber = (num) => {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <Card sx={{
      borderRadius: 2,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease-in-out',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      maxWidth: 240,
      margin: '0 auto',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }
    }}>
      {/* Background Gradient */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: activityGradients[type] || activityGradients.DEFAULT,
        opacity: 0.9,
        zIndex: 1
      }} />
      
      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 2, p: 1.5 }}>
        <CardActionArea 
          component={RouterLink} 
          to={`/activities/${id}`}
          sx={{ 
            borderRadius: 1.5,
            p: 1,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.15)',
              transform: 'scale(1.02)'
            }
          }}
        >
          {/* Activity Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: 45,
                height: 45,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(5px)'
              }}>
                {activityIcons[type] || activityIcons.DEFAULT}
              </Box>
              <Typography variant="h6" sx={{ 
                fontWeight: '700', 
                color: 'white',
                fontFamily: "'Montserrat', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '0.85rem'
              }}>
                {formatTitle(type)}
              </Typography>
            </Box>
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
            {/* Duration */}
            <Box sx={{ 
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: 1.5,
              p: 1,
              textAlign: 'center',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <AccessTimeIcon sx={{ color: 'white', mb: 0.25, fontSize: '1.1rem' }} />
              <Typography variant="h6" sx={{ 
                color: 'white', 
                fontWeight: '700',
                fontFamily: "'Montserrat', sans-serif",
                mb: 0.25,
                fontSize: '0.85rem'
              }}>
                {formatNumber(duration || 0)}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.6rem'
              }}>
                MINUTES
              </Typography>
            </Box>

            {/* Calories */}
            <Box sx={{ 
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: 1.5,
              p: 1,
              textAlign: 'center',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <LocalFireDepartmentIcon sx={{ color: '#ff6b6b', mb: 0.25, fontSize: '1.1rem' }} />
              <Typography variant="h6" sx={{ 
                color: 'white', 
                fontWeight: '700',
                fontFamily: "'Montserrat', sans-serif",
                mb: 0.25,
                fontSize: '0.85rem'
              }}>
                {formatNumber(caloriesBurned || 0)}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.6rem'
              }}>
                CALORIES
              </Typography>
            </Box>
          </Box>

          {/* View Details Hint */}
          <Typography variant="caption" sx={{ 
            display: 'block', 
            textAlign: 'center', 
            mt: 1, 
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.55rem'
          }}>
            Click for details
          </Typography>
        </CardActionArea>

        {/* Delete Button */}
        <IconButton
          aria-label="delete activity"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(220, 38, 38, 0.3)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(220, 38, 38, 0.6)',
              transform: 'scale(1.1)'
            },
            width: 28,
            height: 28
          }}
        >
          <DeleteIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ActivityCard;