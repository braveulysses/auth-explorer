import React, {Component} from 'react';
import URI from 'urijs';
import GUID from '../GUID';
import { Button, Input, Form } from 'semantic-ui-react';
import './OAuthRequest.css';

class OAuthRequester extends Component {
  constructor(props) {
    super(props);
    let state = GUID.randomGUID();
    let scopes = [ 'openid', 'email' ];
    let prompt = ['login'];
    const redirectUri = 'http://localhost:3000';
    let url = URI('https://example.com/oauth/authorize')
                .addQuery('client_id', 'test1')
                .addQuery('response_type', 'token')
                .addQuery('scope', scopes.join(' '))
                .addQuery('redirect_uri', redirectUri)
                .addQuery('state', state);
    if (prompt.length > 0) {
      url.addQuery('prompt', prompt.join(' '));
    }
    this.state = { authorizeUrl: url };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.requestAuthorization = this.requestAuthorization.bind(this);
  }

  handleUpdate(event) {
    this.setState({ authorizeUrl: event.target.value });
  }

  requestAuthorization(event) {
    window.location = this.state.authorizeUrl;
    event.preventDefault();
  }

  render() {
    return (
      <div className="ui OAuthRequester">
        <Form onSubmit={this.requestAuthorization}>
          <Form.Group inline>
            <Form.Field width="ten">
              <Input
                type="text"
                className="AuthorizeUrl"
                onChange={this.handleUpdate}
                value={this.state.authorizeUrl}
              />
            </Form.Field>
            <Form.Field>
              <Button primary content="Request access token"/>
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default OAuthRequester;
