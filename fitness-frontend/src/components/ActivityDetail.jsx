import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getActivityDetail } from '../services/api';

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return <Typography>Loading..</Typography>;
  }

  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: 'auto' }}>
      {/* Activity Details Card */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Activity Detail
          </Typography>
          <Typography>Type: {activity.type}</Typography>
          <Typography>
            Duration: {activity.duration || activity.durationMinutes || 'N/A'} minutes
          </Typography>
          <Typography>
            Calories Burned: {activity.caloriesBurned || activity.calories || 'N/A'}
          </Typography>
          <Typography>Date: {new Date(activity.createdAt).toLocaleString()}</Typography>
        </CardContent>
      </Card>

      {/* AI Recommendation Card */}
      {recommendation && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              AI Recommendation
            </Typography>

            {/* Analysis Section */}
            <Typography variant="h6">Analysis</Typography>
            <Typography paragraph>{recommendation.analysis || recommendation}</Typography>

            <Divider sx={{ my: 2 }} />

            {/* Suggestions Section */}
            <Typography variant="h6">Suggestions</Typography>
            {activity?.suggestions?.map((suggestion, index) => (
              <Typography key={index} paragraph>
                • {suggestion}
              </Typography>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* Safety Section */}
            <Typography variant="h6">Safety Guidelines</Typography>
            {activity?.safety?.map((safety, index) => (
              <Typography key={index} paragraph>
                • {safety}
              </Typography>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* Improvements Section */}
            {activity?.improvements?.length > 0 && (
              <>
                <Typography variant="h6">Improvements</Typography>
                {activity.improvements.map((improvement, index) => (
                  <Typography key={index} paragraph>
                    • {improvement}
                  </Typography>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ActivityDetail;
