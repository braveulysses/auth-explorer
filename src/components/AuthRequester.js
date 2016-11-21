import React, {Component} from 'react';
import 'whatwg-fetch';
import AceEditor from 'react-ace';
import { Dimmer, Loader, Button, Input, Form, Container, Divider } from 'semantic-ui-react';
import AuthUrlList from './AuthUrlList';
import IdentityAuthenticatorList from './IdentityAuthenticatorList';
import ScopeList from './ScopeList';
import './AuthRequest.css';

import 'brace/mode/json';
import 'brace/theme/github';

class AuthRequester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      body: '',
      loading: false,
      authUrls: [],
      authenticators: [],
      scopes: [],
      approved: false
    };
    this.setAuthUrl = this.setAuthUrl.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.setBodyFromObject = this.setBodyFromObject.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.parseBody = this.parseBody.bind(this);
    this.doGet = this.doGet.bind(this);
    this.doPut = this.doPut.bind(this);
    this.removeIdentityAuthenticator = this.removeIdentityAuthenticator.bind(this);
    this.setUsernamePassword = this.setUsernamePassword.bind(this);
    this.setTotp = this.setTotp.bind(this);
    this.setScopesApproved = this.setScopesApproved.bind(this);
    this.setOptionalScope = this.setOptionalScope.bind(this);
  }

  setAuthUrl(url) {
    this.setState({ url: url });
    this.props.setDispatcherUrl(url);
  }

  // This is called when the user updates the URL directly.
  updateUrl(event) {
    this.setAuthUrl(event.target.value);
  }

  setBodyFromObject(body) {
    const json = JSON.stringify(body, null, 2);
    this.setState({ body: json });
    this.parseBody(json);
  }

  // This is called when the user updates the request body directly
  // using the ACE editor.
  updateBody(body) {
    this.setState({ body: body });
    try {
      this.parseBody(body);
    } catch (e) {
      // Do nothing, because the body might fail to parse while the
      // user is making edits.
    }
  }

  static extractUrls(body) {
    let urls = [];
    if (body['meta']) {
      if (body['meta']['location']) {
        urls.push({
          url: body['meta']['location'],
          name: 'meta.location',
          description: 'The current Auth API resource URL.'
        });
      }
    }
    if (body['followUp']) {
      if (body['followUp']['$ref']) {
        urls.push({
          url: body['followUp']['$ref'],
          name: 'Followup',
          description: 'The URL that will continue the authentication API flow.'
        });
      }
    }
    const urn = 'urn:pingidentity:scim:api:messages:2.0:UsernamePasswordAuthenticationRequest';
    if (body[urn]) {
      if (body[urn]['usernameRecovery']['$ref']) {
        urls.push({
          url: body[urn]['usernameRecovery']['$ref'],
          name: 'Username Recovery',
          description: 'The username recovery account handler URL.'
        });
      }
      if (body[urn]['passwordRecovery']['$ref']) {
        urls.push({
          url: body[urn]['passwordRecovery']['$ref'],
          name: 'Password Recovery',
          description: 'The password recovery account handler URL.'
        });
      }
    }
    if (body['flow_uri']) {
      urls.push({
        url: body['flow_uri'],
        name: 'Flow URI',
        description: 'A URL that leads to a different flow.'
      });
    }
    if (body['continue_redirect_uri']) {
      urls.push({
        url: body['continue_redirect_uri'],
        name: 'Continue Redirect URI',
        description: 'A redirect URL that will end the authentication API flow.'
      });
    }
    return urls;
  }

  parseBody(json) {
    if (json) {
      let body = JSON.parse(json);

      // Common fields
      const meta = body.meta;
      const followUp = body.followUp;
      let continueRedirectUri = '';
      if (body['continue_redirect_uri']) {
        continueRedirectUri = body['continue_redirect_uri'];
      }

      // Login fields
      const authenticators = Object.keys(body).filter(key => {
        return key.startsWith('urn');
      });
      const client = body.client;
      let username = '';
      let formattedName = '';
      if (body['sessionIdentityResource']) {
        username = body['sessionIdentityResource']['userName'];
        formattedName = body['sessionIdentityResource']['name.formatted'];
      }
      let authUrls = AuthRequester.extractUrls(body);

      // Consent fields
      let scopes = [];
      let approved = false;
      const consentUrn = 'urn:pingidentity:scim:api:messages:2.0:ConsentApprovalResponse';
      if (body['schemas'] && body['schemas'].includes(consentUrn)) {
        this.props.setActiveStep('Consent');
        scopes = body['scopes'];
        approved = body['approved'];
      }

      this.setState({
        meta: meta,
        followUp: followUp,
        authenticators: authenticators,
        username: username,
        formattedName: formattedName,
        client: client,
        continueRedirectUri: continueRedirectUri,
        authUrls: authUrls,
        scopes: scopes,
        approved: approved
      });
    }
  }

  removeIdentityAuthenticator(urn) {
    let body = JSON.parse(this.state.body);
    delete body[urn];
    this.setBodyFromObject(body);
  }

  setUsernamePassword(username, password) {
    let body = JSON.parse(this.state.body);
    const urn = 'urn:pingidentity:scim:api:messages:2.0:UsernamePasswordAuthenticationRequest';
    if (body[urn]) {
      body[urn]['username'] = username;
      body[urn]['password'] = password;
      this.setBodyFromObject(body);
    }
  }

  setTotp(password) {
    let body = JSON.parse(this.state.body);
    const urn = 'urn:pingidentity:scim:api:messages:2.0:TOTPAuthenticationRequest';
    if (body[urn]) {
      body[urn]['password'] = password;
      this.setBodyFromObject(body);
    }
  }

  setScopesApproved(approved) {
    let body = JSON.parse(this.state.body);
    body['approved'] = approved;
    this.setBodyFromObject(body);
  }

  setOptionalScope(optionalScopeName, approve) {
    let body = JSON.parse(this.state.body);
    const optionalScopes = body['optionalScopes'] || [];
    let optionalScopesSet = new Set(optionalScopes);
    if (approve) {
      optionalScopesSet.add(optionalScopeName);
    } else {
      optionalScopesSet.delete(optionalScopeName);
    }
    if (optionalScopesSet.size > 0) {
      body['optionalScopes'] = [...optionalScopesSet];
    } else {
      delete body['optionalScopes'];
    }
    this.setBodyFromObject(body);
  }

  static doSubmit(event) {
    event.preventDefault();
  }

  doGet() {
    console.log("GET");
    this.setState({ loading: true });
    // Don't use fetch if we're doing a GET on the continue_redirect_uri.
    if (this.state.continueRedirectUri && this.state.url === this.state.continueRedirectUri) {
      console.log("requesting continue_redirect_uri; redirecting");
      window.location = this.state.continueRedirectUri;
      return;
    }
    fetch(this.state.url, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        this.setState({ loading: false });
        return response.json();
      }).then(json => {
        this.setBodyFromObject(json);
      }).catch(ex => {
        this.setState({ loading: false });
        console.warn('parsing failed', ex)
      });
  }

  doPut() {
    console.log("PUT");
    this.setState({ loading: true });
    fetch(this.state.url, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: this.state.body
      }).then(response => {
        this.setState({ loading: false });
        return response.json();
      }).then(json => {
        this.setBodyFromObject(json);
      }).catch(ex => {
        this.setState({ loading: false });
        console.warn('parsing failed', ex)
      });
  }

  render() {
    const { active } = this.state.loading;
    const bodyIsPresent = !!this.state.body;
    const authenticatorData = {
      username: this.state.username
    };
    return (
        <div>
          <Container className="AuthRequest">
            <Dimmer.Dimmable dimmed={active}>
              <Dimmer active={active}/>
              <Loader active={active}/>
              <Form onSubmit={AuthRequester.doSubmit}>
                <Form.Group inline>
                  <Form.Field width="sixteen">
                    <label>URL</label>
                    <Input
                        type="text"
                        name="url"
                        className="Url"
                        onChange={this.updateUrl}
                        value={this.state.url}
                    />
                  </Form.Field>
                </Form.Group>
                { bodyIsPresent &&
                  <Form.Group>
                    <Form.Field width="sixteen">
                      <AceEditor
                          mode="json"
                          theme="github"
                          showPrintMargin={false}
                          onChange={this.updateBody}
                          value={this.state.body}
                          name="AuthExplorerEditor"
                          width="100%"
                      />
                    </Form.Field>
                  </Form.Group>
                }
                <Form.Group inline>
                  <Form.Field>
                    <Button primary onClick={this.doGet}>GET</Button>
                  </Form.Field>
                  {bodyIsPresent &&
                    <Form.Field>
                      <Button secondary onClick={this.doPut}>PUT</Button>
                    </Form.Field>
                  }
                </Form.Group>
              </Form>
            </Dimmer.Dimmable>
          </Container>
          <Divider section/>
          <ScopeList
              scopes={this.state.scopes}
              approved={this.state.approved}
              setScopesApproved={this.setScopesApproved}
              setOptionalScope={this.setOptionalScope}
          />
          <IdentityAuthenticatorList
              authenticators={this.state.authenticators}
              removeAuthenticator={this.removeIdentityAuthenticator}
              data={authenticatorData}
              setUsernamePassword={this.setUsernamePassword}
              setTotp={this.setTotp}
          />
          <AuthUrlList
              authUrls={this.state.authUrls}
              setAuthUrl={this.setAuthUrl}
          />
        </div>
    );
  }
}

export default AuthRequester;
