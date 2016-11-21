import React, {Component} from 'react';
import IdentityAuthenticator from './IdentityAuthenticator';
import { Container, Header, Card } from 'semantic-ui-react';
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
        <Container className="IdentityAuthenticatorList">
          <Header as="h2">
            { this.props.authenticators.length > 0 ? 'Identity Authenticators' : '' }
          </Header>
          <Card.Group>
            {this.props.authenticators.map(authenticator => {
              return (
                  <IdentityAuthenticator
                      key={authenticator.urn}
                      authenticator={authenticator}
                      data={this.props.data}
                      removeAuthenticator={this.removeAuthenticator}
                      setUsernamePassword={this.props.setUsernamePassword}
                      setTotp={this.props.setTotp}
                      setSendEmailRequest={this.props.setSendEmailRequest}
                      setEmailVerifyCode={this.props.setEmailVerifyCode}
                      setSendTelephonyRequest={this.props.setSendTelephonyRequest}
                      setTelephonyVerifyCode={this.props.setTelephonyVerifyCode}
                  />
              );
            })}
          </Card.Group>
        </Container>
    );
  }
}

export default IdentityAuthenticatorList;
