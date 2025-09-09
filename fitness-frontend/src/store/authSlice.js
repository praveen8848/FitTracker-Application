import { createSlice } from '@reduxjs/toolkit';
import keycloak from '../authConfig';

// Helper function to decode the JWT token and get user info
const getUserInfoFromToken = (token) => {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT token:', error);
    return null;
  }
};

// The initial state of the authentication slice
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true, // Starts as true
  error: null,
};

// Create the Redux slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = getUserInfoFromToken(action.payload.token);
      state.loading = false; // ← Always set to false
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.loading = false; // ← Always set to false
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.loading = false; // ← Always set to false
      state.error = null;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      state.user = getUserInfoFromToken(action.payload);
    },
  },
});

// Export the generated action creators
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  updateToken,
} = authSlice.actions;

// Thunk function to initialize Keycloak with proper error handling
export const initializeAuth = () => async (dispatch) => {
  dispatch(loginStart());
  
  // Set a timeout to ensure we never get stuck loading
  const timeoutId = setTimeout(() => {
    console.log('Keycloak initialization timeout - forcing completion');
    dispatch(logoutSuccess());
  }, 5000); // 5 second timeout

  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      checkLoginIframe: false,
    });

    clearTimeout(timeoutId); // Clear the timeout if successful

    if (authenticated) {
      dispatch(loginSuccess({ token: keycloak.token }));
      
      // Set up automatic token refresh
      keycloak.onTokenExpired = () => {
        console.log('Token expired. Refreshing...');
        keycloak.updateToken(30).then((refreshed) => {
          if (refreshed) {
            dispatch(updateToken(keycloak.token));
          }
        }).catch((error) => {
          console.error('Failed to refresh token:', error);
          dispatch(logoutSuccess());
          keycloak.logout();
        });
      };
    } else {
      dispatch(logoutSuccess());
    }
  } catch (error) {
    clearTimeout(timeoutId); // Clear the timeout on error
    console.error('Keycloak initialization failed:', error);
    dispatch(logoutSuccess()); // ← CRITICAL: Always end loading state
  }
};

// Thunk to handle user login
export const login = () => async () => {
  try {
    await keycloak.login();
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Thunk to handle user logout
export const logout = () => async () => {
  try {
    await keycloak.logout();
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Thunk to get the current valid token
export const getToken = () => async () => {
  try {
    await keycloak.updateToken(30);
    return keycloak.token;
  } catch (error) {
    console.error('Failed to get token:', error);
    throw error;
  }
};

// Export the reducer function
export default authSlice.reducer;