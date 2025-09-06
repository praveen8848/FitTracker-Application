import { Box, duration, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'

const ActivityForm = () => {
    const [activity, setActivity] = useState({
        type: "RUNNING", duration: '', caloriesBurned: '',
        additionalMetrices: {}
    });
  return (
    <Box component="form" sx={{mb: 2 }}>
    <FormControl fullWidth sx = {{mb : 2}}>
  <InputLabel >Activity Type</InputLabel>
  <Select
    value={activity.type}
    onChange={() => {setActivity({...activity, type: e.target.value})}}
  >
    <MenuItem value="RUNNINF">Running</MenuItem>
    <MenuItem value="WALIKING">Waliking</MenuItem>
    <MenuItem value="CYCLING">Cycling</MenuItem>
  </Select>
</FormControl>
<TextField fullWidth
label = "Calories Burned"
type='number'
value={activity.caloriesBurned}
onChange={(e) => {setActivity({...activity, duration: e.target.value })}} />
<TextField fullWidth
label = "Calories Burned"
type='number'
value={activity.caloriesBurned}
onChange={(e) => {setActivity({...activity, duration: e.target.value })}} />
    </Box>

  )
}

export default ActivityForm