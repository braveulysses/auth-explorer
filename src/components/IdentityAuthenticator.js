import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import UsernamePassword from './UsernamePassword';
import './IdentityAuthenticator.css';

class IdentityAuthenticator extends Component {
  constructor(props) {
    super(props);
    this.state = IdentityAuthenticator.attrsFromUrn(this.props.urn);
    this.remove = this.remove.bind(this);
  }

  static attrsFromUrn(urn) {
    switch(urn) {
      case 'urn:pingidentity:scim:api:messages:2.0:AccountLookupRequest':
        return {
          name: 'Account Lookup',
          description: 'The Account Lookup Identity Authenticator may be used to look up an end-user account from one or more request parameter values.'
        };
      case 'urn:pingidentity:scim:api:messages:2.0:ExternalIdentityAuthenticationRequest':
        return {
          name: 'External Identity',
          description: 'The External Identity Authenticator may be used to authenticate an end-user with an external identity provider.'
        };
      case 'urn:pingidentity:scim:api:messages:2.0:RecaptchaAuthenticationRequest':
        return {
          name: 'reCAPTCHA',
          description: "The reCAPTCHA Identity Authenticator may be used to verify a user's response to a Google reCAPTCHA challenge."
        };
      case 'urn:pingidentity:scim:api:messages:2.0:RegistrationAuthenticationRequest':
        return {
          name: 'Registration',
          description: 'The Registration Identity Authenticator may be used to create and authenticate a new account from data entered by the end-user.'
        };
      case 'urn:pingidentity:scim:api:messages:2.0:TOTPAuthenticationRequest':
        return {
          name: 'TOTP',
          description: 'The TOTP Identity Authenticator may be used to authenticate an end-user with a time-based one-time password based on RFC 6238 by using the UnboundID Validate TOTP Password Extended LDAP operation.'
        };
      case 'urn:pingidentity:scim:api:messages:2.0:EmailDeliveredCodeAuthenticationRequest':
        return {
          name: 'Email Delivered Code',
          description: "The Email Delivered Code Identity Authenticator may be used to deliver a verification code to an email address stored in a specified attribute from a user's SCIM resource and then verify the code subsequently entered by the user."
        };
      case 'urn:pingidentity:scim:api:messages:2.0:TelephonyDeliveredCodeAuthenticationRequest':
        return {
          name: 'Telephony Delivered Code',
          description: "The Telephony Delivered Code Identity Authenticator may be used to deliver a verification code to a telephone number (e.g. by SMS or voice message) stored in a specified attribute of a user's SCIM resource, and then verify the code subsequently entered by the user."
        };
      case 'urn:pingidentity:scim:api:messages:2.0:UsernamePasswordAuthenticationRequest':
        return {
          name: 'Username Password',
          description: 'The Username Password Identity Authenticator may be used to authenticate an end-user with a username and password using an LDAP BIND operation.'
        };
      default:
        return {
          name: 'Unrecognized authenticator',
          description: ''
        }
    }
  }

  remove() {
    console.log("remove " + this.state.name);
    this.props.removeAuthenticator(this.props.urn);
  }

  render() {
    return (
      <Card key={this.props.urn} fluid className="IdentityAuthenticator">
        <Card.Content>
          <Card.Header>
            {this.state.name}
          </Card.Header>
          <Card.Meta>
            {this.props.urn}
          </Card.Meta>
          <Card.Description>
            {this.state.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          { this.props.urn === 'urn:pingidentity:scim:api:messages:2.0:UsernamePasswordAuthenticationRequest' ? (<UsernamePassword data={this.props.data} setUsernamePassword={this.props.setUsernamePassword}/>) : '' }
          <div className="ui buttons">
            <Button
                negative
                content="Remove"
                size="small"
                icon="remove"
                labelPosition="left"
                onClick={this.remove}
            />
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default IdentityAuthenticator;
