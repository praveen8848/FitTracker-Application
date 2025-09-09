import axios from 'axios';
import { store } from '../store/store'; // Import the store to get the current state
import keycloak from '../authConfig'; // Import keycloak as a fallback

// Use environment variable for API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create a configured axios instance
const api = axios.create({
  baseURL: API_URL,
});
// ✅ Add this new function to delete an activity by its ID
export const deleteActivity = (activityId) => {
  const headers = {
    Authorization: `Bearer ${keycloak.token}`,
  };
  // The ID is appended to the URL for a DELETE request
  return axios.delete(`${API_URL}/${activityId}`, { headers });
};

// Add a request interceptor
api.interceptors.request.use(async (config) => {
  // 1. Get the current Redux state to check for the token
  const state = store.getState();
  let token = state.auth.token;

  // 2. If no token in Redux store (e.g., after a page refresh),
  // try to get it directly from the Keycloak instance.
  if (!token && keycloak.token) {
    token = keycloak.token;
  }

  // 3. If we have a token, add it to the request headers
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // 4. We are intentionally REMOVING the manual 'X-User-ID' header.
  // Your backend gateway (KeycloakUserSyncFilter) will extract the user ID
  // from the validated JWT token and forward it to the downstream services.

  return config;
});

// API functions for your activities
export const getActivities = () => api.get('/activities');
export const createActivity = (activity) => api.post('/activities', activity); // ✅ standardized
export const getActivityDetail = (id) => api.get(`/recommendations/activity/${id}`);

// Export the instance itself in case it's needed for other custom requests
export default api;
