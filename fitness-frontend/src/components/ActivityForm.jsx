// src/components/ActivityForm.jsx
import React, { useState } from 'react';
import {
  Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography,
  Paper, Stack, CircularProgress
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';

// ✅ New, easy-to-manage list of activity options
const activityOptions = [
  { value: 'RUNNING', label: 'Running' },
  { value: 'WALKING', label: 'Walking' },
  { value: 'CYCLING', label: 'Cycling' },
  { value: 'WEIGHT_TRAINING', label: 'Weight Training' },
  { value: 'YOGA', label: 'Yoga' },
  { value: 'CARDIO', label: 'Cardio' },
  { value: 'STRETCHING', label: 'Stretching' },
  { value: 'OTHER', label: 'Other' },
];

const ActivityForm = ({ onSubmit, onCancel, loading }) => {
  const [activity, setActivity] = useState({
    type: 'RUNNING', // Default to RUNNING
    duration: '',
    caloriesBurned: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'duration' || name === 'caloriesBurned') {
      if (value === '' || /^\d+$/.test(value)) {
        setActivity((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setActivity((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(activity);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 4 },
        borderRadius: 4,
        backgroundColor: "rgba(14, 32, 56, 0.7)",
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(135, 184, 255, 0.2)'
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1.5} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
          <EditNoteIcon color="primary" />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Log a New Activity
          </Typography>
        </Stack>

        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel>Activity Type</InputLabel>
            <Select 
              name="type" 
              value={activity.type} 
              label="Activity Type" 
              onChange={handleChange}
              sx={{ '& .MuiSelect-select': { backgroundColor: 'rgba(0,0,0,0.1)' } }}
            >
              {/* ✅ Dropdown options are now generated from the list above */}
              {activityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField name="duration" fullWidth required label="Duration (minutes)" type="number" value={activity.duration} onChange={handleChange} />
          <TextField name="caloriesBurned" fullWidth required label="Calories Burned (kcal)" type="number" value={activity.caloriesBurned} onChange={handleChange} />
          
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 2 }}>
            <Button onClick={onCancel} disabled={loading} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={loading} 
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddCircleOutlineIcon />}
              sx={{
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(135deg, #06b6d4 0%, #3dd0ff 100%)',
                border: 'none',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0px 4px 20px rgba(6, 182, 212, 0.4)',
                }
              }}
            >
              {loading ? 'Adding...' : 'Add Activity'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ActivityForm;