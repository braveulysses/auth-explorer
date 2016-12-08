// Customize parameters of the OAuth 2 request used to initiate the
// authentication process.
export const OAUTH_CLIENT = {
  // Unique ID for an OAuth2 Client configured with the Broker
  clientId: 'auth-explorer-client',
  // Space-delimited list of OAuth2 Scopes
  scope: 'openid email profile phone address',
  redirectUri: 'http://localhost:3000',
  responseType: 'token id_token',
  prompt: 'login consent',
  acrValues: '',
  maxAge: ''
};

// Data Governance Broker service URLs.
export const BROKER = {
  currentVersion: '6.0.0.1',
  authorizeEndpoint: 'https://example.com/oauth/authorize',
  logoutEndpoint: 'https://example.com/oauth/logout'
};

// List the sub-attributes of any complex attributes used during
// registration here.
export const COMPLEX_ATTRIBUTES = {
  name: [ 'givenName', 'familyName', 'formatted' ]
};

// This is a map of attribute names and values that the Broker will
// set on an account to mark it as verified.
export const ACCOUNT_VERIFY_ATTRIBUTES = {
  accountVerified: true
};

// Used when sending a verification code via email.
export const EMAIL_DELIVERED_CODE_MESSAGES = {
  messageSubject: 'Your one-time password code',
  messageText: 'Your one-time code is: %code%'
};

// Used when sending a verification code via SMS or voice.
export const TELEPHONY_DELIVERED_CODE_MESSAGES = {
  message: 'Your one-time password code is: %code%',
  language: 'en-US'
};
export const TELEPHONY_MESSAGING_PROVIDERS = [
    "Twilio SMS Provider",
    "Twilio Voice Provider"
];

// Request/response editor settings.
export const EDITOR_CONFIG = {
  width: "100%",
  wrapEnabled: false,
  showGutter: true,
  showPrintMargin: false
};