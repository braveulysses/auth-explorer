// Customize parameters of the OAuth 2 request used to initiate the
// authentication process.
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

// Data Governance Broker service URLs.
export const BROKER = {
  authorizeEndpoint: 'https://example.com/oauth/authorize',
  logoutEndpoint: 'https://example.com/oauth/logout'
};

// List the sub-attributes of any complex attributes used during
// registration here.
export const COMPLEX_ATTRIBUTES = {
  name: [ 'givenName', 'familyName', 'formatted' ]
};