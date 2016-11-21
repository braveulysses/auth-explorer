import React, {Component} from 'react';
import URI from 'urijs';
import {guid} from '../Helpers';
import { Button, Input, Form, Header, Message, Divider } from 'semantic-ui-react';
import './OAuthRequest.css';

import { OAUTH_STEP_DESCRIPTION } from '../Constants';

class OAuthRequester extends Component {
  constructor(props) {
    super(props);

    const clientId = 'auth-explorer-client';
    const responseType = 'token id_token';
    const state = guid();
    const nonce = guid();
    const scope = 'openid email phone';
    const prompt = 'login consent';
    const redirectUri = 'http://localhost:3000';

    let url = URI('https://example.com/oauth/authorize')
        .addQuery('client_id', clientId)
        .addQuery('response_type', responseType)
        .addQuery('scope', scope)
        .addQuery('redirect_uri', redirectUri)
        .addQuery('state', state)
        .addQuery('nonce', nonce);
    if (prompt.length > 0) {
      url.addQuery('prompt', prompt);
    }
    this.state = {
      clientId: clientId,
      responseType: responseType,
      redirectUri: redirectUri,
      scope: scope,
      prompt: prompt,
      acrValues: '',
      maxAge: '',
      state: state,
      nonce: nonce,
      authorizeUrl: url
    };
    this.setAuthUrlParam = this.setAuthUrlParam.bind(this);
    this.handleOAuthParamUpdate = this.handleOAuthParamUpdate.bind(this);
    this.handleAuthUrlUpdate = this.handleAuthUrlUpdate.bind(this);
    this.requestAuthorization = this.requestAuthorization.bind(this);
  }

  setAuthUrlParam(param, value) {
    let uri = new URI(this.state.authorizeUrl);
    let params = uri.search(true);
    params[param] = value;
    this.setState({
      authorizeUrl: uri.search(params)
    });
  }

  handleOAuthParamUpdate(event) {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
    this.setAuthUrlParam(event.target.name, event.target.value);
  }

  handleAuthUrlUpdate(event) {
    this.setState({ authorizeUrl: event.target.value });
  }

  static cancelSubmit(event) {
    event.preventDefault();
  }

  requestAuthorization(event) {
    window.location = this.state.authorizeUrl;
    event.preventDefault();
  }

  render() {
    return (
      <div className="ui OAuthRequester">
        <Form onSubmit={OAuthRequester.cancelSubmit}>
          <Header>OAuth 2 request parameters</Header>
          <Header sub>Client authorization</Header>
          <Form.Group>
            <Form.Field width="six">
              <label>client_id</label>
              <Input
                  type="text"
                  name="client_id"
                  defaultValue={this.state.clientId}
                  onChange={this.handleOAuthParamUpdate}
              />
            </Form.Field>
            <Form.Field width="four">
              <label>response_type</label>
              <Input
                  type="text"
                  name="response_type"
                  defaultValue={this.state.responseType}
                  onChange={this.handleOAuthParamUpdate}
              />
            </Form.Field>
          </Form.Group>

          <Form.Field width="ten">
            <label>redirect_uri</label>
            <Input
                type="text"
                name="redirect_uri"
                defaultValue={this.state.redirectUri}
                onChange={this.handleOAuthParamUpdate}
            />
          </Form.Field>

          <Form.Field width="ten">
            <label>scope</label>
            <Input
                type="text"
                name="scope"
                defaultValue={this.state.scope}
                onChange={this.handleOAuthParamUpdate}
            />
          </Form.Field>

          <Header sub>User authentication</Header>
          <Form.Group>
            <Form.Field width="four">
              <label>prompt</label>
              <Input
                  type="text"
                  name="prompt"
                  defaultValue={this.state.prompt}
                  onChange={this.handleOAuthParamUpdate}
              />
            </Form.Field>
            <Form.Field width="four">
              <label>acr_values</label>
              <Input
                  type="text"
                  name="acr_values"
                  defaultValue={this.state.acrValues}
                  onChange={this.handleOAuthParamUpdate}
              />
            </Form.Field>
            <Form.Field width="two">
              <label>max_age</label>
              <Input
                  type="text"
                  name="max_age"
                  defaultValue={this.state.maxAge}
                  onChange={this.handleOAuthParamUpdate}
              />
            </Form.Field>
          </Form.Group>

          <Header sub>Client state</Header>
          <Form.Group>
            <Form.Field width="five">
              <label>state</label>
              <Input
                  type="text"
                  name="state"
                  defaultValue={this.state.state}
                  onChange={this.handleOAuthParamUpdate}
              />
            </Form.Field>
            <Form.Field width="five">
              <label>nonce</label>
              <Input
                  type="text"
                  name="nonce"
                  defaultValue={this.state.nonce}
                  onChange={this.handleOAuthParamUpdate}
              />
            </Form.Field>
          </Form.Group>
        </Form>

        <Divider section/>

        <Header>OAuth 2 request URL</Header>
        <Form onSubmit={this.requestAuthorization}>
          <Form.Field>
            <Form.TextArea width="twelve" rows="6"
                type="text"
                className="AuthorizeUrl"
                onChange={this.handleAuthUrlUpdate}
                value={this.state.authorizeUrl}
            />
          </Form.Field>
          <Form.Field>
            <Button
                primary
                content="Request access token"
                icon="openid"
            />
          </Form.Field>
        </Form>
        <Divider hidden/>
        <Message><p>{OAUTH_STEP_DESCRIPTION}</p></Message>
      </div>
    );
  }
}

export default OAuthRequester;
