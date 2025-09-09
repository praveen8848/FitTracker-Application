// src/components/ActivityList.jsx
import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { getActivities } from '../services/api';
import ActivityCard from './ActivityCard'; // ✅ Using the new professional card

// ✅ The component now accepts an 'onDelete' function and a 'refreshKey'
const ActivityList = ({ onDelete, refreshKey }) => {
  const [activities, setActivities] = useState([]);
  
  // Your original data fetching logic is preserved
  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ This useEffect will now re-run whenever 'refreshKey' changes,
  // ensuring the list updates when activities are added or deleted.
  useEffect(() => {
    fetchActivities();
  }, [refreshKey]);

  if (activities.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography color="text.secondary">
          No activities logged yet. Add one to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {activities.map((activity) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={activity.id}>
          {/* ✅ The old Card component is replaced with the new ActivityCard */}
          {/* It receives the activity data and the onDelete function */}
          <ActivityCard activity={activity} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActivityList;