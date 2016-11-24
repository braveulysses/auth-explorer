import React, {Component} from 'react';
import IdentityAuthenticator from './IdentityAuthenticator';
import { Container, Divider, Header, Card } from 'semantic-ui-react';
import './IdentityAuthenticatorList.css';
import { AUTHENTICATORS_UI_DESCRIPTION } from '../Constants';

class IdentityAuthenticatorList extends Component {
  constructor(props) {
    super(props);
    this.removeAuthenticator = this.removeAuthenticator.bind(this);
  }

  removeAuthenticator(urn) {
    this.props.removeAuthenticator(urn);
  }

  render() {
    if (this.props.authenticators.length > 0) {
      return (
          <Container className="IdentityAuthenticatorList">
            <Header as="h2">
              Identity Authenticators
            </Header>
            <Container>
              { AUTHENTICATORS_UI_DESCRIPTION }
            </Container>
            <Divider hidden/>
            <Card.Group>
              {this.props.authenticators.map(authenticator => {
                return (
                    <IdentityAuthenticator
                        key={authenticator.urn}
                        authenticator={authenticator}
                        data={this.props.data}
                        removeAuthenticator={this.removeAuthenticator}
                    />
                );
              })}
            </Card.Group>
          </Container>
      );
    } else {
      return (
          <div/>
      );
    }
  }
}

IdentityAuthenticatorList.propTypes = {
  authenticators: React.PropTypes.array.isRequired,
  data: React.PropTypes.object.isRequired,
  removeAuthenticator: React.PropTypes.func.isRequired
};

export default IdentityAuthenticatorList;
