import Keycloak from 'keycloak-js';

// Log environment variables to ensure they are loaded (Check browser console)
console.log('Keycloak URL:', import.meta.env.VITE_KEYCLOAK_URL);
console.log('Realm:', import.meta.env.VITE_KEYCLOAK_REALM);

// Initialize Keycloak with config from environment variables
const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

// Configuration for initializing Keycloak
export const keycloakConfig = {
  onLoad: 'check-sso', // Silently check authentication status on app load
  pkceMethod: 'S256',  // Use PKCE for secure authentication
  checkLoginIframe: false // Simplifies setup
};

export default keycloak;