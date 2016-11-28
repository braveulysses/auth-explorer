import React, {Component} from 'react';
import URI from 'urijs';
import {guid} from '../Helpers';
import { Button, Input, Form, Header, Divider } from 'semantic-ui-react';
import './OAuthRequest.css';
import Description from './Description';

import { OAUTH_STEP_DESCRIPTION } from '../Constants';
import { OAUTH_CLIENT, BROKER } from '../Config';

class OAuthRequester extends Component {
  constructor(props) {
    super(props);

    const state = guid();
    const nonce = guid();

    let url = URI(BROKER.authorizeEndpoint)
        .addQuery('client_id', OAUTH_CLIENT.clientId)
        .addQuery('response_type', OAUTH_CLIENT.responseType)
        .addQuery('scope', OAUTH_CLIENT.scope)
        .addQuery('redirect_uri', OAUTH_CLIENT.redirectUri)
        .addQuery('state', state)
        .addQuery('nonce', nonce);
    if (OAUTH_CLIENT.prompt) {
      url.addQuery('prompt', OAUTH_CLIENT.prompt);
    }
    if (OAUTH_CLIENT.acrValues) {
      url.addQuery('acr_values', OAUTH_CLIENT.acrValues);
    }
    if (OAUTH_CLIENT.maxAge) {
      url.addQuery('max_age', OAUTH_CLIENT.maxAge);
    }
    this.state = {
      clientId: OAUTH_CLIENT.clientId,
      responseType: OAUTH_CLIENT.responseType,
      redirectUri: OAUTH_CLIENT.redirectUri,
      scope: OAUTH_CLIENT.scope,
      prompt: OAUTH_CLIENT.prompt,
      acrValues: OAUTH_CLIENT.acrValues,
      maxAge: OAUTH_CLIENT.maxAge,
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
        <Description>{OAUTH_STEP_DESCRIPTION}</Description>
      </div>
    );
  }
}

export default OAuthRequester;
