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

// Flow URNs
export const SCIM_ERROR_URN =
    'urn:ietf:params:scim:api:messages:2.0:Error';
export const AUTHENTICATION_URN =
    'urn:pingidentity:scim:api:messages:2.0:AuthenticationRequest';
export const USERNAME_RECOVERY_URN =
    'urn:pingidentity:scim:api:messages:2.0:AccountFlow:UsernameRecoveryRequest';
export const PASSWORD_RECOVERY_URN =
    'urn:pingidentity:scim:api:messages:2.0:AccountFlow:PasswordRecoveryRequest';
export const ACCOUNT_VERIFY_URN =
    'urn:pingidentity:scim:api:messages:2.0:AccountFlow:VerifyAccountRequest';
export const CONSENT_HANDLER_URN =
    'urn:pingidentity:scim:api:messages:2.0:ConsentApprovalResponse';

// Resource types
export const LOGIN_RESOURCE_TYPE = 'login';
export const SECOND_FACTOR_RESOURCE_TYPE = 'secondFactor';
export const CONSENT_RESOURCE_TYPE = 'approve';
export const USERNAME_RECOVERY_RESOURCE_TYPE = 'Username Recovery';
export const PASSWORD_RECOVERY_RESOURCE_TYPE = 'Password Recovery';
export const VERIFY_ACCOUNT_RESOURCE_TYPE = 'Verify Account';

// Authenticator descriptions.
export const ACCOUNT_LOOKUP_AUTHENTICATOR_DESCRIPTION =
    'The Account Lookup Identity Authenticator may be used to look up an end user account from one or more request parameter values.';
export const EXTERNAL_IDENTITY_AUTHENTICATOR_DESCRIPTION =
    'The External Identity Authenticator may be used to authenticate an end user with an external identity provider. Authentication through an external identity provider is not supported by this tool.';
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
    'The username recovery account handler URL. This is only available if the Username Password identity authenticator is configured.';
export const PASSWORD_RECOVERY_URI_DESCRIPTION =
    'The password recovery account handler URL. This is only available if the Username Password identity authenticator is configured.';
export const FLOW_URI_DESCRIPTION =
    'A URL that leads to a different authentication flow.';
export const CONTINUE_REDIRECT_URI_DESCRIPTION =
    'A redirect URL that will redirect the browser. Typically, this ends the authentication API flow.';

// UI sections
export const URLS_UI_DESCRIPTION =
    'Select one of the URLs below to use with the next authentication API request.';
export const AUTHENTICATORS_UI_DESCRIPTION =
    "An identity authenticator is a scheme for verifying the identity of an end user. At least one identity authenticator must be satisfied to successfully authenticate an end user. Do this by setting an identity authenticator's fields using the controls below and submitting a request using PUT.";
export const ACCOUNT_VERIFY_UI_DESCRIPTION =
    "After an account has been verified, the Broker will write the user's verification status to one or more attributes provided by the auth UI in the accountVerifiedResourceAttributes field.";
export const PASSWORD_RECOVERY_UI_DESCRIPTION =
    "To recover a user's password, a new password must be provided.";
export const SCOPES_UI_DESCRIPTION =
    "A scope represents access to particular user data. The end user may choose to approve or deny an application's access request based on a scope consent prompt presented by the auth UI.";

// Descriptions of authentication flow stages
export const AUTHORIZATION_ERROR_DESCRIPTION =
    "An error was returned by the authorization service.";
export const AUTHENTICATION_ERROR_DESCRIPTION =
    "An error was returned by the authentication service.";
export const OAUTH_STEP_DESCRIPTION =
    "Authentication is initiated by making an OAuth 2 or OpenID Connect request for an access token or ID token. Before the token is returned to the client, the end user will be expected to authenticate and approve the request.";
export const INITIAL_REDIRECT_DESCRIPTION =
    "The authorization endpoint begins the authentication process by passing a login URI to the auth UI via the 'flow' query parameter. The auth UI is expected to GET this URI to obtain its authentication options.";
export const LOGIN_STEP_DESCRIPTION = 
    "The authentication service's login flow presents the auth UI with options for login and account handler flows. The auth UI can either make a login request using PUT, continue the login flow using GET and a followup URI, or invoke an account handler using GET.";
export const SECOND_FACTOR_STEP_DESCRIPTION = 
    "The authentication service's second factor flow presents the auth UI with options for requesting a second authentication factor from the end user. The auth UI can either make a second factor request using PUT or continue the login flow using GET and a followup URI.";
export const CONSENT_STEP_DESCRIPTION = 
    "If the Broker's policies determine that the OAuth 2 request requires user approval, then the auth UI will need to make a PUT request to the consent flow, setting the approved flag to true. To continue, the auth UI should GET the followup URI.";
export const FLOW_URI_STEP_DESCRIPTION =
    "The authorization endpoint presents the auth UI with a flow URI to indicate a transition to a different authentication flow. The auth UI is expected to perform a GET of this URI.";
export const CONTINUE_REDIRECT_URI_STEP_DESCRIPTION =
    "The authorization endpoint presents the auth UI with the continue_redirect_uri to force a redirect of the user's browser. The auth UI is expected to perform a GET of this URI. Typically, this ends the authentication process and returns an OAuth 2 response to the client.";
export const USERNAME_RECOVERY_STEP_DESCRIPTION =
    "The username recovery account flow may be used to look up an end user's username.";
export const PASSWORD_RECOVERY_STEP_DESCRIPTION =
    "The password recovery account flow may be used to reset an end user's password.";
export const VERIFY_ACCOUNT_STEP_DESCRIPTION =
    "The verify account flow is used to confirm that the end user has control over some contact method associated with the account, such as an email address.";

// Hints. These tell the user how to best proceed.
export const INITIAL_REDIRECT_HINT =
    "Perform a GET.";
export const INCOMPLETE_FLOW_HINT =
    "Set the fields of one or more Identity Authenticators and perform a PUT.";
export const SUCCESSFUL_FLOW_HINT =
    "Set the Followup URL as the request URL and perform a GET.";
export const UNSUCCESSFUL_FLOW_HINT =
    "Correct any Identity Authenticator errors and perform a PUT.";
export const CODE_SENT_HINT =
    "Set the verification code and perform a PUT.";
export const FLOW_URI_STEP_HINT =
    "Set the Flow URI as the request URL and perform a GET.";
export const CONTINUE_REDIRECT_URI_STEP_HINT =
    "Set the Continue Redirect URI as the request URL and perform a GET.";
export const REQUEST_TIMED_OUT_HINT = "Make a new OAuth 2 request.";