export const OAUTH_CLIENT = {
  // Unique ID for an OAuth2 Client configured with the Broker
  clientId: 'auth-explorer-client',
  // Space-delimited list of OAuth2 Scopes
  scope: 'openid email phone',
  redirectUri: 'http://localhost:3000',
  responseType: 'token id_token',
  prompt: 'login consent',
  acrValues: '',
  maxAge: ''
};

export const BROKER = {
  authorizeEndpoint: 'https://example.com/oauth/authorize',
  logoutEndpoint: 'https://example.com/oauth/logout'
};