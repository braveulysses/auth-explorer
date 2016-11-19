import React, {Component} from 'react';
import IdentityAuthenticator from './IdentityAuthenticator';
import { Header, Card } from 'semantic-ui-react';
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
          <Card.Group>
            {this.props.authenticators.map(urn => {
              return (
                  <IdentityAuthenticator
                      key={urn}
                      urn={urn}
                      removeAuthenticator={this.removeAuthenticator}
                  />
              );
            })}
          </Card.Group>
        </div>
    );
  }
}

export default IdentityAuthenticatorList;
