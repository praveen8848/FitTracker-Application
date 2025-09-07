import { Box, Button, duration, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { addActivity } from '../services/api';

const ActivityForm = ({onActivityAdded}) => {
    const [activity, setActivity] = useState({
        type: "RUNNING", duration: '', caloriesBurned: '',
        additionalMetrices: {}
    });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await addActivity(activity);

        // Notify parent
        onActivityAdded(activity);

        // Reset form state
        setActivity({
            type: "",
            duration: "",
            caloriesBurned: "",
            metrices: {}
        });
    }
    catch (error) {
        console.error(error);
    }
};


  return (
    <Box component="form" sx={{mb: 2 }} onSubmit={handleSubmit}>
    <FormControl fullWidth sx = {{mb : 2}}>
  <InputLabel >Activity Type</InputLabel>
  <Select
    value={activity.type}
    onChange={(e) => {setActivity({...activity, type: e.target.value})}}
  >
    <MenuItem value="RUNNING">Running</MenuItem>
    <MenuItem value="WALIKING">Waliking</MenuItem>
    <MenuItem value="CYCLING">Cycling</MenuItem>
  </Select>
</FormControl>
<TextField fullWidth
label = "Duration"
type='number'
sx = {{mb:2}}
value={activity.duration}
onChange={(e) => {setActivity({...activity, duration: e.target.value })}} />
<TextField fullWidth
label = "Calories Burned"
type='number'
sx = {{mb:2}}
value={activity.caloriesBurned}
onChange={(e) => {setActivity({...activity, caloriesBurned: e.target.value })}} />

<Button type='submit' variant='contained'>
  ADD ACTIVITY
</Button>
    </Box>

  )
}

export default ActivityForm