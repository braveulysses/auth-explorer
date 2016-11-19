import React, {Component} from 'react';
import IdentityAuthenticator from './IdentityAuthenticator';
import { Header, List } from 'semantic-ui-react';
import './IdentityAuthenticatorList.css';

class IdentityAuthenticatorList extends Component {
  constructor(props) {
    super(props);
    this.removeAuthenticator = this.removeAuthenticator.bind(this);
  }

  removeAuthenticator(urn) {
    this.props.removeAuthenticator(urn);
  }

  render() {
    return (
        <div className="IdentityAuthenticatorList">
          <Header as="h2">
            { this.props.authenticators.length > 0 ? 'Identity Authenticators' : '' }
          </Header>
          <List>
            {this.props.authenticators.map(urn => {
              return (
                  <List.Item key={urn}>
                    <IdentityAuthenticator
                        key={urn}
                        urn={urn}
                        removeAuthenticator={this.removeAuthenticator}
                    />
                  </List.Item>
              );
            })}
          </List>
        </div>
    );
  }
}

export default IdentityAuthenticatorList;
