import React, {Component} from 'react';
import 'whatwg-fetch';
import AceEditor from 'react-ace';
import { Dimmer, Loader, Button, Input, Form, Container, Divider } from 'semantic-ui-react';
import Description from './Description';
import Hint from './Hint';
import AuthUrlList from './AuthUrlList';
import FlowHeader from './FlowHeader';
import IdentityAuthenticatorList from './IdentityAuthenticatorList';
import AccountVerifyForm from './AccountVerifyForm';
import PasswordRecoveryForm from './PasswordRecoveryForm';
import ScopeList from './ScopeList';
import './AuthRequester.css';

import 'brace/mode/json';
import 'brace/theme/github';

import * as Config from "../Config";
import * as Constants from '../Constants';

class AuthRequester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      body: '',
      flowSuccess: false,
      currentFlow: '',
      resourceType: '',
      loading: false,
      authUrls: [],
      authenticators: [],
      scopes: [],
      approved: false,
      description: Constants.INITIAL_REDIRECT_DESCRIPTION,
      hint: Constants.INITIAL_REDIRECT_HINT
    };
    this.setAuthUrl = this.setAuthUrl.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.setBodyFromObject = this.setBodyFromObject.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.parseBody = this.parseBody.bind(this);
    this.doGet = this.doGet.bind(this);
    this.doPut = this.doPut.bind(this);
    this.removeIdentityAuthenticator = this.removeIdentityAuthenticator.bind(this);
    this.getAuthenticatorProps = this.getAuthenticatorProps.bind(this);
    this.setUsernamePassword = this.setUsernamePassword.bind(this);
    this.setNewPassword = this.setNewPassword.bind(this);
    this.setTotp = this.setTotp.bind(this);
    this.setSendEmailRequest = this.setSendEmailRequest.bind(this);
    this.setEmailVerifyCode = this.setEmailVerifyCode.bind(this);
    this.setSendTelephonyRequest = this.setSendTelephonyRequest.bind(this);
    this.setTelephonyVerifyCode = this.setTelephonyVerifyCode.bind(this);
    this.setLookupParameters = this.setLookupParameters.bind(this);
    this.setRecaptchaResponse = this.setRecaptchaResponse.bind(this);
    this.register = this.register.bind(this);
    this.setAccountVerifyAttributes = this.setAccountVerifyAttributes.bind(this);
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
          description: Constants.META_LOCATION_URI_DESCRIPTION
        });
      }
    }
    if (body['followUp']) {
      if (body['followUp']['$ref']) {
        urls.push({
          url: body['followUp']['$ref'],
          name: 'Followup',
          description: Constants.FOLLOWUP_URI_DESCRIPTION
        });
      }
    }
    const urn = Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN;
    if (body[urn]) {
      if (body[urn]['usernameRecovery'] &&
          body[urn]['usernameRecovery']['$ref']) {
        urls.push({
          url: body[urn]['usernameRecovery']['$ref'],
          name: 'Username Recovery',
          description: Constants.USERNAME_RECOVERY_URI_DESCRIPTION
        });
      }
      if (body[urn]['passwordRecovery'] &&
          body[urn]['passwordRecovery']['$ref']) {
        urls.push({
          url: body[urn]['passwordRecovery']['$ref'],
          name: 'Password Recovery',
          description: Constants.PASSWORD_RECOVERY_URI_DESCRIPTION
        });
      }
    }
    if (body['flow_uri']) {
      urls.push({
        url: body['flow_uri'],
        name: 'Flow URI',
        description: Constants.FLOW_URI_DESCRIPTION
      });
    }
    if (body['continue_redirect_uri']) {
      urls.push({
        url: body['continue_redirect_uri'],
        name: 'Continue Redirect URI',
        description: Constants.CONTINUE_REDIRECT_URI_DESCRIPTION
      });
    }
    return urls;
  }

  parseBody(json) {
    let requestUrl = this.state.url;
    let currentFlow = '';
    let description = '';
    let hint = '';
    if (json) {
      let body = JSON.parse(json);

      // Common fields
      const schemas = body['schemas'];
      const meta = body['meta'];
      const followUp = body['followUp'];
      let continueRedirectUri = '';
      if (body['continue_redirect_uri']) {
        continueRedirectUri = body['continue_redirect_uri'];
      }

      // Set the current step and description
      let resourceType = '';
      if (meta) {
        resourceType = meta['resourceType'];
        switch(resourceType) {
          case Constants.SECOND_FACTOR_RESOURCE_TYPE:
            currentFlow = 'Second factor flow';
            description = Constants.SECOND_FACTOR_STEP_DESCRIPTION;
            this.props.setActiveStep('Second factor');
            break;
          case Constants.CONSENT_RESOURCE_TYPE:
            currentFlow = 'Consent flow';
            description = Constants.CONSENT_STEP_DESCRIPTION;
            this.props.setActiveStep('Consent');
            break;
          case Constants.USERNAME_RECOVERY_RESOURCE_TYPE:
            currentFlow = 'Username recovery flow';
            description = Constants.USERNAME_RECOVERY_STEP_DESCRIPTION;
            this.props.setActiveStep('Account flow');
            break;
          case Constants.PASSWORD_RECOVERY_RESOURCE_TYPE:
            currentFlow = 'Password recovery flow';
            description = Constants.PASSWORD_RECOVERY_STEP_DESCRIPTION;
            this.props.setActiveStep('Account flow');
            break;
          case Constants.VERIFY_ACCOUNT_RESOURCE_TYPE:
            currentFlow = 'Verify account flow';
            description = Constants.VERIFY_ACCOUNT_STEP_DESCRIPTION;
            this.props.setActiveStep('Account flow');
            break;
          case Constants.LOGIN_RESOURCE_TYPE:
            currentFlow = 'Login flow';
            // Fall through to default
          default:
            description = Constants.LOGIN_STEP_DESCRIPTION;
            this.props.setActiveStep('Log in');
        }
        // Set the current URL — this ensures that a PUT results in
        // an updated request URL
        requestUrl = meta['location'];
      }
      // Special cases for OAuth servlet responses
      if (body['flow_uri']) {
        description = Constants.FLOW_URI_STEP_DESCRIPTION;
        hint = Constants.FLOW_URI_STEP_HINT;
      }
      if (body['continue_redirect_uri']) {
        description = Constants.CONTINUE_REDIRECT_URI_STEP_DESCRIPTION;
        hint = Constants.CONTINUE_REDIRECT_URI_STEP_HINT;
      }
      // Errors
      if (body['error']) {
        description = Constants.AUTHORIZATION_ERROR_DESCRIPTION;
      }
      if (schemas && schemas.includes(Constants.SCIM_ERROR_URN)) {
        description = Constants.AUTHENTICATION_ERROR_DESCRIPTION;
        if (body['detail'].includes('timed out')) {
          hint = Constants.REQUEST_TIMED_OUT_HINT;
        }
      }

      // Login and 2FA fields
      const authenticatorUrns = Object.keys(body).filter(key => {
        return key.startsWith('urn:');
      });
      let authenticators = [];
      authenticatorUrns.forEach(urn => {
        let authenticator = body[urn];
        authenticator['urn'] = urn;
        authenticators.push(authenticator);
      });
      const client = body.client;
      let username = '';
      let formattedName = '';
      if (body['sessionIdentityResource']) {
        username = body['sessionIdentityResource']['userName'];
        formattedName = body['sessionIdentityResource']['name.formatted'];
      }
      let lookupParameters = [];
      if (body[Constants.ACCOUNT_LOOKUP_AUTHENTICATOR_URN]) {
        lookupParameters =
            body[Constants.ACCOUNT_LOOKUP_AUTHENTICATOR_URN]['lookupParameters'];
      }
      let recaptchaKey = '';
      if (body[Constants.RECAPTCHA_AUTHENTICATOR_URN]) {
        recaptchaKey =
            body[Constants.RECAPTCHA_AUTHENTICATOR_URN]['recaptchaKey'];
      }
      let registrableAttributes = [];
      if (body[Constants.REGISTRATION_AUTHENTICATOR_URN]) {
        registrableAttributes =
            body[Constants.REGISTRATION_AUTHENTICATOR_URN]['registrableAttributes'];
      }
      let authUrls = AuthRequester.extractUrls(body);

      // Consent fields
      let scopes = [];
      let approved = false;
      if (schemas && schemas.includes(Constants.CONSENT_HANDLER_URN)) {
        scopes = body['scopes'];
        approved = body['approved'];
        // We can't readily distinguish between different
        // consent states, so don't provide a hint.
        hint = '';
      }

      // Most account flows have a top-level 'success' flag.
      // Use this to indicate authenticator status to the user and to
      // provide a hint.
      let flowSuccess = body['success'];
      if (currentFlow && currentFlow !== 'Consent flow') {
        if (flowSuccess === undefined) {
          hint = Constants.INCOMPLETE_FLOW_HINT;
        } else {
          if (flowSuccess) {
            hint = Constants.SUCCESSFUL_FLOW_HINT;
          } else {
            hint = Constants.UNSUCCESSFUL_FLOW_HINT;
          }
        }
      }

      // If a verification code has just been sent, adjust the hint
      // accordingly.
      [ Constants.EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN,
        Constants.TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN ].forEach(urn => {
        if (body[urn] && body[urn]['codeSent'] && body[urn]['status'] !== 'success') {
          hint = Constants.CODE_SENT_HINT;
        }
      });

      this.setState({
        url: requestUrl,
        meta: meta,
        resourceType: resourceType,
        followUp: followUp,
        authenticators: authenticators,
        username: username,
        formattedName: formattedName,
        client: client,
        continueRedirectUri: continueRedirectUri,
        authUrls: authUrls,
        scopes: scopes,
        approved: approved,
        currentFlow: currentFlow,
        flowSuccess: flowSuccess,
        description: description,
        hint: hint,
        lookupParameters: lookupParameters,
        recaptchaKey: recaptchaKey,
        registrableAttributes: registrableAttributes
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
    if (body[Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN]) {
      body[Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN]['username'] = username;
      body[Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN]['password'] = password;
      this.setBodyFromObject(body);
    }
  }

  setNewPassword(urn, newPassword) {
    let body = JSON.parse(this.state.body);
    if (body[urn]) {
      body[urn]['newPassword'] = newPassword;
      this.setBodyFromObject(body);
    } else if (body['schemas'] && body['schemas'].includes(urn)) {
      body['newPassword'] = newPassword;
      this.setBodyFromObject(body);
    }
  }

  setTotp(password) {
    let body = JSON.parse(this.state.body);
    if (body[Constants.TOTP_AUTHENTICATOR_URN]) {
      body[Constants.TOTP_AUTHENTICATOR_URN]['password'] = password;
      this.setBodyFromObject(body);
    }
  }

  setSendEmailRequest(messageSubject, messageText) {
    let body = JSON.parse(this.state.body);
    if (body[Constants.EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN]) {
      body[Constants.EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN]['messageSubject'] =
          messageSubject;
      body[Constants.EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN]['messageText'] =
          messageText;
      this.setBodyFromObject(body);
    }
  }

  setEmailVerifyCode(verifyCode) {
    let body = JSON.parse(this.state.body);
    if (body[Constants.EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN]) {
      body[Constants.EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN]['verifyCode'] =
          verifyCode;
      this.setBodyFromObject(body);
    }
  }

  setSendTelephonyRequest(message, language) {
    let body = JSON.parse(this.state.body);
    if (body[Constants.TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN]) {
      body[Constants.TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN]['deliverCode'] = {
        message: message,
        language: language
      };
      this.setBodyFromObject(body);
    }
  }

  setTelephonyVerifyCode(verifyCode) {
    let body = JSON.parse(this.state.body);
    if (body[Constants.TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN]) {
      body[Constants.TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN]['verifyCode'] = {
        verifyCode: verifyCode
      };
      this.setBodyFromObject(body);
    }
  }

  setLookupParameters(lookupParameters) {
    let body = JSON.parse(this.state.body);
    if (body[Constants.ACCOUNT_LOOKUP_AUTHENTICATOR_URN]) {
      body[Constants.ACCOUNT_LOOKUP_AUTHENTICATOR_URN] =
          Object.assign(
              {},
              body[Constants.ACCOUNT_LOOKUP_AUTHENTICATOR_URN],
              lookupParameters
          );
      this.setBodyFromObject(body);
    }
  }

  setRecaptchaResponse(recaptchaResponse) {
    let body = JSON.parse(this.state.body);
    if (body[Constants.RECAPTCHA_AUTHENTICATOR_URN]) {
      body[Constants.RECAPTCHA_AUTHENTICATOR_URN]['recaptchaResponse'] =
          recaptchaResponse;
      this.setBodyFromObject(body);
    }
  }

  register(attributes) {
    let body = JSON.parse(this.state.body);
    if (body[Constants.REGISTRATION_AUTHENTICATOR_URN]) {
      body[Constants.REGISTRATION_AUTHENTICATOR_URN]['registerResourceAttributes'] =
          attributes;
      this.setBodyFromObject(body);
    }
  }

  setAccountVerifyAttributes(attributes) {
    let body = JSON.parse(this.state.body);
    body['accountVerifiedResourceAttributes'] = attributes;
    this.setState({ accountVerifyAttributes: attributes });
    this.setBodyFromObject(body);
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

  getAuthenticatorProps() {
    let props = {};
    props[Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN] = {
      username: this.state.username,
      setUsernamePassword: this.setUsernamePassword,
      setNewPassword: this.setNewPassword,
    };
    props[Constants.TOTP_AUTHENTICATOR_URN] = {
      setTotp: this.setTotp
    };
    props[Constants.EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN] = {
      setSendEmailRequest: this.setSendEmailRequest,
      setEmailVerifyCode: this.setEmailVerifyCode
    };
    props[Constants.TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN] = {
      setSendTelephonyRequest: this.setSendTelephonyRequest,
      setTelephonyVerifyCode: this.setTelephonyVerifyCode
    };
    props[Constants.ACCOUNT_LOOKUP_AUTHENTICATOR_URN] = {
      lookupParameters: this.state.lookupParameters,
      setLookupParameters: this.setLookupParameters
    };
    props[Constants.RECAPTCHA_AUTHENTICATOR_URN] = {
      recaptchaKey: this.state.recaptchaKey,
      setRecaptchaResponse: this.setRecaptchaResponse
    };
    props[Constants.REGISTRATION_AUTHENTICATOR_URN] = {
      registrableAttributes: this.state.registrableAttributes,
      register: this.register
    };
    return props;
  }

  render() {
    const active = this.state.loading;
    const bodyIsPresent = !!this.state.body;
    const authenticatorData = this.getAuthenticatorProps();
    return (
        <div className="ui AuthRequester">
          <Container>
            <Dimmer.Dimmable as={Container} dimmed={active}>
              <Dimmer active={active} inverted>
                <Loader active={active} indeterminate/>
              </Dimmer>
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
                          showPrintMargin={Config.EDITOR_CONFIG.showPrintMargin}
                          showGutter={Config.EDITOR_CONFIG.showGutter}
                          onChange={this.updateBody}
                          value={this.state.body}
                          name="AuthExplorerEditor"
                          width={Config.EDITOR_CONFIG.width}
                          wrapEnabled={Config.EDITOR_CONFIG.wrapEnabled}
                          editorProps={{$blockScrolling: true}}
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
              <Divider hidden/>
              <FlowHeader
                  flowName={this.state.currentFlow}
                  success={this.state.flowSuccess}
              />
              <Description>{this.state.description}</Description>
              {this.state.hint &&
                  <Hint>{this.state.hint}</Hint>
              }
              <Divider hidden/>
            </Dimmer.Dimmable>
          </Container>
          <Divider section/>
          {this.state.resourceType === Constants.VERIFY_ACCOUNT_RESOURCE_TYPE &&
            <AccountVerifyForm
                setAccountVerifyAttributes={this.setAccountVerifyAttributes}
            />
          }
          {this.state.resourceType === Constants.PASSWORD_RECOVERY_RESOURCE_TYPE &&
            <PasswordRecoveryForm
                setNewPassword={this.setNewPassword}
            />
          }
          {this.state.resourceType === Constants.CONSENT_RESOURCE_TYPE &&
            <ScopeList
                scopes={this.state.scopes}
                approved={this.state.approved}
                setScopesApproved={this.setScopesApproved}
                setOptionalScope={this.setOptionalScope}
            />
          }
          {this.state.authenticators.length > 0 &&
            <IdentityAuthenticatorList
                authenticators={this.state.authenticators}
                removeAuthenticator={this.removeIdentityAuthenticator}
                data={authenticatorData}
            />
          }
          {this.state.authUrls.length > 0 &&
            <AuthUrlList
                authUrls={this.state.authUrls}
                setAuthUrl={this.setAuthUrl}
            />
          }
        </div>
    );
  }
}

export default AuthRequester;
