# Broker Auth Explorer

With the Data Governance Broker's Authentication API, you can build custom user interfaces supporting a wide range of authentication scenarios, from basic username/password logins to multifactor authentication flows requiring time-based one-time passwords.

Use this tool to understand how an authentication UI communicates with the Data Governance Broker's Authentication API by interactively sending requests and responses from a simple web interface. 

## Features

The Auth Explorer replaces your Data Governance Broker's default authentication UI, displaying the raw responses received from the Authentication API in a JSON-aware text editor from which you can modify and send requests.

![Auth Explorer login flow](https://cloud.githubusercontent.com/assets/50972/20689154/81b62a58-b589-11e6-9ae1-a58fc2b392d4.png)

The Auth Explorer understands the Data Governance Broker's built-in identity authenticators and provides you with forms for setting the fields used by the identity authenticators.

![Auth Explorer identity authenticators](https://cloud.githubusercontent.com/assets/50972/20689167/8fcdb3d6-b589-11e6-934b-d7a85d3d8ef4.png)

The Auth Explorer also provides assistance for creating well-formed scope approval requests.

![Auth Explorer scopes](https://cloud.githubusercontent.com/assets/50972/20689184/9a9b6b14-b589-11e6-8e38-28e75bc8c0ac.png)

And more.

## How to use the Auth Explorer

### Configuring the Broker

To use the Auth Explorer, you will need to prepare your copy of the Data Governance Broker by:

* Creating a CORS policy and assigning it to the Authentication and OAuth servlets.
* Creating an OAuth2 Client entry representing the Auth Explorer.
* Configuring the Auth Explorer as the Broker UI in the Broker's Authentication Service configuration.

You can find a copy of this configuration in `setup.dsconfig`. Load this configuration by running `dsconfig`:

```
/path/to/broker/bin/dsconfig --no-prompt --batch-file setup.dsconfig
```

### Running the Broker Auth Explorer

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

### Interacting with the Auth API

An authentication request is initiated when a client aplication makes an OAuth 2 request. If interaction with the end user is required — e.g., to authenticate the user or to approve scopes — then control passes to the Auth UI, which acts as a client to the Auth API. 

An Auth UI interacts with the Auth API by moving between authentication flows, under the direction of the authorization endpoint. For each authentication flow, the Auth UI performs one or more PUT requests to satisfy the flow's authentication chain, then makes a followup request to the authorization endpoint to determine the next authentication flow. 

After the last authentication flow is satisfied, the Auth UI requests a continue redirect URI, which redirects the user's browser back to the client application that initiated the process.

Step by step:

1. A client application makes an OAuth 2 or OpenID Connect request.
2. If the end user needs to log in or approve the scopes requested by the client, the Broker's authorization endpoint redirects the browser to the Auth UI. A `flow` parameter will be appended to this redirect.
3. The Auth UI GETs the URI specified by the `flow` parameter. The response will represent a particular _authentication flow_. Typically, this is the _login flow_, in which the end user must supply a set of credentials, such as a username and password.
4. The Auth UI sets the properties of one or more _identity authenticators_ supported by the flow and submits its request by making a PUT request.
5. If the PUT succeeds and no other identity authenticator must be satisfied, then the Auth UI makes a GET request to the _followup URI_. The followup URI returns a response with the next URI that the Auth UI must retrieve. 
6. The Auth UI performs a GET to retrieve the URI specified in the followup response. If another authentication flow must be satisfied, then the Auth UI returns to step 4. If no other authentication flow must be satisfied, then the response includes a _continue redirect URI_.
7. The Auth UI performs a GET of the continue redirect URI. This redirects the browser to the redirecct URI of the client application from step 1. The client receives either a set of tokens or an error.

The Auth Explorer does its best to guide you to the next step based on the last response received from the Auth API.

## Customizing the Auth Explorer

Some aspects of the Auth Explorer may be customized by modifying `src/Config.js`.

If you wish to add support for a custom identity authenticator, have a look at `src/components/AuthRequester.js` and `src/components/IdentityAuthenticator.js`. In a future refactoring, we may attempt to reduce the number of touchpoints required to support an identity authenticator. In the meantime, please note that you can always use the request editor to manually set your identity authenticator's request fields.

## Known limitations

The Auth Explorer does not currently support authentication through an external identity provider.

## Support and reporting bugs

This tool is not officially supported, but support will be provided on a best-effort basis through GitHub.

Please report issues using the project's [issue tracker](https://github.com/UnboundID/auth-explorer/issues).

## License

This is licensed under the Apache License 2.0.
