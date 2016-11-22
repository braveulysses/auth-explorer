import React, {Component} from 'react';
import URI from 'urijs';
import { Menu, Button } from 'semantic-ui-react';
import { OAUTH_CLIENT, BROKER } from '../Config';

class Top extends Component {
  //noinspection JSMethodCanBeStatic
  handleLogout(event) {
    event.preventDefault();
    window.location = new URI(BROKER.logoutEndpoint)
        .addQuery('post_logout_redirect_uri', OAUTH_CLIENT.redirectUri);
  }

  render() {
    return (
        <Menu secondary size="mini">
          <Menu.Menu position='right'>
            <Menu.Item name='logout'>
              <Button
                  icon="sign out"
                  labelPosition="left"
                  content="Log out"
                  onClick={this.handleLogout}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
    );
  }
}

export default Top;