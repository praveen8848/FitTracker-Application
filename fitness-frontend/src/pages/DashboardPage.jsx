// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Typography, Button, Grid, Paper, Snackbar, Alert, CircularProgress, Fade,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Card, CardContent, alpha
} from '@mui/material';
import { createActivity, deleteActivity, getActivities } from '../services/api';
import ActivityForm from '../components/ActivityForm';
import ActivityList from '../components/ActivityList';
import { 
  FitnessCenter, 
  DirectionsRun, 
  SelfImprovement, 
  DirectionsBike,
  Add,
  Delete,
  Cancel
} from '@mui/icons-material';

const DashboardPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [stats, setStats] = useState({ totalCalories: 0, totalDuration: 0, activityCount: 0 });
  
  const { user } = useSelector((state) => state.auth || {});

  // Fetch stats for the dashboard
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getActivities();
      const activities = response.data || [];
      
      const sumNum = (acc, val) => acc + (Number(val) || 0);
      const totalCalories = activities.reduce((sum, a) =>
        sumNum(sum, a.caloriesBurned ?? a.calories ?? a.calories_burned), 0);
      const totalDuration = activities.reduce((sum, a) =>
        sumNum(sum, a.duration ?? a.minutes), 0);
      const activityCount = activities.length;

      setStats({ totalCalories, totalDuration, activityCount });
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [refreshKey]);

  const handleAddActivity = async (formData) => {
    try {
      setFormLoading(true);
      const activityDataForApi = {
        type: formData.type,
        duration: Number(formData.duration),
        caloriesBurned: Number(formData.caloriesBurned),
      };
      await createActivity(activityDataForApi);
      showSnackbar('Activity added successfully!', 'success');
      setShowForm(false);
      setRefreshKey(oldKey => oldKey + 1);
    } catch (error) {
      console.error('Failed to add activity:', error);
      showSnackbar(error.response?.data?.message || 'Failed to add activity. Please try again.', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteRequest = (id) => {
    setActivityToDelete(id);
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!activityToDelete) return;
    try {
      await deleteActivity(activityToDelete);
      showSnackbar('Activity deleted successfully!', 'success');
      setRefreshKey(oldKey => oldKey + 1);
    } catch (error) {
      console.error('Failed to delete activity:', error);
      showSnackbar('Failed to delete activity. Please try again.', 'error');
    } finally {
      setDialogOpen(false);
      setActivityToDelete(null);
    }
  };
  
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      minHeight: '100vh', 
      pt: '100px',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
    }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header Section */}
        <Paper elevation={6} sx={{ 
          p: { xs: 3, md: 4 }, 
          mb: 4, 
          borderRadius: 3, 
          background: 'linear-gradient(135deg, #061627 0%, #0b3b6b 100%)',
          position: 'relative', 
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Box sx={{ 
            position: 'absolute', 
            top: -20, 
            right: -20, 
            opacity: 0.1, 
            zIndex: 0 
          }}>
            <FitnessCenter sx={{ fontSize: 150 }} />
          </Box>
          
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 800, 
              fontSize: { xs: '2.2rem', md: '2.8rem' },
              color: 'white',
              mb: 1,
              fontFamily: "'Montserrat', sans-serif"
            }}>
              Welcome back, {user?.preferred_username || 'Fitness Enthusiast'}! 👋
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              Track your progress and get AI-powered recommendations
            </Typography>
          </Box>
        </Paper>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
          {[
            { 
              icon: <DirectionsRun sx={{ color: 'white', fontSize: 30 }} />, 
              label: 'Activities', 
              value: stats.activityCount, 
              subtitle: '', 
              gradient: 'linear-gradient(135deg, #06b6d4 0%, #3dd0ff 100%)' 
            },
            { 
              icon: <SelfImprovement sx={{ color: 'white', fontSize: 30 }} />, 
              label: 'Minutes', 
              value: stats.totalDuration, 
              subtitle: 'min', 
              gradient: 'linear-gradient(135deg, #ff7a7a 0%, #ffb199 100%)' 
            },
            { 
              icon: <DirectionsBike sx={{ color: 'white', fontSize: 30 }} />, 
              label: 'Calories', 
              value: stats.totalCalories, 
              subtitle: 'cal', 
              gradient: 'linear-gradient(135deg, #8bd1ff 0%, #7ac7ff 100%)' 
            }
          ].map((s, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card elevation={6} sx={{
                borderRadius: 3, 
                color: 'white', 
                height: '100%', 
                overflow: 'hidden',
                background: s.gradient,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)'
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{ fontSize: 30, mb: 2 }}>{s.icon}</Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                    {s.value}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    {s.label} {s.subtitle && <span style={{fontWeight:600}}>• {s.subtitle}</span>}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add Activity Section */}
        <Paper elevation={4} sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 3, 
          background: 'rgba(14, 32, 56, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(135, 184, 255, 0.2)'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: 2, 
            mb: showForm ? 3 : 0 
          }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 800, 
              color: 'white',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              Your Activities
            </Typography>
            <Button
              variant="contained"
              onClick={() => setShowForm(prev => !prev)}
              disabled={formLoading}
              startIcon={showForm ? <Cancel /> : <Add />}
              sx={{
                background: 'linear-gradient(135deg, #00e5ff 0%, #00b8d4 100%)',
                color: 'white',
                borderRadius: '25px',
                px: 3,
                py: 1.5,
                fontWeight: 700,
                fontFamily: "'Montserrat', sans-serif",
                '&:hover': {
                  background: 'linear-gradient(135deg, #00b8d4 0%, #0099b8 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(0, 229, 255, 0.4)'
                },
                '&:disabled': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.5)'
                }
              }}
            >
              {showForm ? 'Cancel' : 'Add New Activity'}
            </Button>
          </Box>

          <Fade in={showForm} unmountOnExit>
            <Box sx={{ mt: 3, maxWidth: '800px', mx: 'auto' }}>
              <ActivityForm 
                onSubmit={handleAddActivity} 
                onCancel={() => setShowForm(false)} 
                loading={formLoading} 
              />
            </Box>
          </Fade>
        </Paper>

        {/* Recent Activities Section */}
        <Paper elevation={4} sx={{ 
          p: 3, 
          borderRadius: 3, 
          background: 'rgba(14, 32, 56, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(135, 184, 255, 0.2)'
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 800, 
            mb: 3, 
            color: 'white',
            fontFamily: "'Montserrat', sans-serif"
          }}>
            Recent Activities
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress sx={{ color: 'primary.main' }} />
            </Box>
          ) : (
            <ActivityList onDelete={handleDeleteRequest} refreshKey={refreshKey} />
          )}
        </Paper>

        {/* Snackbar */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity} 
            sx={{ 
              width: '100%',
              fontFamily: "'Montserrat', sans-serif"
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: "'Montserrat', sans-serif" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Are you sure you want to permanently delete this activity? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDialogOpen(false)} 
            color="secondary"
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error" 
            startIcon={<Delete />}
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;