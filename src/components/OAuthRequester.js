import React, {Component} from 'react';
import URI from 'urijs';
import {guid} from '../Helpers';
import { Button, Input, Label, Form, Header, Divider } from 'semantic-ui-react';
import './OAuthRequest.css';
import Description from './Description';

import { OAUTH_STEP_DESCRIPTION, AUTH_CODE_WARNING } from '../Constants';
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
      client_id: OAUTH_CLIENT.clientId,
      response_type: OAUTH_CLIENT.responseType,
      redirect_uri: OAUTH_CLIENT.redirectUri,
      scope: OAUTH_CLIENT.scope,
      prompt: OAUTH_CLIENT.prompt,
      acr_values: OAUTH_CLIENT.acrValues,
      max_age: OAUTH_CLIENT.maxAge,
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
    let state = {
      responseTypeWarning: ''
    };

    const param = event.target.name;
    const value = event.target.value;
    state[param] = value;

    if (param === 'response_type' && value.includes('code')) {
      state['responseTypeWarning'] = AUTH_CODE_WARNING;
    }

    this.setState(state);
    this.setAuthUrlParam(param, value);
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
                  defaultValue={this.state.client_id}
                  onChange={this.handleOAuthParamUpdate}
              />
            </Form.Field>
            <Form.Field width="four">
              <label>response_type</label>
              <Input
                  type="text"
                  name="response_type"
                  defaultValue={this.state.response_type}
                  onChange={this.handleOAuthParamUpdate}
              />
              {this.state.responseTypeWarning &&
                <Label basic color="yellow" pointing>{AUTH_CODE_WARNING}</Label>
              }
            </Form.Field>
          </Form.Group>

          <Form.Field width="ten">
            <label>redirect_uri</label>
            <Input
                type="text"
                name="redirect_uri"
                defaultValue={this.state.redirect_uri}
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
                  defaultValue={this.state.acr_values}
                  onChange={this.handleOAuthParamUpdate}
              />
            </Form.Field>
            <Form.Field width="two">
              <label>max_age</label>
              <Input
                  type="text"
                  name="max_age"
                  defaultValue={this.state.max_age}
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
                name="authorizeUrl"
                className="AuthorizeUrl"
                onChange={this.handleAuthUrlUpdate}
                value={this.state.authorizeUrl.toString()}
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
