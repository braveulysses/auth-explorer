# Broker Auth Explorer

Use this tool to understand how an authentication UI communicates with the Data Governance Broker's Authentication API by interactively sending requests and responses from a simple web interface. 

## Configuring the Broker

Create a CORS policy.

```
dsconfig create-http-servlet-cross-origin-policy \
  --policy-name "Auth Explorer CORS Policy" \
  --set "description:This CORS policy allows the Broker's Authentication and OAuth services to receive requests from the Auth Explorer." \
  --set cors-enable-per-application-origins:true \
  --set cors-allowed-methods:GET \
  --set cors-allowed-methods:PUT \
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

Assign the CORS policy to the Authentication Servlet and the OAuth2 Servlet.

```
dsconfig set-http-servlet-extension-prop \
  --extension-name "Authentication Servlet" \
  --set "cross-origin-policy:Auth Explorer CORS Policy"
dsconfig set-http-servlet-extension-prop \
  --extension-name "OAuth2 Servlet" \
  --set "cross-origin-policy:Auth Explorer CORS Policy"
```

Configure the Authentication Service to use the Broker Auth Explorer as the Broker UI.

```
dsconfig set-authentication-service-prop \
  --set broker-ui-url:http://localhost:3000
```

Create an OAuth 2 Client that uses the Auth Explorer as a redirect target.

```
dsconfig create-oauth2-client \
    --client-name "Auth Explorer OAuth2 Client" \
    --set "description:An OAuth 2 Client that can be used to initiate auth requests for the Broker Auth Explorer." \
    --set client-id:auth-explorer-client \
    --set grant-type:authorization-code \
    --set grant-type:implicit \
    --set redirect-url:http://localhost:3000 \
    --set trusted-cors-origin:http://localhost:3000
dsconfig create-permitted-scope \
    --client-name "Auth Explorer OAuth2 Client" \
    --scope-name openid
dsconfig create-permitted-scope \
    --client-name "Auth Explorer OAuth2 Client" \
    --scope-name email
dsconfig create-permitted-scope \
    --client-name "Auth Explorer OAuth2 Client" \
    --scope-name phone \
    --set optional:true      
```

## Running the Broker Auth Explorer

[Install NodeJS and npm](https://docs.npmjs.com/getting-started/installing-node) if they are not already installed.

Clone this repository:

```
git clone https://github.com/UnboundID/auth-explorer.git
```

Install the Auth Explorer's dependencies:

```
cd auth-explorer
npm install
```

Start the Auth Explorer:

```
npm run start
```

This will automatically open the tool in a browser window. By default, it runs from a local HTTP server at `http://localhost:3000`.

## Support and reporting bugs

This tool is not officially supported, but support will be provided on a best-effort basis through GitHub.

Please report issues using the project's [issue tracker](https://github.com/UnboundID/auth-explorer/issues).

## License

This is licensed under the Apache License 2.0.
