# Broker Auth Explorer

This is an unfinished work in progress.

## Configuring the Broker

Create a CORS policy.

```
dsconfig create-http-servlet-cross-origin-policy \
  --policy-name "Auth Explorer CORS Policy" \
  --set cors-allowed-methods:GET \
  --set cors-allowed-methods:PUT \
  --set 'cors-allowed-origins:*' \
  --set cors-allowed-headers:Accept \
  --set cors-allowed-headers:Access-Control-Request-Headers \
  --set cors-allowed-headers:Access-Control-Request-Method \
  --set cors-allowed-headers:Authorization \
  --set cors-allowed-headers:Content-Type \
  --set cors-allowed-headers:Cookie \
  --set cors-allowed-headers:Origin \
  --set cors-allowed-headers:X-Requested-With \
  --set cors-allow-credentials:true
```

Assign the CORS policy to the Authentication Servlet.

```
dsconfig set-http-servlet-extension-prop \
  --extension-name "Authentication Servlet" \
  --set "cross-origin-policy:Auth Explorer CORS Policy"
```

Configure the Authentication Service to use the Broker Auth Explorer as the Broker UI.

```
dsconfig set-authentication-service-prop \
  --set broker-ui-url:http://localhost:3000
```

Configure an OAuth 2 Client to use the Broker Auth Explorer as a redirect target. (And modify OAuthRequester.js accordingly.)

```
dsconfig set-oauth2-client-prop \
  --client-name "My Client" \
  --add redirect-url:http://localhost:3000
```

## Running the Broker Auth Explorer

You must have a copy of npm installed.

Install dependencies:

```
npm install
```

To run:

```
npm run start
```
