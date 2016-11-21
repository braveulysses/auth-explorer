// Authenticator URNs
export const USERNAME_PASSWORD_AUTHENTICATOR_URN =
    'urn:pingidentity:scim:api:messages:2.0:UsernamePasswordAuthenticationRequest';
export const TOTP_AUTHENTICATOR_URN =
    'urn:pingidentity:scim:api:messages:2.0:TOTPAuthenticationRequest';
export const EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN =
    'urn:pingidentity:scim:api:messages:2.0:EmailDeliveredCodeAuthenticationRequest';
export const TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN =
    'urn:pingidentity:scim:api:messages:2.0:TelephonyDeliveredCodeAuthenticationRequest';
export const ACCOUNT_LOOKUP_AUTHENTICATOR_URN =
    'urn:pingidentity:scim:api:messages:2.0:AccountLookupRequest';
export const EXTERNAL_IDENTITY_AUTHENTICATOR_URN =
    'urn:pingidentity:scim:api:messages:2.0:ExternalIdentityAuthenticationRequest';
export const RECAPTCHA_AUTHENTICATOR_URN =
    'urn:pingidentity:scim:api:messages:2.0:RecaptchaAuthenticationRequest';
export const REGISTRATION_AUTHENTICATOR_URN =
    'urn:pingidentity:scim:api:messages:2.0:RegistrationAuthenticationRequest';
export const CONSENT_HANDLER_URN =
    'urn:pingidentity:scim:api:messages:2.0:ConsentApprovalResponse';

// Authenticator descriptions.
export const ACCOUNT_LOOKUP_AUTHENTICATOR_DESCRIPTION =
    'The Account Lookup Identity Authenticator may be used to look up an end user account from one or more request parameter values.';
export const EXTERNAL_IDENTITY_AUTHENTICATOR_DESCRIPTION =
    'The External Identity Authenticator may be used to authenticate an end user with an external identity provider.';
export const RECAPTCHA_AUTHENTICATOR_DESCRIPTION =
    "The reCAPTCHA Identity Authenticator may be used to verify a user's response to a Google reCAPTCHA challenge.";
export const REGISTRATION_AUTHENTICATOR_DESCRIPTION =
    'The Registration Identity Authenticator may be used to create and authenticate a new account from data entered by the end user.';
export const TOTP_AUTHENTICATOR_DESCRIPTION =
    'The TOTP Identity Authenticator may be used to authenticate an end user with a time-based one-time password based on RFC 6238 by using the UnboundID Validate TOTP Password Extended LDAP operation.';
export const EMAIL_DELIVERED_CODE_AUTHENTICATOR_DESCRIPTION =
    "The Email Delivered Code Identity Authenticator may be used to deliver a verification code to an email address stored in a specified attribute from a user's SCIM resource and then verify the code subsequently entered by the user.";
export const TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_DESCRIPTION =
    "The Telephony Delivered Code Identity Authenticator may be used to deliver a verification code to a telephone number (e.g. by SMS or voice message) stored in a specified attribute of a user's SCIM resource, and then verify the code subsequently entered by the user.";
export const USERNAME_PASSWORD_AUTHENTICATOR_DESCRIPTION =
    'The Username Password Identity Authenticator may be used to authenticate an end user with a username and password using an LDAP BIND operation.';
export const THIRD_PARTY_AUTHENTICATOR_DESCRIPTION =
    'This is an unrecognized third-party identity authenticator';

// URI descriptions
export const META_LOCATION_URI_DESCRIPTION =
    'The current Auth API resource URL.';
export const FOLLOWUP_URI_DESCRIPTION =
    'A URL that will continue the authentication API flow.';
export const USERNAME_RECOVERY_URI_DESCRIPTION =
    'The username recovery account handler URL. This is only available if the Username Password identity authenticator is used.';
export const PASSWORD_RECOVERY_URI_DESCRIPTION =
    'The password recovery account handler URL. This is only available if the Username Password identity authenticator is used.';
export const FLOW_URI_DESCRIPTION =
    'A URL that leads to a different authentication flow.';
export const CONTINUE_REDIRECT_URI_DESCRIPTION =
    'A redirect URL that will redirect the client. Typically, this ends the authentication API flow.';

// UI sections
export const URLS_UI_DESCRIPTION =
    'Choose one of the URLs below to modify the authentication API request.';
export const AUTHENTICATORS_UI_DESCRIPTION =
    'An identity authenticator is a scheme for verifying the identity of an end user. At least one identity authenticator must be satisfied to successfully authenticate an end user.';
export const SCOPES_UI_DESCRIPTION =
    "A scope represents access to particular user data. The end user may choose to approve or deny an application's access request based on a scope consent prompt presented by the auth UI.";

// Descriptions of authentication flow stages
export const OAUTH_STEP_DESCRIPTION =
    "Authentication is initiated by making an OAuth 2 or OpenID Connect request for an access token or ID token. Before the token is returned to the client, the end user will be expected to authenticate and approve the request.";
export const INITIAL_REDIRECT_DESCRIPTION =
    "The authorization endpoint begins a new authentication flow by passing a login URI to the auth UI via the flow parameter. The auth UI is expected to GET this URI to obtain its authentication options.";
export const LOGIN_STEP_DESCRIPTION = 
    "The authentication service's login endpoint presents the auth UI with options for login and account handler flows. The auth UI can either make a second factor request using PUT, continue the login flow using GET and a followup URI, or invoke an account handler using GET.";
export const SECOND_FACTOR_STEP_DESCRIPTION = 
    "The authentication service's second factor endpoint presents the auth UI with options for requesting a second authentication factor from the end user. The auth UI can either make a login request using PUT or continue the login flow using GET and a followup URI.";
export const CONSENT_STEP_DESCRIPTION = 
    "If the Broker's policies determine that the OAuth 2 request requires user approval, then the auth UI will need to make a PUT request to the consent endpoint, setting the approved flag to true. To continue, the auth UI should GET the followup URI.";
export const FLOW_URI_STEP_DESCRIPTION =
    "The authorization endpoint presents the auth UI with a flow URI to indicate a transition to a different authentication flow. The auth UI is expected to perform a GET of this URI.";
export const CONTINUE_REDIRECT_URI_STEP_DESCRIPTION =
    "The authorization endpoint presents the auth UI with the continue_redirect_uri to force a redirect of the user's browser. The auth UI is expected to perform a GET of this URI. Typically, this ends the authentication process and returns an OAuth 2 response to the client.";
export const USERNAME_RECOVERY_STEP_DESCRIPTION =
    "The username recovery account flow may be used to look up an end user's username.";
export const PASSWORD_RECOVERY_STEP_DESCRIPTION =
    "The password recovery account flow may be used to reset an end user's password.";